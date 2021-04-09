import { useDispatch, useSelector } from 'react-redux';
import { changeCoordinates, redraw } from '../actions/shape';
import { DELETE_COLOR, EVITAR_DIFUMINADO, WHITE } from '../const/const';
import { useLine } from './useLine';
import { usePoint } from './usePoint';

export const useCircle = () => {
    const [drawLine] = useLine()

    const [drawPoint] = usePoint()

    const dispatch = useDispatch()

    const { color, movingCoordinates, activeShape, movingId, shapes } = useSelector(state => state.shape)

    const drawCircle = (canvas, x1, y1, x2, y2, drawingColor = color) => {

        if (!canvas) {
            return;
        }

        canvas.fillStyle = drawingColor

        if (!x1 || !y1 || !x2 || !y2) {
            return;
        }

        let y, x;
        let h = x1,
            k = y1

        const r = Math.sqrt(
            (Math.pow((x2 - h), 2) + Math.pow((y2 - k), 2))
        )


        // drawLine(plano, x1, y1, x2, y2, color)



        for (let a = 0; a <= 45; a++) {

            x = r * Math.sin(a * Math.PI / 180)
            y = r * Math.cos(a * Math.PI / 180)

            // x,y
            drawPoint(canvas, x + h, y + k)

            // y,x
            drawPoint(canvas, y + h, x + k)

            // (-y, x)
            drawPoint(canvas, -y + h, x + k)

            // (-x,y)
            drawPoint(canvas, -x + h, y + k)

            // (-x, -y)
            drawPoint(canvas, -x + h, -y + k)

            // (-y,-x)
            drawPoint(canvas, -y + h, -x + k)

            // y, -x
            drawPoint(canvas, y + h, -x + k)

            // (x,-y)
            drawPoint(canvas, x + h, -y + k)
        }



        dispatch(redraw())

        // drawLine(canvas, x1, y1, x2, y2, false, "#ff0000")

        canvas.fillStyle = color

    }

    const deleteCircle = (canvas, x1, y1, x2, y2, deleteColor = DELETE_COLOR) => {


        if (activeShape.fill) {
            fillCircle(canvas, x1, y1, x2, y2, deleteColor, deleteColor)
        }

        for (let i = 0; i < EVITAR_DIFUMINADO; i++) {
            drawCircle(canvas, x1, y1, x2, y2, deleteColor)
        }

        canvas.fillStyle = color
        canvas.moveTo(0, 0)


    }

    const fillCircle = (canvas, x1, y1, x2, y2, fillColor = color, borderColor = color) => {
        console.log("fill: ", fillColor, " border: ", borderColor);
        canvas.fillStyle = fillColor;

        if (!canvas) {
            return;
        }


        if (!x1 || !y1 || !x2 || !y2) {
            return;
        }


        let x = x2, y = y2

        let h = x1,
            k = y1

        const r = Math.sqrt(
            (Math.pow((x2 - h), 2) + Math.pow((y2 - k), 2))
        )

        for (let newRadius = r; newRadius > 0; newRadius--) {
            if (x2 > x1) {
                x2 -= 3;
            } else {
                x2 += 3;
            }

            if (y2 > y1) {
                y2 -= 3;
            } else {
                y2 += 3;
            }
            drawCircle(canvas, h, k, h + newRadius - 1, k, fillColor)
        }

        canvas.fillStyle = borderColor

        drawCircle(canvas, h, k, x, y, borderColor)


    }


    const redrawCircle = (canvas, shape) => {

        const x1 = shape.coordinates[0].x
        const y1 = shape.coordinates[0].y
        const x2 = shape.coordinates[1].x
        const y2 = shape.coordinates[1].y

        if (shape.fill) {
            fillCircle(canvas, x1, y1, x2, y2, shape.fillColor, shape.borderColor)
        } else {
            drawCircle(canvas, x1, y1, x2, y2, shape.borderColor)
        }

        canvas.moveTo(0, 0)

    }

    const moveCircle = (canvas, x1, y1, x2, y2, shape) => {

        const { x, y } = movingCoordinates

        let dx = Math.abs(x1 - x2)
        let dy = Math.abs(y1 - y2)


        let parteX = dx / 2
        let parteY = dy / 2

        if (movingId === shape.id) {
            console.log("aqui");
            fillCircle(
                canvas,
                x1,
                y1,
                x2,
                y2,
                DELETE_COLOR,
                DELETE_COLOR
            )
            // if (activeShape.fill) {
            //     console.log("aqui llenando");
            //     fillCircle(
            //         canvas,
            //         x1,
            //         y1,
            //         x2,
            //         y2,
            //         DELETE_COLOR,
            //         DELETE_COLOR
            //     )
            // }
        }



        if (movingId !== shape.id) {
            if (shape.fill) {
                fillCircle(
                    canvas,
                    shape.coordinates[0].x,
                    shape.coordinates[0].y,
                    shape.coordinates[1].x,
                    shape.coordinates[1].y,
                    shape.fillColor,
                    shape.borderColor
                )
            } else {

                drawCircle(
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
                fillCircle(
                    canvas,
                    coordinates[0].x,
                    coordinates[0].y,
                    coordinates[1].x,
                    coordinates[1].y,
                    shape.fillColor,
                    shape.borderColor
                )
            } else {
                drawCircle(canvas, x - parteX, y - parteY, x + parteX, y + parteY, shape.borderColor)
            }

            dispatch(changeCoordinates(activeShape.id, coordinates))
        }


        canvas.moveTo(0, 0)

    }

    return [
        drawCircle,
        deleteCircle,
        redrawCircle,
        moveCircle
    ]
}