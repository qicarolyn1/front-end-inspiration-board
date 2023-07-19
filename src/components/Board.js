import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import './BoardList.css'


const Board = ({ board, onDelete }) => {
  return (
    <div>
      <p>Board: {board.title}</p>
      <p>Owner: {board.owner}</p>
      <button className="delete-button" onClick={() => onDelete(board.board_id)}>Delete Board</button>
    </div>
  );
};

export default Board;