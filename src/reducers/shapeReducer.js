import { nanoid } from "nanoid";
import { shapesList } from "../helpers/shapesList";
import { swapPosition } from "../helpers/swapPosition";
import { types } from "../types/types";

const intitialState = {
    type: shapesList.line,
    color: "#000",
    maxPoints: 2,
    coordinates: [],
    countPoints: 0,
    shapes: [], //JSON.parse(localStorage.getItem("shapes")) ||
    activeShape: {},
    action: null,
    movingCoordinates: {},
    movingId: "",
    startMoving: false,
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
                        ],
                        angle: 0,
                        hyperbole: 1
                    }
                ],
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
        case types.chnageAngle:
            return {
                ...state,
                activeShape: {
                    ...state.activeShape,
                    angle: action.payload.angle
                },
                shapes: state.shapes.map((shape) => {
                    if (shape.id === action.payload.id) {
                        return {
                            ...shape,
                            angle: action.payload.angle
                        }
                    }
                    return shape
                })
            }
        case types.removeFillColor:
            return {
                ...state,
                activeShape: {
                    ...state.activeShape,
                    fill: false,
                    fillColor: null
                },
                shapes: state.shapes.map((shape) => {
                    if (shape.id === action.payload) {
                        return {
                            ...shape,
                            fill: false,
                            fillColor: null
                        }
                    }
                    return shape
                })
            }
        case types.movingShape:
            return {
                ...state,
                action: types.movingShape,
                movingCoordinates: action.payload
            }
        case types.movingShapeSize:
            return {
                ...state,
                action: types.movingShapeSize,
                movingCoordinates: action.payload
            }
        case types.moveShape:
            return {
                ...state,
                action: types.moveShape,
                movingCoordinates: {},
                movingId: state.activeShape.id
            }
        case types.moveShapeSize:
            return {
                ...state,
                action: types.moveShapeSize,
                movingCoordinates: {},
                movingId: state.activeShape.id
            }
        case types.changeCoordinates:
            return {
                ...state,
                activeShape: {
                    ...state.activeShape,
                    coordinates: action.payload.coordinates
                },
                shapes: state.shapes.map((shape) => {
                    if (shape.id === action.payload.id) {
                        return {
                            ...shape,
                            coordinates: action.payload.coordinates
                        }
                    }
                    return shape
                })
            }
        case types.stopMoving:
            return {
                ...state,
                action: null,
                movingCoordinates: {},
                movingId: "",
                startMoving: false,
                type: {}
            }
        case types.startMoving:
            return {
                ...state,
                startMoving: true
            }
        case types.removeActiveShape:
            return {
                ...state,
                countPoints: 0,
                coordinates: [],
                activeShape: {},
                action: null,
                movingCoordinates: {},
                movingId: "",
                startMoving: false,
            }
        case types.setACtiveShapeAfterInsert:
            return {
                ...state,
                activeShape: state.shapes.slice(-1).pop()
            }
        case types.deletePositionShapes:
            return {
                ...state,
                shapes: state.shapes.filter((shape, index) => index !== action.payload)
            }
        case types.movePosition:


            const copy = JSON.parse(JSON.stringify(state.shapes))

            return {
                ...state,
                shapes: swapPosition(copy, action.payload.oldPosition, action.payload.newPosition)
            }
        case types.setSahpes:
            return {
                ...state,
                shapes: action.payload,
                activeShape: action.payload && action.payload.length > 0 ? action.payload.slice(-1).pop() : {}
            }
        case types.eraseAll:
            return {
                ...state,
                shapes: [],
                activeShape: {},
                action: types.eraseAll
            }
        case types.openHyperbole:
            return {
                ...state,
                activeShape: {
                    ...state.activeShape,
                    hyperbole: action.payload.xy
                },
                shapes: state.shapes.map((shape) => {
                    if (shape.id === action.payload.id) {
                        console.log("aqui");
                        shape.hyperbole = action.payload.xy
                    }
                    return shape
                })
            }
        default:
            return state;
    }
}