import React from 'react';
import { Canvas } from './Canvas';

export const Blackboard = React.memo(() => {

    return (
        <div className="blackboard">
            <Canvas />
        </div>
    )
})
