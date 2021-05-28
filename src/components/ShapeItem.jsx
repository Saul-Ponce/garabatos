import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { redraw, removeActiveShape, setActiveShape, stopMoving } from '../actions/shape'
import { shapesList } from '../helpers/shapesList'
import { ActionButton } from './ActionButton'

export const ShapeItem = (({
    id,
    position,
}) => {

    const { activeShape, shapes } = useSelector(state => state.shape)

    const shapesLength = shapes.length
    const dispatch = useDispatch()

    const handleClickButton = () => {

        if (id === activeShape?.id) {
            dispatch(removeActiveShape())
            return
        }
        dispatch(setActiveShape(id))
        dispatch(stopMoving())
        dispatch(redraw())
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
                    activeShape.type.id !== shapesList.line.id &&
                    < ActionButton id={id} text="Fondo" type="fill" />}

                {
                    activeShape.id &&
                    activeShape.type.id !== shapesList.line.id && activeShape.fill &&
                    < ActionButton id={id} text="Eliminar fondo" type="erase_background" />}

                <ActionButton id={id} text="Mover" type="move" />

                {
                    position > 0 &&
                    < ActionButton id={id} text="Subir" type="up" position={position} />}

                {
                    position < (shapesLength - 1) &&

                    < ActionButton id={id} text="Bajar" type="down" position={position} />}

                <ActionButton id={id} text="Borrar" type="erase" />
                <ActionButton id={id} text="Tamaño" type="size" />

            </section>
        </article>
    )
})