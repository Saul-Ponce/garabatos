import React from 'react'
import { useSelector } from 'react-redux'
import { ShapeItem } from './ShapeItem'

export const ShapeList = () => {


    const { shapes } = useSelector(state => state.shape)

    return (
        <div className="shape-list">
            {
                shapes &&
                shapes.map((shape) => (
                    <ShapeItem
                        id={shape.id}
                        key={shape.id} />
                ))
            }
        </div>
    )
}
