import React, { useState } from 'react'
import InputColor from 'react-input-color'
import { useDispatch } from 'react-redux'
import { changeColor, eraseAll, redraw } from '../actions/shape'
import { shapesList } from '../helpers/shapesList'
import { ShapeButton } from './ShapeButton'

export const Header = React.memo(() => {


    const dispatch = useDispatch()

    const [color, setColor] = useState("#000");

    const handleChangeColor = (e) => {
        const color = e.hex
        dispatch(changeColor(color))

    }

    const handleRandomColor = () => {

        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        setColor("#" + randomColor)
        dispatch(changeColor(color))
    }

    const handleEraseAll = () => {
        dispatch(eraseAll())
    }

    const handleRedraw = () => {
        // dispatch(eraseAll())
        dispatch(redraw())
    }

    return (
        <header className="header">
            <div className="header__shapes">
                <p className="header__shapes-title">
                    Figuras
                </p>
                <div className="header__shapes-container">
                    {/* Linea */}
                    <ShapeButton shape={shapesList.line} maxPoints={2} />

                    {/* Cuadrado */}
                    <ShapeButton shape={shapesList.square} maxPoints={2} />

                    {/* Triangulo Rectangulo */}
                    <ShapeButton shape={shapesList.right_triangle} maxPoints={2} disabled={false} />
                    {/* <ShapeButton shape={shapesList.triangle} maxPoints={3} rotate={true} disabled={true} /> */}

                    {/* Circulo */}
                    <ShapeButton shape={shapesList.circle} maxPoints={2} disabled={false} />

                    {/* Elipse */}
                    <ShapeButton shape={shapesList.ellipse} maxPoints={2} disabled={false} />

                    {/* Hiperbole */}
                    <ShapeButton shape={shapesList.hyperbole} maxPoints={2} disabled={false} />
                </div>
            </div>
            <div className="header__shapes header__shapes--color" style={{
                overflowX: "auto"
            }}>
                <p className="header__shapes-title">
                    Acciones globales
                </p>
                <div className="header__shapes-container header__shapes-container--color">
                    <InputColor
                        initialValue={color}
                        onChange={handleChangeColor}
                    />
                    {/* <input ref={inputColor} type="color" className="header__color" onChange={handleChangeColor} /> */}
                    <button
                        className="header__shapes-random-color" onClick={handleRandomColor}
                        style={{
                            width: "8rem",
                            textAlign: "left"
                        }} >
                        <img src={require("../assets/img/fill.png").default} alt="color" /> <span>Color Aleatorio</span>
                    </button>

                    <button
                        className="header__shapes-random-color"
                        onClick={handleEraseAll}>
                        <img src={require("../assets/img/erase.png").default} alt="fill" /> <span>Borrar Todo</span>
                    </button>

                    <button
                        className="header__shapes-random-color"
                        onClick={handleRedraw}>
                        <img src={require("../assets/img/redraw.png").default} alt="redraw" /> <span>Redibujar</span>
                    </button>
                </div>
            </div>
        </header >
    )
})
