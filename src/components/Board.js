import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';


const Board = ({ board, onDelete }) => {
  return (
    <div>
      <h2>{board.title}</h2>
      <p>Owner: {board.owner}</p>
      <button onClick={() => onDelete(board.id)}>Delete</button>
    </div>
  );
};

export default Board;