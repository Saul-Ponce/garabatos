import { useDispatch, useSelector } from 'react-redux';
import { changeCoordinates } from '../actions/shape';
import { DELETE_COLOR, EVITAR_DIFUMINADO } from '../const/const';
import { formulaGeneral } from '../helpers/formulaGeneral';
import { rotateX, rotateY } from '../helpers/rotatePoint';
import { usePoint } from './usePoint';

export const useLine = () => {

    /* let dx = 0;
    let dy = 0; */


    const { color, activeShape, movingCoordinates, movingId } = useSelector(state => state.shape)

    const dispatch = useDispatch()

    const [drawPoint] = usePoint()

    const drawLine = (canvas, x1, y1, x2, y2, oneTime = false, drawingColor = color, angle) => {
        let nX, nY
        let angl = angle
        if (canvas) {
            canvas.fillStyle = drawingColor
            //Se multiplica por 10 solamente para la escala pintar a escala
            // x1 *= 10;
            // x2 *= 10;
            // y1 *= 10;
            // y2 *= 10;

            const m = 1, n = 1, r = 0
            let a = -(x2 - x1)
            let b = y2 - y1

            let h = (x1 + x2) / 2,
                k = (y1 + y2) / 2

            if (a === 0) {
                let inicioY = y1 < y2 ? y1 : y2
                let finY = y1 > y2 ? y1 : y2
                for (let y = inicioY; y <= finY; y++) {
                    nX = rotateX({ angle: angl, centerX: h, centerY: k, x: x1, y });
                    nY = rotateY({ angle: angl, centerX: h, centerY: k, x: x1, y });
                    drawPoint(canvas, nX, nY);
                }
            } else if (Math.abs(a) > Math.abs(b)) {
                let h = x1 < x2 ? x1 : x2
                let k = x1 === h ? y1 : y2

                const END = Math.abs(b) > Math.abs(a) ? Math.abs(b) + k : Math.abs(a) + h
                for (let x = h; x <= END; x++) {
                    let y = formulaGeneral({
                        x, h, k, a, b, r, m, n
                    })
                    // y = Math.round(y)
                    nX = rotateX({ angle: angl, centerX: h, centerY: k, x, y });
                    nY = rotateY({ angle: angl, centerX: h, centerY: k, x, y });
                    drawPoint(canvas, nX, nY);
                }
            } else {
                let k = y1 < y2 ? y1 : y2
                let h = y1 === k ? x1 : x2

                const END = Math.abs(b) > Math.abs(a) ? Math.abs(b) + k : Math.abs(a) + h
                for (let y = k; y <= END; y++) {
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
                    // x = Math.round(x)
                    nX = rotateX({ angle: angl, centerX: h, centerY: k, x, y });
                    nY = rotateY({ angle: angl, centerX: h, centerY: k, x, y });
                    drawPoint(canvas, nX, nY);
                }
            }





            /* for (let i = 0; i <= pasos; i++) {
    
    
                //* Para que pinte el primer pixel
                if (i === 0) {
                    drawPoint(canvas, x, y);
                    continue;
                }
    
                x += siguienteX;
                y += siguienteY;
    
                drawPoint(canvas, x, y);
            }*/

        }

        /* dx = 0
        dy = 0 */

    }

    const deleteLine = (canvas, x1, y1, x2, y2, angle, deleteColor = DELETE_COLOR) => {

        for (let i = 0; i < EVITAR_DIFUMINADO; i++) {
            drawLine(canvas, x1, y1, x2, y2, false, deleteColor, angle)
        }

        canvas.fillStyle = deleteColor
        canvas.moveTo(0, 0)

    }

    const redrawLine = (canvas, shape) => {

        const x1 = shape.coordinates[0].x
        const y1 = shape.coordinates[0].y
        const x2 = shape.coordinates[1].x
        const y2 = shape.coordinates[1].y

        if (activeShape.id === shape.id) {
            selectLine(canvas,
                x1, y1, x2, y2, shape.angle)
        }
        drawLine(canvas, x1, y1, x2, y2, false, shape.borderColor, shape.angle)


        canvas.moveTo(0, 0)

    }

    const moveLine = (canvas, x1, y1, x2, y2, drawingColor = color, shape) => {


        const { x, y } = movingCoordinates

        let dx = Math.abs(x1 - x2)
        let dy = Math.abs(y1 - y2)


        let parteX = dx / 2
        let parteY = dy / 2


        if ((y1 > y2 && x1 < x2) || (y2 > y1 && x2 < x1)) {
            parteY *= -1
        }


        if (movingId === shape.id) {
            deleteLine(canvas, x1, y1, x2, y2, shape.angle)

        }


        if (movingId !== shape.id) {
            drawLine(
                canvas,
                shape.coordinates[0].x,
                shape.coordinates[0].y,
                shape.coordinates[1].x,
                shape.coordinates[1].y,
                true,
                shape.borderColor,
                shape.angle
            )
        }


        if (movingId === shape.id) {
            const coordinates = [{ x: x - parteX, y: y - parteY }, { x: x + parteX, y: y + parteY }]
            if (activeShape.id === shape.id) {
                selectLine(canvas,
                    coordinates[0].x,
                    coordinates[0].y,
                    coordinates[1].x,
                    coordinates[1].y, shape.angle)
            }

            drawLine(canvas, x - parteX, y - parteY, x + parteX, y + parteY, false, drawingColor, shape.angle)


            dispatch(changeCoordinates(activeShape.id, coordinates))
        }


        canvas.moveTo(0, 0)

    }

    const changeSizeLine = (canvas, x1, y1, x2, y2, drawingColor = color, shape) => {


        const { x, y } = movingCoordinates

        // let dx = Math.abs(x1 - x2)
        // let dy = Math.abs(y1 - y2)


        // let parteX = dx / 2
        // let parteY = dy / 2


        // if ((y1 > y2 && x1 < x2) || (y2 > y1 && x2 < x1)) {
        //     parteY *= -1
        // }


        if (movingId === shape.id) {
            deleteLine(canvas, x1, y1, x2, y2, shape.angle)

        }


        if (movingId !== shape.id) {
            drawLine(
                canvas,
                shape.coordinates[0].x,
                shape.coordinates[0].y,
                shape.coordinates[1].x,
                shape.coordinates[1].y,
                true,
                shape.borderColor,
                shape.angle
            )
        }


        if (movingId === shape.id) {
            const coordinates = [{ x: x1, y: y1 }, { x, y }]


            if (activeShape.id === shape.id) {
                selectLine(canvas,
                    coordinates[0].x,
                    coordinates[0].y,
                    coordinates[1].x,
                    coordinates[1].y,
                    shape.angle)
            }

            drawLine(canvas, x1, y1, x, y, false, drawingColor, shape.angle)


            dispatch(changeCoordinates(activeShape.id, coordinates))
        }


        canvas.moveTo(0, 0)

    }

    const selectLine = (plano, x1, y1, x2, y2, angle) => {
        console.log(x1, y1, x2, y2)
        y1 += 3
        y2 += 3
        x1 += 3
        x2 += 3
        drawLine(plano, x1, y1, x2, y2, true, "yellow", angle)
        y1 += -6
        y2 += -6
        x1 += -6
        x2 += -6
        drawLine(plano, x1, y1, x2, y2, true, "yellow", angle)
        // plano.moveTo(0, 0)
    }

    return [drawLine, deleteLine, redrawLine, moveLine, changeSizeLine]
}