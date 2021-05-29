import { eraseLine, eraseSquare, eraseRightTriangle, eraseCircle, eraseEllipse, eraseHyperbole } from '../actions/shape';
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
        case shapesList.ellipse.id:
            return eraseEllipse
        case shapesList.hyperbole.id:
            return eraseHyperbole
        default:
            break;
    }
}