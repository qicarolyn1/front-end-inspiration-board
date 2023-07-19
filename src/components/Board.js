import React from 'react';
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

Board.propTypes = {
  board: PropTypes.shape({
    title: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    board_id: PropTypes.number.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Board;