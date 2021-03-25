import { nanoid } from "nanoid";
import { shapesList } from "../helpers/shapesList";
import { types } from "../types/types";

const intitialState = {
    type: shapesList.line,
    color: "#000",
    maxPoints: 2,
    coordinates: [],
    countPoints: 0,
    shapes: [],
    activeShape: {},
    action: null,
    filling: {
        state: false,
        number: 0
    }
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
                        borderColor: state.color,
                        fill: false,
                        fillColor: null,
                        coordinates: [
                            ...state.coordinates
                        ]
                    }],
                coordinates: []
            }
        case types.setActiveShape:
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
        case types.redraw:
            return {
                ...state,
                action: action.payload
            }
        case types.changeColor:
            return {
                ...state,
                color: action.payload
            }
        case types.changeBorderColor:
            return {
                ...state,
                activeShape: {
                    ...state.activeShape,
                    borderColor: state.color
                },
                shapes: state.shapes.map((shape) => {
                    if (shape.id === action.payload) {
                        return {
                            ...shape,
                            borderColor: state.color
                        }
                    }
                    return shape
                })
            }
        case types.changeFillColor:
            return {
                ...state,
                activeShape: {
                    ...state.activeShape,
                    fill: true,
                    fillColor: state.color
                },
                shapes: state.shapes.map((shape) => {
                    if (shape.id === action.payload) {
                        return {
                            ...shape,
                            fill: true,
                            fillColor: state.color,
                        }
                    }
                    return shape
                })
            }
        default:
            return state;
    }
}