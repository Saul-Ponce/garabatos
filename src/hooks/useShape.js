import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { shapesList } from "../helpers/shapesList";
import { types } from "../types/types";
import { useLine } from "./useLine";
import { usePoint } from "./usePoint";
import { useSquare } from "./useSquare";

export const useShape = () => {

    const [canvas, setCanvas] = useState(undefined);

    const { type, coordinates, activeShape, countPoints, maxPoints, action } = useSelector(state => state.shape)

    let plano = undefined;

    const [drawLine] = useLine()
    const [drawSquare, deleteSquare] = useSquare()
    const [drawPoint] = usePoint()


    canvas && (plano = canvas.getContext("2d"))

    useEffect(() => {
        if (plano) {
            plano.translate(0, canvas.height);
            plano.scale(1, -1);
        }
    }, [canvas, plano])

    useEffect(() => {
        switch (action) {
            case types.eraseSquare:
                deleteSquare(
                        plano,
                        activeShape.coordinates[0].x,
                        activeShape.coordinates[0].y,
                        activeShape.coordinates[1].x,
                        activeShape.coordinates[1].y,
                        activeShape.id
                    )
                break;
        
            default:
                break;
        }
    }, [action, activeShape, plano, drawSquare])

    useEffect(() => {

        if (countPoints === (maxPoints)) {            
            switch (type.id) {

                case shapesList.line.id:
                    drawLine(
                        plano,
                        coordinates[0].x,
                        coordinates[0].y,
                        coordinates[1].x,
                        coordinates[1].y,
                        true
                    )
                    break;

                case shapesList.square.id:
                    drawSquare(
                        plano,
                        coordinates[0].x,
                        coordinates[0].y,
                        coordinates[1].x,
                        coordinates[1].y
                    )
                    break;

                default:
                    break;
            }
        }

    }, [
        activeShape.coordinates,
        countPoints,
        maxPoints,
        drawLine,
        drawPoint,
        drawSquare,
        plano,
        type])


    const loadCanvas = (ref) => {
        setCanvas(ref)
    }

    const point = (x, y) => {
        drawPoint(plano, x, y)
    }



    return [point, loadCanvas]
}
