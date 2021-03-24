import { types } from "../types/types"

export const changeShape = (shape, maxPoints) => {
    return {
        type: types.changeType,
        payload: {
            shape,
            maxPoints
        }
    }
}

export const addCoordinate = (x, y) => {
    return {
        type: types.addCoordinate,
        payload: {
            x,
            y
        }
    }
}

export const clearShapeDrawing = () => {
    return {
        type: types.clearShapeDrawing
    }
}

export const clearAction = () => {
    return {
        type: types.clearAction
    }
}

export const setActiveShape = (id) => {
    return {
        type: types.setActiveShape,
        payload: id
    }
}

export const eraseSquare = (id)=>{
    return{
        type: types.eraseShape,
        payload: {
            id,
            erase: types.eraseSquare
        }
    }
}

export const deleteShape = (id)=>{
    return{
        type: types.deleteShape,
        payload: id
    }
}