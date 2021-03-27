import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { changeColor } from '../actions/shape'
import { shapesList } from '../helpers/shapesList'
import { ShapeButton } from './ShapeButton'
export const Header = React.memo(() => {


    const dispatch = useDispatch()

    const inputColor = useRef()

    const handleChangeColor = (e) => {
        const color = e.target.value
        dispatch(changeColor(color))

    }

    const randomColor = () => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        inputColor.current.value = "#" + randomColor
        dispatch(changeColor(inputColor.current.value))
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
                    <input ref={inputColor} type="color" className="header__color" onChange={handleChangeColor} />
                    <button className="header__shapes-random-color" onClick={randomColor}>Color Aleatorio</button>
                </div>
            </div>
        </header>
    )
})
