import './App.css';

import React from 'react';
import {useState, useEffect} from 'react';
import axios from "axios";

import CardList from './components/CardList.js'



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

  //const [cards, setCards] = useState([CARDS])
  
  return (
    
    <div className="App">
      <header className="App-header">
        <h1>Inspiration Board</h1>
      </header>
      <main>
        <div>< CardList cards= {CARDS} /></div>
      </main>
    </div>
  );
}

export default App;
