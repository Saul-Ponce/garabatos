import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveShape } from '../actions/shape'
import { shapesList } from '../helpers/shapesList'
import { ActionButton } from './ActionButton'

export const ShapeItem = React.memo(({
    id
}) => {


    const { activeShape } = useSelector(state => state.shape)


    const dispatch = useDispatch()

    const handleClickButton = () => {
        dispatch(setActiveShape(id))
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
                    activeShape.id && activeShape.id === id ?
                        "Figura Seleccionada" :
                        "Seleccionar Figura"
                }</p>
            </button>
            <section className={`shape-list__options 
                    ${activeShape.id && activeShape.id === id ? "shape-list__options--open" : ""}`}>

                <p className="shape-list__options-title">{activeShape.id && activeShape.id === id ? activeShape.type.text : ""}</p>
                <ActionButton id={id} text="Borde" type="border" />
                {
                    activeShape.id &&
                    activeShape.type.id !== shapesList.line.id &&
                    < ActionButton id={id} text="Rellenar" type="fill" />}
                <ActionButton id={id} text="Mover" type="move" />
                <ActionButton id={id} text="Borrar" type="erase" />

            </section>
        </article>
    )
})