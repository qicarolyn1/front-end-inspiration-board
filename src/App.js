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
  const API = "https://back-end-inspiration-board-4230caka.onrender.com/";

  // document.getElementById('sort-cards').addEventListener('change', function() {
  //   getAllCards(selectedBoard.board_id);
  // })

  const getAllCards = (boardId) => {
    const sortChoice = document.getElementById('sort-cards').value
    const sortParam = sortChoice ? `?sort=${sortChoice}` : "";
    axios
      .get(`${API}/boards/${boardId}/cards${sortParam}`)
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
      setSelectedBoard(null);
      setShowNewCardForm(false);
    })
    .catch((error) => {
      console.log(error);
    });
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

  const createBoard = (title, owner) => {
    axios
    .post(`${API}/boards`, {'title': title, 'owner': owner})
    .then((result) => {
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
        <h1>CAKA's Inspiration Board</h1>
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
          <div>
            <section className="Container2">
                <label htmlFor="sort-cards">Sort Cards By: </label>
                <select name="sort-cards" id="sort-cards" onChange={() => getAllCards(selectedBoard.board_id)}>
                    <option value="">Card Sorting Option</option>
                    <option value="message_A-Z">A to Z by Message</option>
                    <option value="message_Z-A">Z to A by Message</option>
                    <option value="least_likes">Least Like Count</option>
                    <option value="most_likes">Most Like Count</option>
                </select>
            </section>
        </div>
          < CardList cards={cards} increaseLikes={increaseLikes} deleteCard={deleteCard} />
        </div>
      </main>
    </div>
  );
}

export default App;
