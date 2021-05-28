import { useDispatch, useSelector } from 'react-redux';
import { changeCoordinates } from '../actions/shape';
import { DELETE_COLOR, EVITAR_DIFUMINADO } from '../const/const';
import { formulaGeneral, formulaGeneralRadioHiperbole } from '../helpers/formulaGeneral';
import { usePoint } from './usePoint';

export const useHyperbole = () => {
    const [drawPoint] = usePoint()

    const dispatch = useDispatch()

    const { color, movingCoordinates, activeShape, movingId } = useSelector(state => state.shape)

    const drawHyperbole = (canvas, x1, y1, x2, y2, drawingColor = color) => {

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

        let a = Math.abs(x1 - x2) / 2 * activeShape.hyperbole

        let b = Math.abs(y1 - y2) / 2 * activeShape.hyperbole * -1

        if (a === 0) {
            a = 1
        }

        if (b === 0) {
            b = 1
        }

        let r = formulaGeneralRadioHiperbole({
            x: h - a,
            y: k - b,
            h,
            k,
            b,
            a,
            m,
            n
        })

        console.log(r);


        let inicio = 0
        let fin = 0

        if (x1 < x2) {
            inicio = x1
            fin = x2
        } else {
            inicio = x2
            fin = x1
        }


        for (let x = inicio; x <= fin; x++) {

            let y = formulaGeneral({
                x, h, k, a, b, r, m, n
            })

            drawPoint(canvas, x, y)
            drawPoint(canvas, x, -(y - k) + b + (k - b))

        }

        if (y1 > y2) {
            inicio = y2
            fin = y1
        } else {
            inicio = y1
            fin = y2
        }


        for (let y = inicio; y <= fin; y++) {
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
            drawPoint(canvas, -(x - h) + a + (h - a), y)
        }


        canvas.fillStyle = color

    }

    const deleteHyperbole = (canvas, x1, y1, x2, y2, deleteColor = DELETE_COLOR) => {


        if (activeShape.fill) {
            fillHyperbole(canvas, x1, y1, x2, y2, deleteColor, deleteColor)
        }

        for (let i = 0; i < EVITAR_DIFUMINADO; i++) {
            drawHyperbole(canvas, x1, y1, x2, y2, deleteColor)
        }

        canvas.fillStyle = color
        canvas.moveTo(0, 0)


    }

    const fillHyperbole = (canvas, x1, y1, x2, y2, fillColor = color, borderColor = color) => {
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

            if (x1 > x2) {
                x1--
                x2++
            } else {
                x1++;
                x2--;
            }

            if (y1 > y2) {
                y1 -= 1;
                y2 += 1;
            } else {
                y1 += 1;
                y2 -= 1;
            }

            drawHyperbole(canvas, x1, y1, x2, y2, fillColor)
        }


        canvas.fillStyle = borderColor

        drawHyperbole(canvas, h, k, x, y, borderColor)


    }


    const redrawHyperbole = (canvas, shape) => {

        const x1 = shape.coordinates[0].x
        const y1 = shape.coordinates[0].y
        const x2 = shape.coordinates[1].x
        const y2 = shape.coordinates[1].y

        if (shape.fill) {
            fillHyperbole(canvas, x1, y1, x2, y2, shape.fillColor, shape.borderColor)
        } else {
            drawHyperbole(canvas, x1, y1, x2, y2, shape.borderColor)
        }


        if (activeShape.id === shape.id) {
            selectHyperbole(canvas,
                x1, y1, x2, y2)
        }
        canvas.moveTo(0, 0)

    }

    const moveHyperbole = (canvas, x1, y1, x2, y2, shape) => {

        const { x, y } = movingCoordinates

        let dx = Math.abs(x1 - x2)
        let dy = Math.abs(y1 - y2)


        let parteX = dx / 2
        let parteY = dy / 2

        if (movingId === shape.id) {
            fillHyperbole(
                canvas,
                x1,
                y1,
                x2,
                y2,
                DELETE_COLOR,
                DELETE_COLOR
            )
            // if (activeShape.fill) {
            //     fillHyperbole(
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
                fillHyperbole(
                    canvas,
                    shape.coordinates[0].x,
                    shape.coordinates[0].y,
                    shape.coordinates[1].x,
                    shape.coordinates[1].y,
                    shape.fillColor,
                    shape.borderColor
                )
            } else {

                drawHyperbole(
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
                fillHyperbole(
                    canvas,
                    coordinates[0].x,
                    coordinates[0].y,
                    coordinates[1].x,
                    coordinates[1].y,
                    shape.fillColor,
                    shape.borderColor
                )
            } else {
                drawHyperbole(canvas, x - parteX, y - parteY, x + parteX, y + parteY, shape.borderColor)
            }


            if (activeShape.id === shape.id) {
                selectHyperbole(canvas,
                    coordinates[0].x,
                    coordinates[0].y,
                    coordinates[1].x,
                    coordinates[1].y)
            }

            dispatch(changeCoordinates(activeShape.id, coordinates))
        }


        canvas.moveTo(0, 0)

    }

    const changeSizeHyperbole = (canvas, x1, y1, x2, y2, shape) => {

        const { x, y } = movingCoordinates

        if (movingId === shape.id) {
            fillHyperbole(
                canvas,
                x1,
                y1,
                x2,
                y2,
                DELETE_COLOR,
                DELETE_COLOR
            )
            // if (activeShape.fill) {
            //     fillHyperbole(
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
                fillHyperbole(
                    canvas,
                    shape.coordinates[0].x,
                    shape.coordinates[0].y,
                    shape.coordinates[1].x,
                    shape.coordinates[1].y,
                    shape.fillColor,
                    shape.borderColor
                )
            } else {

                drawHyperbole(
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
                fillHyperbole(
                    canvas,
                    coordinates[0].x,
                    coordinates[0].y,
                    coordinates[1].x,
                    coordinates[1].y,
                    shape.fillColor,
                    shape.borderColor
                )
            } else {
                drawHyperbole(canvas, x1, y1, x, y, shape.borderColor)
            }

            if (activeShape.id === shape.id) {
                selectHyperbole(canvas,
                    coordinates[0].x,
                    coordinates[0].y,
                    coordinates[1].x,
                    coordinates[1].y)
            }


            dispatch(changeCoordinates(activeShape.id, coordinates))
        }


        canvas.moveTo(0, 0)

    }


    const selectHyperbole = (plano, x1, y1, x2, y2) => {
        console.log(x1, y1, x2, y2)
        if (x1 > x2) {
            x1 += 3
            x2 -= 3
        } else {
            x1 -= 3
            x2 += 3
        }
        if (y1 > y2) {
            y1 += 3
            y2 -= 3
        } else {
            y1 -= 3
            y2 += 3
        }
        // drawHyperbole(plano, x1, y1, x2, y2, "yellow")
        // plano.moveTo(0, 0)
    }

    return [
        drawHyperbole,
        deleteHyperbole,
        redrawHyperbole,
        moveHyperbole,
        changeSizeHyperbole
    ]
}