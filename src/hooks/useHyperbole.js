import { useDispatch, useSelector } from 'react-redux';
import { changeCoordinates } from '../actions/shape';
import { DELETE_COLOR, EVITAR_DIFUMINADO } from '../const/const';
import { formulaGeneral, formulaGeneralRadioHiperbole } from '../helpers/formulaGeneral';
import { rotateX, rotateY } from '../helpers/rotatePoint';
import { usePoint } from './usePoint';

export const useHyperbole = () => {
    const [drawPoint] = usePoint()

    const dispatch = useDispatch()

    const { color, movingCoordinates, activeShape, movingId } = useSelector(state => state.shape)

    const drawHyperbole = (canvas, x1, y1, x2, y2, axis, angle, drawingColor = color) => {

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

        let a = Math.abs(x1 - x2) / 2 * axis

        let b = Math.abs(y1 - y2) / 2 * axis * -1

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

        let nX, nY
        let angl = angle

        for (let x = inicio; x <= fin; x++) {

            let y = formulaGeneral({
                x, h, k, a, b, r, m, n
            })

            nX = rotateX({ angle: angl, centerX: h, centerY: k, x, y });
            nY = rotateY({ angle: angl, centerX: h, centerY: k, x, y });

            drawPoint(canvas, nX, nY)

            nX = rotateX({ angle: -angl, centerX: h, centerY: k, x, y, });
            nY = rotateY({ angle: -angl, centerX: h, centerY: k, x, y, })
            drawPoint(canvas, nX, -(nY - k) + b + (k - b))

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
            nX = rotateX({ angle: angl, centerX: h, centerY: k, x, y });
            nY = rotateY({ angle: angl, centerX: h, centerY: k, x, y });
            drawPoint(canvas, nX, nY)
            nX = rotateX({ angle: -angl, centerX: h, centerY: k, x, y, });
            nY = rotateY({ angle: -angl, centerX: h, centerY: k, x, y, })
            drawPoint(canvas, -(nX - h) + a + (h - a), nY)
        }


        canvas.fillStyle = color

    }

    const deleteHyperbole = (canvas, x1, y1, x2, y2, axis, angle, deleteColor = DELETE_COLOR) => {




        for (let i = 0; i < EVITAR_DIFUMINADO; i++) {
            drawHyperbole(canvas, x1, y1, x2, y2, axis, angle, deleteColor)
        }

        canvas.fillStyle = color
        canvas.moveTo(0, 0)


    }

    const redrawHyperbole = (canvas, shape) => {

        const x1 = shape.coordinates[0].x
        const y1 = shape.coordinates[0].y
        const x2 = shape.coordinates[1].x
        const y2 = shape.coordinates[1].y


        drawHyperbole(canvas, x1, y1, x2, y2, shape.hyperbole, shape.angle, shape.borderColor)



        if (activeShape.id === shape.id) {
            selectHyperbole(canvas,
                x1, y1, x2, y2, shape.hyperbole, shape.angle)
        }
        canvas.moveTo(0, 0)

    }

    const moveHyperbole = (canvas, x1, y1, x2, y2, shape) => {

        const { x, y } = movingCoordinates

        let dx = Math.abs(x1 - x2)
        let dy = Math.abs(y1 - y2)


        let parteX = dx / 2
        let parteY = dy / 2


        if (movingId !== shape.id) {


            drawHyperbole(
                canvas,
                shape.coordinates[0].x,
                shape.coordinates[0].y,
                shape.coordinates[1].x,
                shape.coordinates[1].y,
                shape.hyperbole,
                shape.angle,
                shape.borderColor
            )


        }


        if (movingId === shape.id) {

            const coordinates = [{ x: x - parteX, y: y - parteY }, { x: x + parteX, y: y + parteY }]

            drawHyperbole(canvas, x - parteX, y - parteY, x + parteX, y + parteY, shape.hyperbole, shape.angle, shape.borderColor)



            if (activeShape.id === shape.id) {
                selectHyperbole(
                    canvas,
                    coordinates[0].x,
                    coordinates[0].y,
                    coordinates[1].x,
                    coordinates[1].y,
                    shape.hyperbole,
                    shape.angle
                )
            }

            dispatch(changeCoordinates(activeShape.id, coordinates))
        }


        canvas.moveTo(0, 0)

    }

    const changeSizeHyperbole = (canvas, x1, y1, x2, y2, shape) => {
        const { x, y } = movingCoordinates


        if (movingId !== shape.id) {

            drawHyperbole(
                canvas,
                shape.coordinates[0].x,
                shape.coordinates[0].y,
                shape.coordinates[1].x,
                shape.coordinates[1].y,
                shape.hyperbole,
                shape.angle,
                shape.borderColor
            )


        }


        if (movingId === shape.id) {

            const coordinates = [{ x: x1, y: y1 }, { x, y }]

            drawHyperbole(canvas, x1, y1, x, y, shape.hyperbole, shape.angle, shape.borderColor)

            if (activeShape.id === shape.id) {
                selectHyperbole(canvas,
                    coordinates[0].x,
                    coordinates[0].y,
                    coordinates[1].x,
                    coordinates[1].y,
                    shape.hyperbole,
                    shape.angle)
            }


            dispatch(changeCoordinates(activeShape.id, coordinates))
        }


        canvas.moveTo(0, 0)

    }


    const selectHyperbole = (plano, x1, y1, x2, y2, axis, angle) => {
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
        drawHyperbole(plano, x1, y1, x2, y2, axis, angle, "yellow")
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