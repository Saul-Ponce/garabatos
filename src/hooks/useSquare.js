import { useDispatch, useSelector } from 'react-redux';
import { changeCoordinates, startMoving } from '../actions/shape';
import { DELETE_COLOR, EVITAR_DIFUMINADO } from '../const/const';
import { useLine } from './useLine';

export const useSquare = () => {
    const [drawLine] = useLine()

    const dispatch = useDispatch()

    const { color, movingCoordinates, activeShape, movingId, shapes } = useSelector(state => state.shape)

    const fillSquare = (plano, x1, y1, x2, y2, fillColor = color) => {

        plano.fillStyle = fillColor;

        const menorX = (x1 < x2 ? x1 : x2) + 3;
        const menorY = (y1 < y2 ? y1 : y2) + 3;
        const mayorY = (y1 > y2 ? y1 : y2) - 3;

        const dx = Math.abs(x1 - x2);


        //* Para disminuir 1 coordenada del cuadrado

        if (x1 > x2) {
            x1 += 1;
            x2 -= 1;
        } else {
            x1 -= 1;
            x2 += 1;
        }

        if (y1 > y2) {
            y1 -= 1;
            y2 += 1;
        } else {
            y1 += 1;
            y2 -= 1;
        }

        for (let i = menorX; i <= (menorX + dx - 6); i++) {
            drawLine(plano, i, menorY, i, mayorY, false, fillColor);
        }


    }

    const drawSquare = (plano, x1, y1, x2, y2, add = false, drawingColor = color) => {

        if (!plano) {
            return;
        }


        if (!x1 || !y1 || !x2 || !y2) {
            return;
        }

        plano.moveTo(0, 0)

        // x1,y1 -> x2,y1
        drawLine(plano, x1, y1, x2, y1, false, drawingColor)

        // x1,y1 -> x1,y2
        drawLine(plano, x1, y1, x1, y2, false, drawingColor)

        // x1,y2 -> x2,y2
        drawLine(plano, x1, y2, x2, y2, false, drawingColor)

        // x2,y2 -> x2,y1
        drawLine(plano, x2, y2, x2, y1, false, drawingColor)
    }

    const deleteSquare = (plano, x1, y1, x2, y2, id) => {
        console.log("deleing");


        for (let i = 0; i < EVITAR_DIFUMINADO; i++) {
            drawSquare(plano, x1, y1, x2, y2, false, DELETE_COLOR)
        }

        fillSquare(plano, x1, y1, x2, y2, DELETE_COLOR)


        plano.fillStyle = "#000"
        plano.moveTo(0, 0)


    }


    const redrawSquare = (plano, x1, y1, x2, y2, drawingColor = color) => {
        drawSquare(plano, x1, y1, x2, y2, false, drawingColor)
        plano.moveTo(0, 0)

    }

    const moveSquare = (plano, x1, y1, x2, y2, drawingColor = color, shape) => {



        console.log("dentro de movesquare");

        const { x, y } = movingCoordinates

        let dx = Math.abs(x1 - x2)
        let dy = Math.abs(y1 - y2)


        let parteX = dx / 2
        let parteY = dy / 2

        if (movingId === shape.id) {
            deleteSquare(plano, x1, y1, x2, y2)
            if (activeShape.fill) {
                fillSquare(
                    plano,
                    x1,
                    y1,
                    x2,
                    y2,
                    DELETE_COLOR
                )
            }
        }



        if (movingId !== shape.id) {
            drawSquare(
                plano,
                shape.coordinates[0].x,
                shape.coordinates[0].y,
                shape.coordinates[1].x,
                shape.coordinates[1].y,
                true
            )
            if (activeShape.fill) {
                fillSquare(
                    plano,
                    shape.coordinates[0].x,
                    shape.coordinates[0].y,
                    shape.coordinates[1].x,
                    shape.coordinates[1].y,
                    shape.fillColor
                )
            }
        }


        if (movingId === shape.id) {
            const coordinates = [{ x: x - parteX, y: y - parteY }, { x: x + parteX, y: y + parteY }]


            drawSquare(plano, x - parteX, y - parteY, x + parteX, y + parteY, false, drawingColor)

            if (activeShape.fill) {
                fillSquare(
                    plano,
                    coordinates[0].x,
                    coordinates[0].y,
                    coordinates[1].x,
                    coordinates[1].y,
                    activeShape.fillColor
                )
            }

            dispatch(changeCoordinates(activeShape.id, coordinates))
        }


        plano.moveTo(0, 0)

    }

    return [
        drawSquare,
        deleteSquare,
        redrawSquare,
        fillSquare,
        moveSquare
    ]
}