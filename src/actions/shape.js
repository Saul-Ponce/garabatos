import { types } from "../types/types"

export const changeShape = (shape) => {
    return {
        type: types.changeType,
        payload: shape
    }
}

export const shapeStart = (x, y) => {
    return {
        type: types.shapeStart,
        payload: {
            x,
            y
        }
    }
}

export const shapeEnd = (x, y) => {
    return {
        type: types.shapeEnd,
        payload: {
            x,
            y
        }
    }
}

export const clearShapeDrawing = () => {
    return {
        type: types.clearShawDrawing
    }
}