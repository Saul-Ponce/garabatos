import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { redraw, setShapes } from '../actions/shape';
import { Canvas } from './Canvas';

export const Blackboard = React.memo(() => {


    const dispatch = useDispatch()

    useEffect(() => {
        const shapes = JSON.parse(localStorage.getItem("shapes")) || []
        dispatch(setShapes(shapes))
        dispatch(redraw())
    })

    return (
        <div className="blackboard">
            <Canvas />
        </div>
    )
})
