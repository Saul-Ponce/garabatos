import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Canvas } from './Canvas';

export const Blackboard = () => {

    return (
        <div className="blackboard">
            <Canvas />
        </div>
    )
}
