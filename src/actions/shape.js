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
export const eraseCircle = (id) => {
    return {
        type: types.eraseShape,
        payload: {
            id,
            erase: types.eraseCircle
        }
    }
}

export const eraseEllipse = (id) => {
    return {
        type: types.eraseShape,
        payload: {
            id,
            erase: types.eraseEllipse
        }
    }
}

export const eraseHyperbole = (id) => {
    return {
        type: types.eraseShape,
        payload: {
            id,
            erase: types.eraseHyperbole
        }
    }
}

export const changeAngle = (id, angle) => {
    return {
        type: types.chnageAngle,
        payload: {
            id,
            angle
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

export const removeFillColor = (id) => {
    return {
        type: types.removeFillColor,
        payload: id
    }
}

export const startMoving = () => {
    return {
        type: types.moveShape
    }
}

export const startMovingSize = () => {
    return {
        type: types.moveShapeSize
    }
}

export const movingShape = (x, y) => {
    return {
        type: types.movingShape,
        payload: { x, y }
    }
}

export const movingShapeSize = (x, y) => {
    return {
        type: types.movingShapeSize,
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

export const setACtiveShapeAfterInsert = () => {
    return {
        type: types.setACtiveShapeAfterInsert
    }
}

export const deleteShapeInArray = (position) => {
    return {
        type: types.deletePositionShapes,
        payload: position
    }
}

export const movePosition = (oldPosition, newPosition) => {
    return {
        type: types.movePosition,
        payload: {
            oldPosition,
            newPosition
        }
    }
}

export const setShapes = (shapes) => {
    return {
        type: types.setSahpes,
        payload: shapes
    }
}

export const eraseAll = () => {
    return {
        type: types.eraseAll
    }
}

export const openHyperbole = (xy) => {
    return {
        type: types.openHyperbole,
        payload: xy
    }
}