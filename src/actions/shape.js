import { types } from "../types/types"

export const changeShape = (shape) => {
    return {
        type: types.changeType,
        payload: shape
    }
}