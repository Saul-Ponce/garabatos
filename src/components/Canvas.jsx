import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCoordinate, movingShape } from '../actions/shape'
import { useShape } from '../hooks/useShape'
import { types } from '../types/types'

export const Canvas = React.memo(() => {

    const { maxPoints, countPoints, color, action } = useSelector(state => state.shape)
    const [point, loadCanvas] = useShape()

    useEffect(() => {
        loadCanvas(document.querySelector("canvas"))
    });


    const dispatch = useDispatch()

    const handleMouseCapture = (e) => {
        let { layerX: x, layerY: y } = e.nativeEvent

        //* Se invierte el valor de Y para respetar el 0,0 abajo
        y = Math.abs((window.innerHeight - 132) - y);

        if (maxPoints > countPoints && action !== (types.moveShape || action !== types.movingShape)) {
            dispatch(addCoordinate(x, y))
            point(x, y, color)
        }

        if (action === types.moveShape) {
            console.log("Moviendome en: ", x, y);
            dispatch(movingShape(x, y))
        }


    }

    return (
        <canvas
            onClick={handleMouseCapture}
            className="canvas"
            height={window.innerHeight - 132}
            width={window.innerWidth - 207} >

        </canvas>
    )
})
