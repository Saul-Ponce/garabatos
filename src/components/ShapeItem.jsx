import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeAngle, redraw, removeActiveShape, setActiveShape, stopMoving } from '../actions/shape'
import { shapesList } from '../helpers/shapesList'
import { ActionButton } from './ActionButton'

export const ShapeItem = (({
    id,
    position,
}) => {

    const { activeShape, shapes } = useSelector(state => state.shape)

    const [angle, setAngle] = useState(activeShape.angle)
    const shapesLength = shapes.length
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(changeAngle(id, angle))

        dispatch(redraw())

    }, [id, angle, dispatch])

    const handleClickButton = () => {

        if (id === activeShape?.id) {
            dispatch(removeActiveShape())
            return
        }
        dispatch(setActiveShape(id))
        dispatch(stopMoving())
        dispatch(redraw())
    }

    const handleChangeAngle = (e) => {
        setAngle(e.target.value)


        if (e.target.value > 360) {
            setAngle(360)
        }

        if (e.target.value < -360) {
            setAngle(-360)
        }
    }



    return (
        <article className="shape-list__item">
            <button
                onClick={handleClickButton}
                className="shape-list__button">
                <img
                    className={`shape-list__img 
                    ${activeShape.id && activeShape.id === id ? "shape-list__img--closed" : ""}`}
                    src={require("../assets/img/arrow.png").default}
                    alt="open" />
                <p className="shape-list__text">{
                    `Figura ${position + 1}`
                }</p>
            </button>
            <section className={`shape-list__options 
                    ${activeShape.id && activeShape.id === id ? "shape-list__options--open" : ""}`}>

                <p className="shape-list__options-title">{activeShape.id && activeShape.id === id ? activeShape.type.text : ""}</p>


                {activeShape.id && <div className="shape-list__colors">
                    <span style={{
                        backgroundColor: activeShape.borderColor
                    }}>&nbsp;</span>
                    <span style={{
                        backgroundColor: activeShape.type.id === shapesList.line.id ? activeShape.borderColor : activeShape.fillColor,
                    }}>&nbsp;</span>
                </div>}

                <ActionButton id={id} text="Borde" type="border" />
                {
                    activeShape.id &&
                    activeShape.type.id !== shapesList.line.id && activeShape.type.id !== shapesList.hyperbole.id &&
                    < ActionButton id={id} text="Fondo" type="fill" />}

                {
                    activeShape.id &&
                    activeShape.type.id !== shapesList.line.id && activeShape.fill &&
                    < ActionButton id={id} text="Eliminar fondo" type="erase_background" />}

                <ActionButton id={id} text="Mover" type="move" />

                {
                    position > 0 &&
                    < ActionButton id={id} text="Enviar adelante" type="up" position={position} />}

                {
                    position < (shapesLength - 1) &&

                    <ActionButton id={id} text="Enviar atras" type="down" position={position} />}
                {/* open_hyperbole */}

                {
                    activeShape &&
                    activeShape.id &&
                    activeShape.type.id === shapesList.hyperbole.id &&
                    <ActionButton id={id} text={`Abrir en ${activeShape.hyperbole === 1 ? "Y" : "X"}`} type="open_hyperbole" />
                }

                {
                    activeShape &&
                    activeShape.id &&
                    activeShape.type.id !== shapesList.right_triangle.id &&
                    activeShape.type.id !== shapesList.circle.id && (
                        <>
                            <label htmlFor="angle" className="action-button__label">Angulo</label>

                            <input
                                id="angle"
                                min={-360}
                                max={360}
                                step={1}
                                type="number"
                                onChange={handleChangeAngle}
                                className="action-button__angle"
                                value={angle}
                            />
                        </>
                    )
                }

                <ActionButton id={id} text="Borrar" type="erase" />
                <ActionButton id={id} text="Tamaño" type="size" />

            </section>
        </article>
    )
})