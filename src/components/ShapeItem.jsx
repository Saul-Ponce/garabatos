import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveShape } from '../actions/shape'

export const ShapeItem = React.memo(({
    id
}) => {


    const { activeShape } = useSelector(state => state.shape)
    const dispatch = useDispatch()


    const handleClickButton = () => {
        dispatch(setActiveShape(id))
    }

    return (
        <div className="shape-list__item">
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
        </div>
    )
})