import { eraseLine, eraseSquare, eraseRightTriangle, eraseCircle } from '../actions/shape';
import { shapesList } from "./shapesList";
export const getAction = (type) => {

    switch (type) {
        case shapesList.square.id:
            return eraseSquare
        case shapesList.line.id:
            return eraseLine
        case shapesList.right_triangle.id:
            return eraseRightTriangle
        case shapesList.circle.id:
            return eraseCircle
        default:
            break;
    }
}