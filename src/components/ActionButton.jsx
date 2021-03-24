import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAction } from '../helpers/getAction'

export const ActionButton = React.memo(({
    type,
    text,
    id
}) => {

    const { activeShape } = useSelector(state => state.shape)

    const dispatch = useDispatch()

    const handleAction = async () => {
        const action = await (getAction(activeShape.id && activeShape.id === id ? activeShape.type.id : ""));
        dispatch(action())
    }

    return (
        <button className="action-button" onClick={handleAction}>
            <img src={require(`../assets/img/${type}.png`).default} alt={type} className="action-button__img" />
            <p className="action-button__text">{text}</p>
        </button>
    )
}
)