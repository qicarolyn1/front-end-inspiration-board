import React, { useState} from 'react';

const NewBoardForm = ({ onSubmit, onHide }) => {
  const [showForm, setShowForm] = useState(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const owner = event.target.owner.value;
    onSubmit(title, owner);
    setShowForm(false);
    event.target.reset();
  };

  function handleHide() {
    setShowForm(false);
    onHide();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
        <br />
        <label htmlFor="owner">Owner</label>
        <input type="text" id="owner" name="owner" required />
        <br />
        <button type="Submit">Submit New Board</button>
        <br />
        <button type="button" onClick={handleHide}>Hide Form</button>
      </form>
    </div>
  );
};

export default NewBoardForm;