import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Board from './Board.js';

const BoardList = ({ boards, onSelect }) => {
  return (
    <div>
      {boards.map(board => (
        <div key={board.board_id}>
          <button onClick={() => onSelect(board.board_id)}>{board.title}</button>
        </div>
      ))}
    </div>
  );
};

export default BoardList;