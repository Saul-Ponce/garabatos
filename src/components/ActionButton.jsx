import React from 'react'

export const ActionButton = ({
    id,
    type,
    text
}) => {

    return (
        <button className="action-button">
            <img src={require(`../assets/img/${type}.png`).default} alt={type} className="action-button__img" />
            <p className="action-button__text">{text}</p>
        </button>
    )
}
