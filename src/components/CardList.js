import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card.js';

const CardList = ({ cards }) => {
    const getCardListJSX = (cards) => {
        return cards.map((cards) => {
            return (
                <CARD 
                key={cards.id}
                id={cards.id}
                message={cards.message}
                likes_count={cards.likes_count}
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
};

export default CardList;