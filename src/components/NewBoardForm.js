import React, { useState} from 'react';

const NewBoardForm = ({ onSubmit, onHide }) => {
  const [showForm, setShowForm] = useState(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const owner = event.target.owner.value;
    onSubmit(title, owner);
    event.target.reset();
    handleHide();
  };

  function handleHide() {
    setShowForm(false);
    onHide();
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="new-board-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div className="form-group">
          <label htmlFor="owner">Owner:</label>
          <input type="text" id="owner" name="owner" required />
        </div>
        <div className="button-group">
          <button type="Submit" className="form-button">Submit New Board</button>
          <button type="Hide" className="form-button" onClick={handleHide}>Hide Form</button>
        </div>
      </form>
    </div>
  );
}

export default NewBoardForm;