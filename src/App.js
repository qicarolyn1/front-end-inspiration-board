import './App.css';
import React, {useState, useEffect} from 'react';
import axios from "axios";
import CardList from './components/CardList.js'
import BoardList from './components/BoardList';
import Board from './components/Board';
import NewBoardForm from './components/NewBoardForm';
import NewCardForm from './components/NewCardForm';


function App() {

  const [cards, setCards] = useState([])
  const API = "http://127.0.0.1:5000/";

  const getAllCards = (boardId) => {
    axios
      .get(`${API}/boards/${boardId}/cards`)
      .then((result) => {
        setCards(result.data);
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const addCard = (newCardData) => {
    const currentBoardId = selectedBoard.board_id
    newCardData.likes_count = 0
    axios
      .post(`${API}/boards/${currentBoardId}/cards`, newCardData)
      .then((result) => {
        getAllCards(currentBoardId);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const increaseLikes = (id, originalLike) => {
    const currentBoardId = selectedBoard.board_id;
    const newLikeCount = {likes_count: originalLike + 1};
    axios 
      .put(`${API}/cards/${id}/like`, newLikeCount)
      .then((result) => {
        getAllCards(currentBoardId);
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const deleteCard = (id) => {
    console.log(id)
    const currentBoardId = selectedBoard.board_id
    axios
      .delete(`${API}/cards/${id}`)
      .then((result) => {
        getAllCards(currentBoardId);
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
    const selected = boards.find(board => board.board_id === boardId);
    setSelectedBoard(selected);
    getAllCards(boardId); 
    setShowNewCardForm(true);
    // adding this here so it will only get all the cards when the board is chosen
  }

  const deleteBoard = (boardId) => {
    axios
    .delete(`${API}/boards/${boardId}`)
    .then((result) => {
      getAllBoards();
      setSelectedBoard(null)
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const getAllBoards = () => {
    axios
    .get(`${API}/boards`)
    .then((result) => {
      console.log(result.data)
      setBoards(result.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    getAllBoards();
  }, []);

  const createBoard = (title, owner) => {
    axios
    .post(`${API}/boards`, {'title': title, 'owner': owner})
    .then((result) => {
      console.log(result.data);
      getAllBoards()
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
