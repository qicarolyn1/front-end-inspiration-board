import './App.css';
import React, {useState, useEffect} from 'react';
import axios from "axios";
import CardList from './components/CardList.js'
import BoardList from './components/BoardList';
import Board from './components/Board';
import NewBoardForm from './components/NewBoardForm';
import NewCardForm from './components/NewCardForm';

// const BOARDS = [
//   { id: 1, title: 'Banana', owner: 'Anh', cards: [] },
//   { id: 2, title: 'Board 2', owner: 'Kim', cards: [] },
//   { id: 3, title: 'Board 3', owner: 'Carolyn', cards: [] },
// ];

function App() {

  const [cards, setCards] = useState([])
  const API = "http://127.0.0.1:5000/";

  const getAllCards = (boardId) => {
    axios
      .get(`${API}/${boardId}/cards`)
      .then((result) => {
        setCards(result.data);
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const addCard = (newCardData) => {
    axios
      .post(`${API}/boards/${selectedBoard}/cards`, newCardData)
      .then((result) => {
        getAllCards(selectedBoard);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const increaseLikes = (id, originalLike) => {
    axios 
      .patch(`${API}/${id}/like`, originalLike + 1)
      .then((result) => {
        getAllCards(selectedBoard);
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const deleteCard = (id) => {
    axios
      .delete(`${API}/cards/${id}`)
      .then((result) => {
        getAllCards(selectedBoard);
      })
      .catch((err) => {
        console.log(err)
      });
  };


  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [showNewBoardForm, setShowNewBoardForm] = useState(true);
  const [showNewCardForm, setShowNewCardForm] = useState(false);


  const handleSelectBoard = (boardId) => {
    const selected = boards.find(board => board.id === boardId);
    setSelectedBoard(selected);
    getAllCards(boardId); 
    setShowNewCardForm(true);
    // adding this here so it will only get all the cards when the board is chosen
  }

  const deleteBoard = (boardId) => {
    setBoards((prevBoards) => prevBoards.filter((board) => board.id !== boardId));
    setSelectedBoard(null);
  };

  const getAllBoards = () => {
    axios
    .get(`${API}/boards`)
    .then((result) => {
      setBoards(result.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    getAllBoards();
  }, []);


  const selectBoard = (id) => {
    axios
    .get(`${API}/boards/${id}`)
    .then((result) => {
      setSelectedBoard(result.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    selectBoard();
  }, []);

  const createBoard = (title, owner) => {
    axios
    .post(`${API}/boards`, {'title': title, 'owner': owner})
    .then((result) => {
      console.log(result.data);
      setBoards((prevBoards) => [...prevBoards, result.data]);
    })
    .catch((error) => {
      console.log(error);
    });
  };


  const handleHide = () => {
    setShowNewBoardForm(false);
  }


  return (
    
    <div className="App">
      <header className="App-header">
        <h1>Inspiration Board</h1>
      </header>
      <main className="container">
        <div className="forms_content">
          <div className="board_list">
            <h2>Boards</h2>
            {!selectedBoard && <p>Please select a board from the list below.</p>}
        {selectedBoard && (
          <div>
            <Board board={selectedBoard} onDelete={deleteBoard} />
          </div>
        )}
        <BoardList boards={boards} onSelect={handleSelectBoard} />
          </div>
        <div className="new_board">
          <h2>Create New Board</h2>
          {showNewBoardForm ? (
            <NewBoardForm onSubmit={createBoard} onHide={handleHide}/>
          ) : (
            <button onClick={() => setShowNewBoardForm(true)}>Show Form</button>
      )}
        </div>
        <div className="new_card">
        {showNewCardForm ? (
            <NewCardForm addCard={addCard}/>
          ) : ('')}
        </div>
        </div>
        <div className="cards_content">
          <h2>Cards for Board</h2>
          < CardList cards={cards} increaseLikes={increaseLikes} deleteCard={deleteCard} />
        </div>
      </main>
    </div>
  );
}

export default App;
