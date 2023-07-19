import React from 'react';
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

BoardList.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      board_id: PropTypes.number.isRequired
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired
};

export default BoardList;