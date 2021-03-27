import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeBorerColor, changeFillColor, redraw, startMoving } from '../actions/shape'
import { getAction } from '../helpers/getAction'

export const ActionButton = React.memo(({
    type,
    text,
    id,
    active = false,
    onClick
}) => {

    const { activeShape, color } = useSelector(state => state.shape)

    const dispatch = useDispatch()

    const handleAction = async () => {

        if (type === "border") {
            await dispatch(changeBorerColor(id))
            dispatch(redraw())
            return
        } else if (type === "fill") {
            await dispatch(changeFillColor(id))
            dispatch(redraw())
            return
        }
        else if (type === "move") {
            await dispatch(startMoving())
            return
        }

        const action = await (getAction(activeShape.id && activeShape.id === id ? activeShape.type.id : ""));
        dispatch(action())
    }

    return (
        <button
            className={`action-button ${active ? "action-button--active" : ""}`} onClick={handleAction}>
            <img
                style={{
                    backgroundColor: type === "fill" || type === "border" ? color : "",
                    padding: ".2rem",
                    borderRadius: ".2rem",
                    backgroundBlendMode: "lighten"
                }}
                src={require(`../assets/img/${type}.png`).default} alt={type} className="action-button__img" />
            <p className="action-button__text">{text}</p>
        </button>
    )
}
)