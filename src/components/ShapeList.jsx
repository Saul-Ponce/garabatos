import React from 'react'
import { useSelector } from 'react-redux'
import { ShapeItem } from './ShapeItem'

export const ShapeList = React.memo(() => {


    const { shapes } = useSelector(state => state.shape)

    return (
        <div className="shape-list">
            {
                shapes &&
                [...shapes].reverse().map((shape, position) => (
                    <ShapeItem
                        position={position}
                        id={shape.id}
                        key={shape.id} />
                ))
            }
        </div>
    )
})
