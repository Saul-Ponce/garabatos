import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { shapesList } from "../helpers/shapesList";
import { types } from "../types/types";
import { useLine } from "./useLine";
import { usePoint } from "./usePoint";
import { useSquare } from "./useSquare";

export const useShape = () => {

    const [canvas, setCanvas] = useState(undefined);

    const { type, coordinates, activeShape, countPoints, maxPoints, action, shapes } = useSelector(state => state.shape)

    let plano = undefined;


    const [redrawAll, setRedrawAll] = useState(null)

    const [drawLine, deleteLine, redrawLine] = useLine()
    const [drawSquare, deleteSquare, redrawSquare] = useSquare()
    const [drawPoint] = usePoint()


    canvas && (plano = canvas.getContext("2d"))


    //! Efecto para iniciar el plano de dibujo

    useEffect(() => {
        if (plano) {
            plano.translate(0, canvas.height);
            plano.scale(1, -1);
        }
    }, [canvas, plano])



    //! Efecto para eliminar las figuras

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
            case types.eraseLine:
                deleteLine(
                    plano,
                    activeShape.coordinates[0].x,
                    activeShape.coordinates[0].y,
                    activeShape.coordinates[1].x,
                    activeShape.coordinates[1].y,
                    activeShape.id
                )
                break;
            case types.redraw:

                shapes.forEach(async (shape) => {

                    //! Switch para redibujar cada figura despues que se haya eliminado una

                    switch (shape.type.id) {

                        case shapesList.line.id:
                            await redrawLine(
                                plano,
                                shape.coordinates[0].x,
                                shape.coordinates[0].y,
                                shape.coordinates[1].x,
                                shape.coordinates[1].y,
                                shape.color
                            )
                            break;

                        case shapesList.square.id:
                            await redrawSquare(
                                plano,
                                shape.coordinates[0].x,
                                shape.coordinates[0].y,
                                shape.coordinates[1].x,
                                shape.coordinates[1].y,
                                shape.color
                            )
                            break;

                        default:
                            break;

                    }
                })

                break
            default:
                setRedrawAll(null)
                break;
        }
    }, [action, activeShape, plano, drawSquare, deleteLine, deleteSquare, redrawAll, redrawLine, shapes, redrawSquare])



    //! Efecto para dibujar una linea cuando se agrega

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
                        coordinates[1].y,
                        true
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
        type,
        coordinates])


    const loadCanvas = (ref) => {
        setCanvas(ref)
    }

    const point = (x, y, color) => {
        drawPoint(plano, x, y, false, color)
    }



    return [point, loadCanvas]
}
