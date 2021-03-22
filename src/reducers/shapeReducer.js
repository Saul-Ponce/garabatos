import { types } from "../types/types";

const intitialState = {
    shape: null,
    maxPoints: 0,
    coordinates: [],
    countPoints: 0
}

export const shapeReducer = (state = intitialState, action) => {
    switch (action.type) {
        case types.changeType:
            return {
                shape: action.payload.shape,
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
        case types.clearShawDrawing:
            return {
                ...state,
                countPoints: 0,
                coordinates: []
            }
        default:
            return state;
    }
}