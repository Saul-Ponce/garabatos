import { nanoid } from "nanoid";
import { types } from "../types/types";

const intitialState = {
    type: "line",
    maxPoints: 2,
    coordinates: [],
    countPoints: 0,
    shapes: [],
    activeShape: {},
    action: null
}

export const shapeReducer = (state = intitialState, action) => {
    switch (action.type) {
        case types.changeType:
            return {
                ...state,
                type: action.payload.shape,
                maxPoints: action.payload.maxPoints,
                coordinates: [],
                countPoints: 0
            }
        case types.addCoordinate:
            return {
                ...state,
                countPoints: state.countPoints + 1,
                coordinates: [
                    ...state.coordinates,
                    { x: action.payload.x, y: action.payload.y }
                ]
            }
        case types.clearShapeDrawing:
            return {
                ...state,
                countPoints: 0,
                shapes: [
                    ...state.shapes,
                    {
                        id: nanoid(),
                        type: state.type,
                        coordinates: [
                            ...state.coordinates
                        ]
                    }],
                coordinates: []
            }
        case types.setActiveShape:
            console.log(action.payload)
            return {
                ...state,
                activeShape: state.shapes.find((shape) => shape.id === action.payload)
            }
        case types.eraseShape:
            return {
                ...state,
                action: action.payload.erase
            }
        case types.clearAction:
            return {
                ...state,
                action: null
            }
        case types.deleteShape:
            return {
                ...state,
                shapes: state.shapes.filter(shape => shape.id !== action.payload),
                activeShape: {}
            }
        default:
            return state;
    }
}