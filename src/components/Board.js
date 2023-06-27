import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Board = (props) => {
  // handleDeleteClick will go here

  return (
    <div className="board">
      <h2>{props.board.title}</h2>
      <p>Owner: {props.board.owner}</p>
      <p>Description: {props.board.description}</p>
      <div className="board-controls">
        {/* <button className="board-delete-button" onClick={handleDeleteClick}> */}
          {/* Delete */}
        {/* </button> */}
      </div>
    </div>
  );
};

export default Board;