import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCoordinate, initMoving, movingShape, stopMoving } from '../actions/shape'
import { useShape } from '../hooks/useShape'
import { types } from '../types/types'

export const Canvas = React.memo(() => {

    const { type, maxPoints, countPoints, color, action, startMoving } = useSelector(state => state.shape)
    const dispatch = useDispatch()

    const [point, loadCanvas] = useShape()

    const canvas = useRef(null)

    useEffect(() => {
        loadCanvas(canvas.current)
    });

    const handleMouseCapture = (e) => {
        let { clientX: x, clientY: y } = e
        y = (y - 132);
        x = Math.abs(x - 207);

        //* Invertir coordenada para respetar 0,0 abajo
        y = Math.abs((window.innerHeight - 132) - y);

        if (Object.keys(type).length > 0 && maxPoints > countPoints && (action !== types.moveShape || action !== types.movingShape)) {
            dispatch(addCoordinate(x, y))
            point(x, y, color)
        }

        if (action === types.moveShape) {
            dispatch(movingShape(x, y))
        }


    }

    const handleMoveMouse = (e) => {

        let { clientX: x, clientY: y } = e
        y = (y - 132);
        x = Math.abs(x - 207);

        //* Invertir coordenada para respetar 0,0 abajo
        y = Math.abs((window.innerHeight - 132) - y);

        if (action === types.moveShape && startMoving) {
            dispatch(movingShape(x, y))
        }
    }

    const handleInitMoving = (e) => {
        if (!startMoving && (action === types.moveShape || action === types.movingShape)) {
            dispatch(initMoving())
        }
    }


    const stopMouseMoving = () => {
        if (startMoving && (action === types.moveShape || action === types.movingShape)) {
            dispatch(stopMoving())
        }
    }

    return (
        <canvas
            ref={canvas}
            style={{
                cursor: (action === types.moveShape || action === types.movingShape) ? "move" : "initial"
            }}
            onMouseMove={handleMoveMouse}
            onClick={handleMouseCapture}
            onMouseDown={handleInitMoving}
            onMouseUp={stopMouseMoving}
            onContextMenu={(e) => e.preventDefault()}
            className="canvas"
            height={window.innerHeight - 132}
            width={window.innerWidth - 207}
        >

        </canvas>
    )
})
