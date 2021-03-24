import { eraseSquare, eraseLine } from '../actions/shape';
import { shapesList } from "./shapesList";
export const getAction = (type) => {

    console.log(type);

    switch (type) {
        case shapesList.square.id:
            return eraseSquare
        case shapesList.line.id:
            return eraseLine
        default:
            break;
    }
}