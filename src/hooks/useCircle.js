import { useDispatch, useSelector } from 'react-redux';
import { changeCoordinates } from '../actions/shape';
import { DELETE_COLOR, EVITAR_DIFUMINADO } from '../const/const';
import { formulaGeneral, raiz } from '../helpers/formulaGeneral';
import { usePoint } from './usePoint';

export const useCircle = () => {
    const [drawPoint] = usePoint()

    const dispatch = useDispatch()

    const { color, movingCoordinates, activeShape, movingId } = useSelector(state => state.shape)

    const drawCircle = (canvas, x1, y1, x2, y2, drawingColor = color) => {

        if (!canvas) {
            return;
        }

        canvas.fillStyle = drawingColor

        if (!x1 || !y1 || !x2 || !y2) {
            return;
        }
        const m = 2, n = 2

        let h = (x1 + x2) / 2,
            k = (y1 + y2) / 2


        const a = Math.sqrt(
            (Math.pow((x2 - h), 2) + Math.pow((y2 - k), 2))
        )
        const b = a

        const r = raiz(a, 1 / 2)

        for (let x = -b + h; x <= Math.abs(b) + h; x++) {

            let y = formulaGeneral({
                x, h, k, a, b, r, m, n
            })
            drawPoint(canvas, x, y)
            /* y = formulaGeneral({
                x, h, k: -k, a, b, r, m, n
            })
            drawPoint(canvas, x, -y) */

            drawPoint(canvas, x, -(y - k) + b + (k - b))

        }

        for (let y = -a + k; y < Math.abs(a) + k; y++) {
            let x = formulaGeneral({
                x: y,
                h: k,
                k: h,
                a: b,
                b: a,
                m: n,
                n: m,
                r
            })
            drawPoint(canvas, x, y)
            /* x = formulaGeneral({
                x: y,
                h: k,
                k: -h,
                a: b,
                b: a,
                m: n,
                n: m,
                r
            }) */
            drawPoint(canvas, -(x - h) + a + (h - a), y)
        }

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
        canvas.fillStyle = fillColor;

        if (!canvas) {
            return;
        }


        if (!x1 || !y1 || !x2 || !y2) {
            return;
        }


        let x = x2, y = y2

        const r = Math.sqrt(
            (Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))
        )

        let h = x1,
            k = y1

        for (let newRadius = r; newRadius > 0; newRadius--) {

            if (x1 < x2) {
                x1++
                x2--
            } else {
                x2++
                x1--
            }

            if (y1 < y2) {
                y1++
                y2--
            } else {
                y1--
                y2++
            }

            drawCircle(canvas, x1, y1, x2, y2, fillColor)
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