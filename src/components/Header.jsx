import React from 'react'
import { ShapeButton } from './ShapeButton'
import { shapesList } from '../helpers/shapesList'
import { useDispatch } from 'react-redux'
import { changeColor } from '../actions/shape'
export const Header = () => {


    const dispatch = useDispatch()

    const handleChangeColor = (e) => {
        const color = e.target.value
        dispatch(changeColor(color))

    }

    return (
        <header className="header">
            <div className="header__shapes">
                <p className="header__shapes-title">
                    Figuras
                </p>
                <div className="header__shapes-container">
                    <ShapeButton shape={shapesList.line} maxPoints={2} />
                    <ShapeButton shape={shapesList.square} maxPoints={2} />
                    <ShapeButton shape={shapesList.right_triangle} maxPoints={2} disabled={true} />
                    <ShapeButton shape={shapesList.triangle} maxPoints={3} rotate={true} disabled={true} />
                    <ShapeButton shape={shapesList.circle} maxPoints={4} disabled={true} />
                </div>
            </div>
            <div className="header__shapes header__shapes--color">
                <p className="header__shapes-title">
                    Color
                </p>
                <div className="header__shapes-container">
                    <input type="color" className="header__color" onChange={handleChangeColor} />
                </div>
            </div>
        </header>
    )
}
