import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const INITIAL_FORM_DATA = {
    message: '',
}

const NewCardForm = ({ addCard }) => {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const handleChange = (event) => {
        const newFormData = {
            ...formData,
            [event.target.name]: event.target.value,
        };
        setFormData(newFormData);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addCard(formData);
        setFormData(INITIAL_FORM_DATA);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a New Card</h2>
            <label htmlFor="Card">message: </label>
            <input 
                required
                name="message" 
                message="text"
                value={formData.title}
                onChange={handleChange}
            />
        </form>
    );
};

export default NewCardForm;