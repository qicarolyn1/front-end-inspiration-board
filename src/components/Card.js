import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
    

    return (
        <li className="card_item">
            <h3>{props.message}</h3>
            <ul class="card_item_controls">
                <li>
                    <p>{props.likes}💕</p>
                </li>
                <li>
                    <button className="card_item_like_button">"+1"</button>
                </li>
                <li>
                    <button className="card_item_remove_button">"Delete"</button>
                </li>
            </ul>
        </li>
    );
};

export default Card

