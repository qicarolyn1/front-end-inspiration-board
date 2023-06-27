import './App.css';

import React from 'react';
import {useState, useEffect} from 'react';
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
  const CARDS = [
    {
      id: 1,
      message: 'Mow the lawn',
      likes_count: 1,
    },
    {
      id: 2,
      message: 'Cook Pasta',
      likes_count: 1,
    },
    {
      id: 3,
      message: 'more card',
      likes_count: 1,
    },
    {
      id: 4,
      message: 'card4',
      likes_count: 1,
    },
    {
      id: 5,
      message: 'card5',
      likes_count: 1,
    }
  ];

  const [cards, setCards] = useState(CARDS)

  const increaseLikes = (id, originalLike) => {
    const newLike = originalLike + 1
    console.log(cards);
    const newCards = cards.map((card) => {
      if (card.id === id) {
        const updatedCard = { ...card };
        updatedCard.likes_count = newLike;
        return updatedCard;
      } else {
        return { ...card };
      }
    });
    setCards(newCards);
  };

  const deleteCard = (id) => {
    const newCards = CARDS.filter(
      (card) => card.id !== id
    );
    setCards(newCards);
  };


  const [boards, setBoards] = useState(BOARDS);
  const [selectedBoard, setSelectedBoard] = useState(null);


  function handleSelectBoard(boardId) {
    const selected = boards.find(board => board.id === boardId);
    setSelectedBoard(selected);
  }

  const deleteBoard = (boardId) => {
    setBoards((prevBoards) => prevBoards.filter((board) => board.id !== boardId));
    setSelectedBoard(null);
  };

  function createBoard(title, owner) {
    const newBoard = { id: Date.now(), title, owner };
    setBoards(prevBoards => [...prevBoards, newBoard]);
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
            <h2>
              {selectedBoard.title} ({selectedBoard.owner})
            </h2>
            <Board board={selectedBoard} onDelete={deleteBoard} />
          </div>
        )}
        <BoardList boards={BOARDS} onSelect={handleSelectBoard} />
          </div>
        <div className="new_board">
          <h2>Create New Board</h2>
            <NewBoardForm onCreate={createBoard} />
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
