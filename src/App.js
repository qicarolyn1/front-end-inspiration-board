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
