import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeShape } from '../actions/shape';

export const ShapeButton = React.memo(({
    icon,
    rotate = false,
    maxPoints
}) => {


    const { type } = useSelector(state => state.shape)
    const [active, setActive] = useState(false)


    useEffect(() => {
        if (type === icon) {
            setActive(true)
        } else {
            setActive(false)
        }
    }, [type, icon])


    const dispatch = useDispatch()

    const handleOnClick = () => {
        dispatch(changeShape(icon, maxPoints))
    }

    return (
        <button
            onClick={handleOnClick}
            className={`
                        header__shape-button 
                        ${rotate && "header__shape-button--rotate"}
                        ${active && "header__shape-button--active"}`} >
            <img
                src={require(`../assets/img/${icon}.png`).default} alt={icon} />
        </button >
    )
}
)