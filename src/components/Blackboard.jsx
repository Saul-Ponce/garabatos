import React from 'react';
import { Canvas } from './Canvas';

export const Blackboard = React.memo(() => {


    // const dispatch = useDispatch()

    // useEffect(() => {
    //     const shapes = JSON.parse(localStorage.getItem("shapes")) || []
    //     dispatch(setShapes(shapes))
    //     dispatch(redraw())
    //     dispatch(clearAction())
    // })

    return (
        <div className="blackboard">
            <Canvas />
        </div>
    )
})
