import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import './Card.css'


const Card = (props) => {
    

    return (
        <li className="card_item">
            <h3>{props.message}</h3>
            <ul className="card_item_controls">
                <li>
                    <p>{props.likes_count}💕</p>
                </li>
                <li>
                    <button className="card_item_like_button"
                    onClick={() => {props.increaseLikes(props.id, props.likes_count);}}>
                        +1</button>
                </li>
                <li>
                    <button className="card_item_remove_button"
                    onClick={() => {props.deleteCard(props.id);}}>
                        Delete</button>
                </li>
            </ul>
        </li>
    );
};

export default Card

