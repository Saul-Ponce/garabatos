import { types } from "../types/types";

const intitialState = {
    shape: null,
    shapePositionStart: {
        x: null,
        y: null
    },
    shapePositionEnd: {
        x: null,
        y: null
    },
}

export const shapeReducer = (state = intitialState, action) => {
    switch (action.type) {
        case types.changeType:
            return {
                ...state,
                shape: action.payload
            }
        case types.shapeStart:
            return {
                ...state,
                shapePositionStart: {
                    x: action.payload.x,
                    y: action.payload.y,
                }
            }
        case types.shapeEnd:
            return {
                ...state,
                shapePositionEnd: {
                    x: action.payload.x,
                    y: action.payload.y,
                }
            }
        case types.clearShawDrawing:
            return {
                ...state,
                shapePositionStart: {
                    x: null,
                    y: null
                },
                shapePositionEnd: {
                    x: null,
                    y: null
                },
            }
        default:
            return state;
    }
}