import React from 'react';
import { useDispatch } from 'react-redux';
import { changeShape } from '../actions/shape';

export const ShapeButton = ({
    icon,
    rotate
}) => {

    const dispatch = useDispatch()

    const handleOnChange = () => {
        dispatch(changeShape(icon))
    }

    return (
        <button
            onClick={handleOnChange}
            className={`header__shape-button ${rotate && "header__shape-button--rotate"}`}>
            <img
                src={require(`../assets/img/${icon}.png`).default} alt={icon} />
        </button>
    )
}
