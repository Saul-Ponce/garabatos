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

export const eraseSquare = (id) => {
    return {
        type: types.eraseShape,
        payload: {
            id,
            erase: types.eraseSquare
        }
    }
}

export const eraseLine = (id) => {
    return {
        type: types.eraseShape,
        payload: {
            id,
            erase: types.eraseLine
        }
    }
}

export const eraseRightTriangle = (id) => {
    return {
        type: types.eraseShape,
        payload: {
            id,
            erase: types.eraseRightTriangle
        }
    }
}

export const deleteShape = (id) => {
    return {
        type: types.deleteShape,
        payload: id
    }
}

export const redraw = () => {
    return {
        type: types.redraw,
        payload: types.redraw
    }
}

export const changeColor = (color) => {
    return {
        type: types.changeColor,
        payload: color
    }
}

export const changeBorerColor = (id) => {
    return {
        type: types.changeBorderColor,
        payload: id
    }
}

export const changeFillColor = (id) => {
    return {
        type: types.changeFillColor,
        payload: id
    }
}

export const startMoving = () => {
    return {
        type: types.moveShape
    }
}

export const movingShape = (x, y) => {
    return {
        type: types.movingShape,
        payload: { x, y }
    }
}

export const changeCoordinates = (id, coordinates) => {
    return {
        type: types.changeCoordinates,
        payload: {
            id,
            coordinates
        }
    }
}

export const stopMoving = () => {
    return {
        type: types.stopMoving
    }
}

export const initMoving = () => {
    return {
        type: types.startMoving
    }
}

export const removeActiveShape = () => {
    return {
        type: types.removeActiveShape
    }
}