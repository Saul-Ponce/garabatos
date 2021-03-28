import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAction, clearShapeDrawing, deleteShape, redraw, startMoving } from "../actions/shape";
import { shapesList } from "../helpers/shapesList";
import { types } from "../types/types";
import { useLine } from "./useLine";
import { usePoint } from "./usePoint";
import { useSquare } from "./useSquare";

export const useShape = () => {

    const [canvas, setCanvas] = useState(undefined);
    const dispatch = useDispatch()
    const { type, coordinates, activeShape, countPoints, maxPoints, action, shapes } = useSelector(state => state.shape)

    let plano = undefined;


    const [redrawAll, setRedrawAll] = useState(null)

    const [drawLine, deleteLine, redrawLine, moveLine] = useLine()
    const [drawSquare, deleteSquare, redrawSquare, fillSquare, moveSquare] = useSquare()
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
                    "#fff"
                )
                dispatch(clearAction())
                dispatch(redraw())
                dispatch(deleteShape(activeShape.id))
                break;
            case types.eraseLine:
                deleteLine(
                    plano,
                    activeShape.coordinates[0].x,
                    activeShape.coordinates[0].y,
                    activeShape.coordinates[1].x,
                    activeShape.coordinates[1].y,
                    "#fff"
                )
                dispatch(deleteShape(activeShape.id))
                dispatch(redraw())
                // dispatch(clearAction())
                break;
            case types.redraw:
                shapes.forEach((shape) => {

                    //! Switch para redibujar cada figura despues que se haya eliminado una
                    switch (shape.type.id) {
                        case shapesList.line.id:
                            redrawLine(
                                plano,
                                shape.coordinates[0].x,
                                shape.coordinates[0].y,
                                shape.coordinates[1].x,
                                shape.coordinates[1].y,
                                shape.borderColor
                            )
                            break;

                        case shapesList.square.id:
                            redrawSquare(
                                plano,
                                shape.coordinates[0].x,
                                shape.coordinates[0].y,
                                shape.coordinates[1].x,
                                shape.coordinates[1].y,
                                shape.borderColor
                            )
                            if (shape.fill) {
                                fillSquare(
                                    plano,
                                    shape.coordinates[0].x,
                                    shape.coordinates[0].y,
                                    shape.coordinates[1].x,
                                    shape.coordinates[1].y,
                                    shape.fillColor
                                )
                            }
                            dispatch(clearAction())
                            break;

                        default:
                            break;

                    }
                })

                break
            case types.movingShape:
                plano.clearRect(0, 0, canvas.width, canvas.height);
                shapes.forEach((shape) => {

                    //! Switch para redibujar cada figura despues que se haya eliminado una
                    switch (shape.type.id) {
                        case shapesList.line.id:
                            moveLine(
                                plano,
                                shape.coordinates[0].x,
                                shape.coordinates[0].y,
                                shape.coordinates[1].x,
                                shape.coordinates[1].y,
                                shape.borderColor,
                                shape
                            )
                            dispatch(startMoving())
                            break;

                        case shapesList.square.id:
                            moveSquare(
                                plano,
                                shape.coordinates[0].x,
                                shape.coordinates[0].y,
                                shape.coordinates[1].x,
                                shape.coordinates[1].y,
                                shape.borderColor,
                                shape
                            )

                            dispatch(startMoving())
                            break;

                        default:
                            break;

                    }
                })
                break;
            default:
                setRedrawAll(null)
                break;
        }
    }, [
        action,
        activeShape,
        plano,
        drawSquare,
        deleteLine,
        deleteSquare,
        redrawAll,
        redrawLine,
        shapes,
        redrawSquare,
        fillSquare,
        canvas,
        dispatch,
        moveLine,
        moveSquare
    ])



    //! Efecto para dibujar la forma cuando se agrega

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
                    dispatch(clearShapeDrawing())
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
                    dispatch(clearShapeDrawing())
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
        coordinates,
        dispatch
    ])


    const loadCanvas = (ref) => {
        setCanvas(ref)
    }

    const point = (x, y, color) => {
        drawPoint(plano, x, y, false, color)
    }



    return [point, loadCanvas]
}
