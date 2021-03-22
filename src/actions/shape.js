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
        type: types.clearShawDrawing
    }
}

