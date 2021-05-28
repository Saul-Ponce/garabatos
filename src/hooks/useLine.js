import { useDispatch, useSelector } from 'react-redux';
import { changeCoordinates } from '../actions/shape';
import { DELETE_COLOR, EVITAR_DIFUMINADO } from '../const/const';
import { formulaGeneral } from '../helpers/formulaGeneral';
import { usePoint } from './usePoint';

export const useLine = () => {

    /* let dx = 0;
    let dy = 0; */


    const { color, activeShape, movingCoordinates, movingId } = useSelector(state => state.shape)

    const dispatch = useDispatch()

    const [drawPoint] = usePoint()

    const drawLine = (canvas, x1, y1, x2, y2, oneTime = false, drawingColor = color) => {

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

            if (a === 0) {
                let inicioY = y1 < y2 ? y1 : y2
                let finY = y1 > y2 ? y1 : y2
                for (let y = inicioY; y <= finY; y++) {
                    drawPoint(canvas, x1, y);
                }
            } else if (Math.abs(a) > Math.abs(b)) {
                let h = x1 < x2 ? x1 : x2
                let k = x1 === h ? y1 : y2

                const END = Math.abs(b) > Math.abs(a) ? Math.abs(b) + k : Math.abs(a) + h
                for (let x = h; x <= END; x++) {
                    let y = formulaGeneral({
                        x, h, k, a, b, r, m, n
                    })
                    y = Math.round(y)
                    drawPoint(canvas, x, y);
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
                    x = Math.round(x)
                    drawPoint(canvas, x, y);
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

    const deleteLine = (canvas, x1, y1, x2, y2, deleteColor = DELETE_COLOR) => {

        for (let i = 0; i < EVITAR_DIFUMINADO; i++) {
            drawLine(canvas, x1, y1, x2, y2, false, deleteColor)
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
                x1, y1, x2, y2)
        }

        drawLine(canvas, x1, y1, x2, y2, false, shape.drawingColor)


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
            deleteLine(canvas, x1, y1, x2, y2)

        }


        if (movingId !== shape.id) {
            drawLine(
                canvas,
                shape.coordinates[0].x,
                shape.coordinates[0].y,
                shape.coordinates[1].x,
                shape.coordinates[1].y,
                true,
                shape.borderColor
            )
        }


        if (movingId === shape.id) {
            const coordinates = [{ x: x - parteX, y: y - parteY }, { x: x + parteX, y: y + parteY }]
            if (activeShape.id === shape.id) {
                selectLine(canvas,
                    coordinates[0].x,
                    coordinates[0].y,
                    coordinates[1].x,
                    coordinates[1].y)
            }

            drawLine(canvas, x - parteX, y - parteY, x + parteX, y + parteY, false, drawingColor)


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
            deleteLine(canvas, x1, y1, x2, y2)

        }


        if (movingId !== shape.id) {
            drawLine(
                canvas,
                shape.coordinates[0].x,
                shape.coordinates[0].y,
                shape.coordinates[1].x,
                shape.coordinates[1].y,
                true,
                shape.borderColor
            )
        }


        if (movingId === shape.id) {
            const coordinates = [{ x: x1, y: y1 }, { x, y }]


            if (activeShape.id === shape.id) {
                selectLine(canvas,
                    coordinates[0].x,
                    coordinates[0].y,
                    coordinates[1].x,
                    coordinates[1].y)
            }

            drawLine(canvas, x1, y1, x, y, false, drawingColor)


            dispatch(changeCoordinates(activeShape.id, coordinates))
        }


        canvas.moveTo(0, 0)

    }

    const selectLine = (plano, x1, y1, x2, y2) => {
        console.log(x1, y1, x2, y2)
        y1 += 3
        y2 += 3
        x1 += 3
        x2 += 3
        drawLine(plano, x1, y1, x2, y2, true, "yellow")
        y1 += -6
        y2 += -6
        x1 += -6
        x2 += -6
        drawLine(plano, x1, y1, x2, y2, true, "yellow")
        // plano.moveTo(0, 0)
    }

    return [drawLine, deleteLine, redrawLine, moveLine, changeSizeLine]
}