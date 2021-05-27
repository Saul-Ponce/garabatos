import { useDispatch, useSelector } from 'react-redux';
import { changeCoordinates } from '../actions/shape';
import { DELETE_COLOR, EVITAR_DIFUMINADO } from '../const/const';
import { useLine } from './useLine';

export const useRightTriangle = () => {
    const [drawLine] = useLine()

    const dispatch = useDispatch()

    const { color, movingCoordinates, activeShape, movingId } = useSelector(state => state.shape)

    const drawRightTriangle = (canvas, x1, y1, x2, y2, drawingColor = color) => {

        if (!canvas) {
            return;
        }


        if (!x1 || !y1 || !x2 || !y2) {
            return;
        }


        // valor por defecto
        let x3 = x1, y3 = x1;

        if (y1 < y2) {
            x3 = x2
            y3 = y1
        } else if (y2 < y1) {
            x3 = x1
            y3 = y2
        }

        canvas.moveTo(0, 0)

        // x1,y1 -> x2,y2
        drawLine(canvas, x1, y1, x2, y2, false, drawingColor)

        // x2,y2 -> x3,y3
        drawLine(canvas, x2, y2, x3, y3, false, drawingColor)

        // x3,y3 -> x1,y1
        drawLine(canvas, x3, y3, x1, y1, false, drawingColor)
    }

    const deleteRightTriangle = (canvas, x1, y1, x2, y2, deleteColor = DELETE_COLOR) => {

        for (let i = 0; i < EVITAR_DIFUMINADO; i++) {
            drawRightTriangle(canvas, x1, y1, x2, y2, deleteColor)
        }

        if (activeShape.fill) {
            fillRightTriangle(canvas, x1, y1, x2, y2, deleteColor, deleteColor)
        }

        canvas.fillStyle = color
        canvas.moveTo(0, 0)


    }

    const fillRightTriangle = (canvas, x1, y1, x2, y2, fillColor = color, borderColor = color) => {

        canvas.fillStyle = fillColor;

        //* Para disminuir 1 coordenada

        if (y1 === y2) {
            return
        }

        //! Inicio del algoritmo

        let inicioX = 0, inicioY = 0, finalY = 0, menorY = 0, incremento = 0

        if (x1 < x2) {
            inicioX = x1
            inicioY = y1
            finalY = y2
        } else {
            inicioX = x2
            inicioY = y2
            finalY = y1
        }

        const DX = Math.abs(x1 - x2)
        const DY = Math.abs(y1 - y2)

        if (inicioY < finalY) {
            incremento = (DY / DX)
            menorY = inicioY
        } else {
            incremento = - (DY / DX)
            menorY = finalY
        }

        for (let x = inicioX; x < (inicioX + DX); x++) {
            drawLine(canvas, x, menorY, x, inicioY, false, fillColor)
            inicioY += incremento
        }

        drawRightTriangle(canvas, x1, y1, x2, y2, borderColor)


    }


    const redrawRightTriangle = (canvas, shape) => {
        const x1 = shape.coordinates[0].x
        const y1 = shape.coordinates[0].y
        const x2 = shape.coordinates[1].x
        const y2 = shape.coordinates[1].y
        if (shape.fill) {
            fillRightTriangle(canvas, x1, y1, x2, y2, shape.fillColor, shape.borderColor)
        } else {
            drawRightTriangle(canvas, x1, y1, x2, y2, shape.borderColor)
        }

        canvas.moveTo(0, 0)

    }

    const moveRightTriangle = (canvas, x1, y1, x2, y2, shape) => {

        const { x, y } = movingCoordinates

        let dx = Math.abs(x1 - x2)
        let dy = Math.abs(y1 - y2)


        let parteX = dx / 2
        let parteY = dy / 2

        if ((y1 > y2 && x1 < x2) || (y2 > y1 && x2 < x1)) {
            parteY *= -1
        }

        if (movingId === shape.id) {
            deleteRightTriangle(canvas, x1, y1, x2, y2)
            if (activeShape.fill) {
                fillRightTriangle(
                    canvas,
                    x1,
                    y1,
                    x2,
                    y2,
                    DELETE_COLOR,
                    DELETE_COLOR
                )
            }
        }



        if (movingId !== shape.id) {
            if (shape.fill) {
                fillRightTriangle(
                    canvas,
                    shape.coordinates[0].x,
                    shape.coordinates[0].y,
                    shape.coordinates[1].x,
                    shape.coordinates[1].y,
                    shape.fillColor,
                    shape.borderColor
                )
            } else {
                drawRightTriangle(
                    canvas,
                    shape.coordinates[0].x,
                    shape.coordinates[0].y,
                    shape.coordinates[1].x,
                    shape.coordinates[1].y,
                    shape.borderColor
                )
            }
        }


        if (movingId === shape.id) {

            const coordinates = [{ x: x - parteX, y: y - parteY }, { x: x + parteX, y: y + parteY }]
            if (shape.fill) {
                fillRightTriangle(
                    canvas,
                    coordinates[0].x,
                    coordinates[0].y,
                    coordinates[1].x,
                    coordinates[1].y,
                    shape.fillColor,
                    shape.borderColor
                )
            } else {
                drawRightTriangle(canvas, x - parteX, y - parteY, x + parteX, y + parteY, shape.borderColor)
            }

            dispatch(changeCoordinates(activeShape.id, coordinates))
        }


        canvas.moveTo(0, 0)

    }

    const changeSizeRightTriangle = (canvas, x1, y1, x2, y2, shape) => {

        const { x, y } = movingCoordinates

        if (movingId === shape.id) {
            deleteRightTriangle(canvas, x1, y1, x2, y2)
            if (activeShape.fill) {
                fillRightTriangle(
                    canvas,
                    x1,
                    y1,
                    x2,
                    y2,
                    DELETE_COLOR,
                    DELETE_COLOR
                )
            }
        }



        if (movingId !== shape.id) {
            if (shape.fill) {
                fillRightTriangle(
                    canvas,
                    shape.coordinates[0].x,
                    shape.coordinates[0].y,
                    shape.coordinates[1].x,
                    shape.coordinates[1].y,
                    shape.fillColor,
                    shape.borderColor
                )
            } else {
                drawRightTriangle(
                    canvas,
                    shape.coordinates[0].x,
                    shape.coordinates[0].y,
                    shape.coordinates[1].x,
                    shape.coordinates[1].y,
                    shape.borderColor
                )
            }
        }


        if (movingId === shape.id) {

            const coordinates = [{ x: x1, y: y1 }, { x, y }]
            if (shape.fill) {
                fillRightTriangle(
                    canvas,
                    coordinates[0].x,
                    coordinates[0].y,
                    coordinates[1].x,
                    coordinates[1].y,
                    shape.fillColor,
                    shape.borderColor
                )
            } else {
                drawRightTriangle(canvas, x1, y1, x, y, shape.borderColor)
            }

            dispatch(changeCoordinates(activeShape.id, coordinates))
        }


        canvas.moveTo(0, 0)

    }

    return [
        drawRightTriangle,
        deleteRightTriangle,
        redrawRightTriangle,
        moveRightTriangle,
        changeSizeRightTriangle
    ]
}