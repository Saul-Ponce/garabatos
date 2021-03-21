import { types } from "../types/types";

const intitialState = {
    shape: null
}

export const shapeReducer = (state = intitialState, action) => {
    switch (action.type) {
        case types.changeType:
            return {
                shape: action.payload
            }
        default:
            return state;
    }
}