import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeShape } from '../actions/shape';

export const ShapeButton = React.memo(({
    disabled = false,
    shape,
    rotate = false,
    maxPoints
}) => {

    console.log(disabled);
    const { type } = useSelector(state => state.shape)
    const [active, setActive] = useState(false)


    useEffect(() => {
        if (type === shape) {
            setActive(true)
        } else {
            setActive(false)
        }
    }, [type, shape])


    const dispatch = useDispatch()

    const handleOnClick = () => {
        dispatch(changeShape(shape, maxPoints))
    }

    return (
        <button
            disabled={disabled}
            onClick={handleOnClick}
            className={`
                        header__shape-button 
                        ${rotate && "header__shape-button--rotate"}
                        ${active && "header__shape-button--active"}`} >
            <img
                src={require(`../assets/img/${shape.id}.png`).default} alt={shape.text} />
        </button >
    )
}
)