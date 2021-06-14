import { useDispatch, useSelector } from 'react-redux';
import { changeCoordinates } from '../actions/shape';
import { DELETE_COLOR, EVITAR_DIFUMINADO } from '../const/const';
import { formulaGeneral, formulaGeneralRadio } from '../helpers/formulaGeneral';
import { rotateX, rotateY } from '../helpers/rotatePoint';
import { usePoint } from './usePoint';

export const useEllipse = () => {
    const [drawPoint] = usePoint()

    const dispatch = useDispatch()

    const { color, movingCoordinates, activeShape, movingId } = useSelector(state => state.shape)

    const drawEllipse = (canvas, x1, y1, x2, y2, angle, drawingColor = color) => {

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

        let a = Math.abs(x1 - x2) / 2

        let b = Math.abs(y1 - y2) / 2

        if (a === 0) {
            a = 1
        }

        if (b === 0) {
            b = 1
        }

        let r = formulaGeneralRadio({
            x: h - a,
            y: k - b,
            h,
            k,
            b,
            a,
            m,
            n
        })
        let nX, nY
        let angl = angle
        for (let x = h - a; x <= h + a; x++) {

            let y = formulaGeneral({
                x, h, k, a, b, r, m, n
            })

            nX = rotateX({ angle: angl, centerX: h, centerY: k, x, y });
            nY = rotateY({ angle: angl, centerX: h, centerY: k, x, y });

            drawPoint(canvas, nX, nY)

            nX = rotateX({ angle: -angl, centerX: h, centerY: k, x, y, });
            nY = rotateY({ angle: -angl, centerX: h, centerY: k, x, y, });
            drawPoint(canvas, nX, -(nY - k) + b + (k - b))

        }

        for (let y = k - b; y <= k + b; y++) {
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
            nY = rotateY({ angle: -angl, centerX: h, centerY: k, x, y, });
            drawPoint(canvas, -(nX - h) + a + (h - a), nY)
        }


        canvas.fillStyle = color

    }

    const deleteEllipse = (canvas, x1, y1, x2, y2, angle, deleteColor = DELETE_COLOR) => {


        if (activeShape.fill) {
            fillEllipse(canvas, x1, y1, x2, y2, deleteColor, deleteColor)
        }

        for (let i = 0; i < EVITAR_DIFUMINADO; i++) {
            drawEllipse(canvas, x1, y1, x2, y2, deleteColor)
        }

        canvas.fillStyle = color
        canvas.moveTo(0, 0)


    }

    const fillEllipse = (canvas, x1, y1, x2, y2, angle, fillColor = color, borderColor = color) => {
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

            drawEllipse(canvas, x1, y1, x2, y2, angle, fillColor)
        }


        canvas.fillStyle = borderColor

        drawEllipse(canvas, h, k, x, y, angle, borderColor)


    }


    const redrawEllipse = (canvas, shape) => {

        const x1 = shape.coordinates[0].x
        const y1 = shape.coordinates[0].y
        const x2 = shape.coordinates[1].x
        const y2 = shape.coordinates[1].y

        if (shape.fill) {
            fillEllipse(canvas, x1, y1, x2, y2, shape.angle, shape.fillColor, shape.borderColor)
        } else {
            drawEllipse(canvas, x1, y1, x2, y2, shape.angle, shape.borderColor)
        }


        if (activeShape.id === shape.id) {
            selectEllipse(canvas,
                x1, y1, x2, y2, shape.angle)
        }
        canvas.moveTo(0, 0)

    }

    const moveEllipse = (canvas, x1, y1, x2, y2, shape) => {

        const { x, y } = movingCoordinates

        let dx = Math.abs(x1 - x2)
        let dy = Math.abs(y1 - y2)


        let parteX = dx / 2
        let parteY = dy / 2

        if (movingId === shape.id) {
            fillEllipse(
                canvas,
                x1,
                y1,
                x2,
                y2,
                shape.angle,
                DELETE_COLOR,
                DELETE_COLOR
            )
            // if (activeShape.fill) {
            //     fillEllipse(
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
                fillEllipse(
                    canvas,
                    shape.coordinates[0].x,
                    shape.coordinates[0].y,
                    shape.coordinates[1].x,
                    shape.coordinates[1].y,
                    shape.angle,
                    shape.fillColor,
                    shape.borderColor
                )
            } else {

                drawEllipse(
                    canvas,
                    shape.coordinates[0].x,
                    shape.coordinates[0].y,
                    shape.coordinates[1].x,
                    shape.coordinates[1].y,
                    shape.angle,
                    shape.borderColor
                )
            }

        }


        if (movingId === shape.id) {

            const coordinates = [{ x: x - parteX, y: y - parteY }, { x: x + parteX, y: y + parteY }]
            if (shape.fill) {
                fillEllipse(
                    canvas,
                    coordinates[0].x,
                    coordinates[0].y,
                    coordinates[1].x,
                    coordinates[1].y,
                    shape.angle,
                    shape.fillColor,
                    shape.borderColor
                )
            } else {
                drawEllipse(canvas, x - parteX, y - parteY, x + parteX, y + parteY, shape.angle, shape.borderColor)
            }


            if (activeShape.id === shape.id) {
                selectEllipse(canvas,
                    coordinates[0].x,
                    coordinates[0].y,
                    coordinates[1].x,
                    coordinates[1].y,
                    shape.angle)
            }

            dispatch(changeCoordinates(activeShape.id, coordinates))
        }


        canvas.moveTo(0, 0)

    }

    const changeSizeEllipse = (canvas, x1, y1, x2, y2, shape) => {

        const { x, y } = movingCoordinates

        if (movingId === shape.id) {
            fillEllipse(
                canvas,
                x1,
                y1,
                x2,
                y2,
                shape.angle,
                DELETE_COLOR,
                DELETE_COLOR
            )
            // if (activeShape.fill) {
            //     fillEllipse(
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
                fillEllipse(
                    canvas,
                    shape.coordinates[0].x,
                    shape.coordinates[0].y,
                    shape.coordinates[1].x,
                    shape.coordinates[1].y,
                    shape.fillColor,
                    shape.angle,
                    shape.borderColor
                )
            } else {

                drawEllipse(
                    canvas,
                    shape.coordinates[0].x,
                    shape.coordinates[0].y,
                    shape.coordinates[1].x,
                    shape.coordinates[1].y,
                    shape.angle,
                    shape.borderColor
                )
            }

        }


        if (movingId === shape.id) {

            const coordinates = [{ x: x1, y: y1 }, { x, y }]
            if (shape.fill) {
                fillEllipse(
                    canvas,
                    coordinates[0].x,
                    coordinates[0].y,
                    coordinates[1].x,
                    coordinates[1].y,
                    shape.angle,
                    shape.fillColor,

                    shape.borderColor
                )
            } else {
                drawEllipse(canvas, x1, y1, x, y, shape.angle, shape.borderColor)
            }

            if (activeShape.id === shape.id) {
                selectEllipse(canvas,
                    coordinates[0].x,
                    coordinates[0].y,
                    coordinates[1].x,
                    coordinates[1].y,
                    shape.angle)
            }


            dispatch(changeCoordinates(activeShape.id, coordinates))
        }


        canvas.moveTo(0, 0)

    }


    const selectEllipse = (plano, x1, y1, x2, y2, angle) => {
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
        drawEllipse(plano, x1, y1, x2, y2, angle, "yellow")
        // plano.moveTo(0, 0)
    }

    return [
        drawEllipse,
        deleteEllipse,
        redrawEllipse,
        moveEllipse,
        changeSizeEllipse
    ]
}