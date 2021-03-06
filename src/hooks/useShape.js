import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAction, clearShapeDrawing, deleteShape, redraw, setACtiveShapeAfterInsert, startMoving, startMovingSize, stopMoving } from "../actions/shape";
import { WHITE } from "../const/const";
import { shapesList } from "../helpers/shapesList";
import { types } from "../types/types";
import { useCircle } from "./useCircle";
import { useEllipse } from "./useEllipse";
import { useHyperbole } from "./useHyperbole";
import { useLine } from "./useLine";
import { usePoint } from "./usePoint";
import { useRightTriangle } from "./useRightTriangle";
import { useSquare } from "./useSquare";

export const useShape = () => {

    const [canvas, setCanvas] = useState(undefined);
    const dispatch = useDispatch()
    const { type, coordinates, activeShape, countPoints, maxPoints, action, shapes } = useSelector(state => state.shape)

    let plano = undefined;


    const [redrawAll, setRedrawAll] = useState(null)

    const [drawLine, deleteLine, redrawLine, moveLine, changeSizeLine] = useLine()
    const [drawSquare, deleteSquare, redrawSquare, fillSquare, moveSquare, changeSizeSquare] = useSquare()
    const [drawRightTriangle, deleteRightTriangle, redrawRightTriangle, moveRightTriangle, changeSizeRightTriangle] = useRightTriangle()
    const [drawCircle, deleteCircle, redrawCircle, moveCircle, changeSizeCircle] = useCircle()
    const [drawEllipse, deleteEllipse, redrawEllipse, moveEllipse, changeSizeEllipse] = useEllipse()
    const [drawHyperbole, deleteHyperbole, redrawHyperbole, moveHyperbole, changeSizeHyperbole] = useHyperbole()
    const [drawPoint] = usePoint()


    canvas && (plano = canvas.getContext("2d"))


    //! Efecto para iniciar el plano de dibujo

    useEffect(() => {
        if (plano) {
            plano.translate(0, canvas.height);
            plano.scale(1, -1);
        }

    }, [canvas, plano])
    //! Guardar figuras en localstorage

    // useEffect(() => {
    //     localStorage.setItem("shapes", JSON.stringify(shapes))
    // }, [shapes])


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
                    WHITE
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
                    WHITE
                )
                dispatch(deleteShape(activeShape.id))
                dispatch(redraw())
                break
            case types.eraseRightTriangle:
                deleteRightTriangle(
                    plano,
                    activeShape.coordinates[0].x,
                    activeShape.coordinates[0].y,
                    activeShape.coordinates[1].x,
                    activeShape.coordinates[1].y,
                    activeShape.angle,
                    WHITE
                )
                dispatch(deleteShape(activeShape.id))
                dispatch(redraw())
                break;
            case types.eraseCircle:
                deleteCircle(
                    plano,
                    activeShape.coordinates[0].x,
                    activeShape.coordinates[0].y,
                    activeShape.coordinates[1].x,
                    activeShape.coordinates[1].y,
                    WHITE
                )
                dispatch(deleteShape(activeShape.id))
                dispatch(redraw())
                break;
            case types.eraseEllipse:
                deleteEllipse(
                    plano,
                    activeShape.coordinates[0].x,
                    activeShape.coordinates[0].y,
                    activeShape.coordinates[1].x,
                    activeShape.coordinates[1].y,
                    WHITE
                )
                dispatch(deleteShape(activeShape.id))
                dispatch(redraw())
                break;

            case types.eraseHyperbole:
                deleteHyperbole(
                    plano,
                    activeShape.coordinates[0].x,
                    activeShape.coordinates[0].y,
                    activeShape.coordinates[1].x,
                    activeShape.coordinates[1].y,
                    activeShape.hyperbole,
                    WHITE
                )
                dispatch(deleteShape(activeShape.id))
                dispatch(redraw())
                break;

            case types.eraseAll:
                plano.clearRect(0, 0, canvas.width, canvas.height);
                dispatch(clearAction())
                break;
            case types.redraw:
                plano.clearRect(0, 0, canvas.width, canvas.height);
                shapes.forEach((shape) => {
                    //! Switch para redibujar cada figura despues que se haya eliminado una
                    switch (shape.type.id) {
                        case shapesList.line.id:
                            redrawLine(
                                plano,
                                shape
                            )
                            break;

                        case shapesList.square.id:
                            redrawSquare(
                                plano,
                                shape
                            )
                            dispatch(clearAction())
                            break;
                        case shapesList.right_triangle.id:
                            redrawRightTriangle(
                                plano,
                                shape
                            )
                            dispatch(clearAction())
                            break
                        case shapesList.circle.id:
                            redrawCircle(
                                plano,
                                shape
                            )
                            dispatch(clearAction())
                            break
                        case shapesList.ellipse.id:
                            redrawEllipse(
                                plano,
                                shape
                            )
                            dispatch(clearAction())
                            break
                        case shapesList.hyperbole.id:
                            redrawHyperbole(
                                plano,
                                shape
                            )
                            dispatch(clearAction())
                            break
                        default:
                            break;

                    }
                })
                dispatch(clearAction())
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
                        case shapesList.right_triangle.id:
                            moveRightTriangle(
                                plano,
                                shape.coordinates[0].x,
                                shape.coordinates[0].y,
                                shape.coordinates[1].x,
                                shape.coordinates[1].y,
                                shape
                            )
                            dispatch(startMoving())
                            break;
                        case shapesList.circle.id:
                            moveCircle(
                                plano,
                                shape.coordinates[0].x,
                                shape.coordinates[0].y,
                                shape.coordinates[1].x,
                                shape.coordinates[1].y,
                                shape
                            )
                            dispatch(startMoving())
                            break;
                        case shapesList.ellipse.id:
                            moveEllipse(
                                plano,
                                shape.coordinates[0].x,
                                shape.coordinates[0].y,
                                shape.coordinates[1].x,
                                shape.coordinates[1].y,
                                shape
                            )
                            dispatch(startMoving())
                            break;
                        case shapesList.hyperbole.id:
                            moveHyperbole(
                                plano,
                                shape.coordinates[0].x,
                                shape.coordinates[0].y,
                                shape.coordinates[1].x,
                                shape.coordinates[1].y,
                                shape
                            )
                            dispatch(startMoving())
                            break;
                        default:
                            break;

                    }
                })
                break;
            case types.movingShapeSize:
                plano.clearRect(0, 0, canvas.width, canvas.height);
                shapes.forEach((shape) => {

                    //! Switch para redibujar cada figura despues que se haya eliminado una
                    switch (shape.type.id) {
                        case shapesList.line.id:
                            changeSizeLine(
                                plano,
                                shape.coordinates[0].x,
                                shape.coordinates[0].y,
                                shape.coordinates[1].x,
                                shape.coordinates[1].y,
                                shape.borderColor,
                                shape
                            )
                            dispatch(startMovingSize())
                            break;

                        case shapesList.square.id:

                            changeSizeSquare(
                                plano,
                                shape.coordinates[0].x,
                                shape.coordinates[0].y,
                                shape.coordinates[1].x,
                                shape.coordinates[1].y,
                                shape.borderColor,
                                shape
                            )

                            dispatch(startMovingSize())
                            break;
                        case shapesList.right_triangle.id:
                            changeSizeRightTriangle(
                                plano,
                                shape.coordinates[0].x,
                                shape.coordinates[0].y,
                                shape.coordinates[1].x,
                                shape.coordinates[1].y,
                                shape
                            )
                            dispatch(startMovingSize())
                            break;
                        case shapesList.circle.id:
                            changeSizeCircle(
                                plano,
                                shape.coordinates[0].x,
                                shape.coordinates[0].y,
                                shape.coordinates[1].x,
                                shape.coordinates[1].y,
                                shape
                            )
                            dispatch(startMovingSize())
                            break;
                        case shapesList.ellipse.id:
                            changeSizeEllipse(
                                plano,
                                shape.coordinates[0].x,
                                shape.coordinates[0].y,
                                shape.coordinates[1].x,
                                shape.coordinates[1].y,
                                shape
                            )
                            dispatch(startMovingSize())
                            break;
                        case shapesList.hyperbole.id:
                            changeSizeHyperbole(
                                plano,
                                shape.coordinates[0].x,
                                shape.coordinates[0].y,
                                shape.coordinates[1].x,
                                shape.coordinates[1].y,
                                shape
                            )
                            dispatch(startMovingSize())
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
        moveSquare,
        moveRightTriangle,
        deleteRightTriangle,
        redrawRightTriangle,
        deleteCircle,
        moveCircle,
        drawCircle,
        redrawCircle,
        redrawEllipse,
        deleteEllipse,
        moveEllipse,
        changeSizeCircle,
        changeSizeEllipse,
        changeSizeLine,
        changeSizeRightTriangle,
        changeSizeSquare,
        changeSizeHyperbole,
        redrawHyperbole,
        deleteHyperbole,
        moveHyperbole
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
                        true,
                        undefined,
                        0
                    )
                    dispatch(clearShapeDrawing())
                    dispatch(setACtiveShapeAfterInsert())
                    break;

                case shapesList.square.id:
                    drawSquare(
                        plano,
                        coordinates[0].x,
                        coordinates[0].y,
                        coordinates[1].x,
                        coordinates[1].y,
                        0
                    )

                    dispatch(clearShapeDrawing())
                    dispatch(setACtiveShapeAfterInsert())
                    break;

                case shapesList.right_triangle.id:
                    drawRightTriangle(
                        plano,
                        coordinates[0].x,
                        coordinates[0].y,
                        coordinates[1].x,
                        coordinates[1].y
                    )
                    dispatch(clearShapeDrawing())
                    dispatch(setACtiveShapeAfterInsert())
                    break;

                case shapesList.circle.id:
                    drawCircle(
                        plano,
                        coordinates[0].x,
                        coordinates[0].y,
                        coordinates[1].x,
                        coordinates[1].y
                    )
                    dispatch(clearShapeDrawing())
                    dispatch(setACtiveShapeAfterInsert())
                    break;
                case shapesList.ellipse.id:
                    drawEllipse(
                        plano,
                        coordinates[0].x,
                        coordinates[0].y,
                        coordinates[1].x,
                        coordinates[1].y
                    )
                    dispatch(clearShapeDrawing())
                    dispatch(setACtiveShapeAfterInsert())
                    break;
                case shapesList.hyperbole.id:
                    drawHyperbole(
                        plano,
                        coordinates[0].x,
                        coordinates[0].y,
                        coordinates[1].x,
                        coordinates[1].y,
                        1
                    )
                    dispatch(clearShapeDrawing())
                    dispatch(setACtiveShapeAfterInsert())
                    break;
                default:
                    break;
            }
            dispatch(stopMoving())
            dispatch(redraw())
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
        dispatch,
        drawRightTriangle,
        deleteCircle,
        moveCircle,
        drawCircle,
        redrawCircle,
        redrawEllipse,
        drawEllipse,
        drawHyperbole,
    ])


    const loadCanvas = (ref) => {
        setCanvas(ref)
    }

    const point = (x, y, color) => {
        drawPoint(plano, x, y, false, color)
    }



    return [point, loadCanvas]
}
