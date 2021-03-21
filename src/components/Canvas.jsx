import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { shapeEnd, shapeStart, clearShapeDrawing } from '../actions/shape'
import { useShape } from '../hooks/useShape'

export const Canvas = () => {

    const canvas = document.querySelector("canvas")

    const { shapePositionStart } = useSelector(state => state.shape)

    const { drawShape, resetDeleteShapes } = useShape(canvas)

    const dispatch = useDispatch()

    const handleMouseDownCapture = (e) => {

        const { layerX: x, layerY: y } = e.nativeEvent
        dispatch(shapeStart(x, y))
    }

    const handleMouseUpCapture = (e) => {
        const { layerX: x, layerY: y } = e.nativeEvent
        if (shapePositionStart.x === null && shapePositionStart.y === null) {
            return;
        }

        dispatch(shapeEnd(x, y))
        drawShape()
        dispatch(clearShapeDrawing())
        resetDeleteShapes()
    }

    const handleMouseMoveCapture = (e) => {
        const { layerX: x, layerY: y } = e.nativeEvent

        if (shapePositionStart.x === null && shapePositionStart.y === null) {
            return;
        }
        dispatch(shapeEnd(x, y))
        drawShape()
    }





    //TODO: hacer que dibuje un cuadrado

    return (
        <canvas
            onMouseDownCapture={handleMouseDownCapture}    //* Captura la posicion inicial
            onMouseUpCapture={handleMouseUpCapture}      //* Captura la posicion final
            onMouseMoveCapture={handleMouseMoveCapture}    //* Captura el movimiento
            className="canvas"
            height={window.innerHeight - 132}
            width={window.innerWidth - 207} >

        </canvas>
    )
}
