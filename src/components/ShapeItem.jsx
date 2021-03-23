import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveShape } from '../actions/shape'
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
                <p>{
                    activeShape.id && activeShape.id === id ?
                        "Figura Seleccionada" :
                        "Seleccionar Figura"
                }</p>
            </button>
            <section className={`shape-list__options 
                    ${activeShape.id && activeShape.id === id ? "shape-list__options--open" : ""}`}>


                <ActionButton id={id} text="Rellenar" type="fill" />

            </section>
        </article>
    )
})