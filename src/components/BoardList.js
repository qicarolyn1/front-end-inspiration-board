import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Board from './Board.js';

const BoardList = ({ boards, onSelect }) => {
  const getBoardListJSX = (boards) => {
    return boards.map((board) => {
      return (
        <Board
          key={board.id}
          board={board}
          onDelete={() => alert('Delete Board')}
          onSelect={() => onSelect(board.id)}
        />
      );
    });
  };

  return <ul className="board-list">{getBoardListJSX(boards)}</ul>;
};

export default BoardList;