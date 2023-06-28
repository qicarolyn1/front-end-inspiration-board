import React from 'react';

const NewBoardForm = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const owner = event.target.owner.value;
    onSubmit(title, owner);
  };
  return (
    <form onSubmit={handleSubmit}>
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