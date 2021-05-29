import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tinycolor from 'tinycolor2'
import { changeBorerColor, changeFillColor, movePosition, openHyperbole, redraw, removeFillColor, startMoving, startMovingSize } from '../actions/shape'
import { getAction } from '../helpers/getEraseShapeType'
import { types } from '../types/types'

export const ActionButton = React.memo(({
    type,
    text,
    id,
    position = undefined
}) => {



    const { activeShape, color, action, shapes } = useSelector(state => state.shape)

    const shapesLength = shapes.length - 1

    const isColorDark = tinycolor(color).isDark()

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
        } else if (type === "erase_background") {
            dispatch(removeFillColor(id))
            dispatch(redraw())
            return
        }
        else if (type === "move") {
            await dispatch(startMoving())
            return
        }
        else if (type === "size") {
            await dispatch(startMovingSize())
            return
        }
        else if (type === "open_hyperbole") {
            dispatch(openHyperbole({
                id,
                xy: activeShape.hyperbole === 1 ? -1 : 1
            }))
            dispatch(redraw())
            return
        }
        else if (type === "down") {
            const pos = shapesLength - position

            // dispatch(deleteShapeInArray(position))
            dispatch(movePosition(pos, pos - 1))
            dispatch(redraw())
            return
        }
        else if (type === "up") {
            const pos = shapesLength - position

            // dispatch(deleteShapeInArray(position))
            dispatch(movePosition(pos, pos + 1))
            dispatch(redraw())
            return
        }

        const action = await (getAction(activeShape.id && activeShape.id === id ? activeShape.type.id : ""));
        dispatch(action())
    }

    return (
        <button
            style={{
                backgroundColor: type === "fill" || type === "border" ? color : "",
                color: ((type === "fill" || type === "border") && isColorDark) ? "white" : "initial"
            }}
            className={`action-button ${(action === types.moveShape || action === types.movingShape) && type === "move" && id === activeShape.id ? "action-button--active" : (action === types.moveShapeSize || action === types.movingShapeSize) && type === "size" && id === activeShape.id ? "action-button--active" : ""
                }`} onClick={handleAction}>
            <img
                style={{
                    padding: ".2rem",
                    borderRadius: ".2rem",
                    filter: ((type === "fill" || type === "border") && isColorDark) ? "invert(100%)" : "initial"
                }}
                src={require(`../assets/img/${type}.png`).default} alt={type} className="action-button__img" />
            <p className="action-button__text">{text}</p>
        </button>
    )
}
)