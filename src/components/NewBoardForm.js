import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const NewBoardForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title" required />
      <br />
      <label htmlFor="owner">Owner</label>
      <input type="text" id="owner" name="owner" required />
      <br />
      <button type="submit">Add</button>
    </form>
  );
};

export default NewBoardForm;