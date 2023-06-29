import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card.js';

import './CardList.css'

const CardList = ({ cards, increaseLikes, deleteCard }) => {
    const getCardListJSX = (cards) => {
        return cards.map((card) => {
            return (
                <Card
                key={card.card_id}
                id={card.card_id}
                message={card.message}
                likes_count={card.likes_count}
                increaseLikes={increaseLikes}
                deleteCard={deleteCard}
                />
            );
        });
    };

    
    return <ul className="card_list">{getCardListJSX(cards)}</ul>;
};

CardList.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            likes_count: PropTypes.number.isRequired,
        })
    ).isRequired,
    increaseLikes: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
};

export default CardList;