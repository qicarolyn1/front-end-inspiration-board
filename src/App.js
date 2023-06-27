import './App.css';

import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";

import CardList from './components/CardList.js'

import BoardList from './components/BoardList';
import Board from './components/Board';


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


  const BOARDS = [
    {
      id: 1,
      title: 'Travel',
      description: 'Places to visit',
    },
    {
      id: 2,
      title: 'Cats',
      description: 'Good Kitties',
    }
  ];

  const [cards, setCards] = useState(CARDS)

  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null)

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

  useEffect(() => {
    axios.get('http://localhost:3000/boards')
      .then(response => {
        setBoards(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleBoardSelect = (id) => {
    setSelectedBoardId(id);
  };

  const selectedBoard = boards.find(board => board.id === selectedBoardId);
  
  return (
    
    <div className="App">
      <header className="App-header">
        <h1>Inspiration Board</h1>
      </header>
      <main>
        <div className="boards">
          <h2>Boards</h2>
          <BoardList boards={BOARDS} onSelect={handleBoardSelect} />
        </div>
        <div className="board-details">
          {selectedBoardId ? (
            <p>Selected board id: {selectedBoardId}</p>
          ) : (
            <p>Select a board to view cards</p>
          )}
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
