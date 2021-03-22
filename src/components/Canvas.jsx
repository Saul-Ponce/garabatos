import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCoordinate } from '../actions/shape'
import { useShape } from '../hooks/useShape'

export const Canvas = () => {

    const canvas = document.querySelector("canvas")

    const { maxPoints, countPoints } = useSelector(state => state.shape)
    const { pintarPunto } = useShape(canvas)


    const dispatch = useDispatch()

    const handleMouseCapture = (e) => {
        const { layerX: x, layerY: y } = e.nativeEvent

        if (maxPoints > countPoints) {
            dispatch(addCoordinate(x, y))
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
}
