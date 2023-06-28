import './App.css';
import React, {useState} from 'react';
import axios from "axios";
import CardList from './components/CardList.js'
import BoardList from './components/BoardList';
import Board from './components/Board';
import NewBoardForm from './components/NewBoardForm';

const BOARDS = [
  { id: 1, title: 'Banana', owner: 'Anh', cards: [] },
  { id: 2, title: 'Board 2', owner: 'Kim', cards: [] },
  { id: 3, title: 'Board 3', owner: 'Carolyn', cards: [] },
];

function App() {

  const [cards, setCards] = useState([])
  const API = "http://127.0.0.1:5000/";

  const getAllCards = (board_id) => {
    axios
      .get(`${API}/${board_id}/cards`)
      .then((result) => {
        setCards(result.data);
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const increaseLikes = (id, originalLike) => {
    axios 
      .patch(`${API}/${id}/like`, originalLike + 1)
      .then((result) => {
        getAllCards(result);
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const deleteCard = (id) => {
    axios
      .delete(`${API}/cards/${id}`)
      .then((result) => {
        getAllCards(result);
      })
      .catch((err) => {
        console.log(err)
      });
  };


  const [boards, setBoards] = useState(BOARDS);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [showNewBoardForm, setShowNewBoardForm] = useState(true)


  const handleSelectBoard = (boardId) => {
    const selected = boards.find(board => board.id === boardId);
    setSelectedBoard(selected);
    getAllCards(boardId); 
    // adding this here so it will only get all the cards when the board is chosen
  }

  const deleteBoard = (boardId) => {
    setBoards((prevBoards) => prevBoards.filter((board) => board.id !== boardId));
    setSelectedBoard(null);
  };

  const createBoard = (title, owner) => {
    const newBoard = { id: Date.now(), title, owner };
    setBoards(prevBoards => [...prevBoards, newBoard]);
    setShowNewBoardForm(false);
  }

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
          <p>Form3</p>
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
