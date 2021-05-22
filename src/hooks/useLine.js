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
            let h
            let k

            if (a === 0) {
                let inicioY = y1 < y2 ? y1 : y2
                let finY = y1 > y2 ? y1 : y2
                for (let y = inicioY; y <= finY; y++) {
                    drawPoint(canvas, x1, y);
                }
            } else if (Math.abs(b) > Math.abs(a)) {
                h = x1 < x2 ? x1 : x2
                k = x1 === h ? y1 : y2
                const END = Math.abs(b) + k
                for (let x = h; x <= END; x++) {
                    let y = formulaGeneral({
                        x, h, k, a, b, r, m, n
                    })
                    y = Math.round(y)
                    drawPoint(canvas, x, y);
                }
            } else {
                k = y1 < y2 ? y1 : y2
                h = x1 === k ? x1 : x2
                const END = Math.abs(a) + h
                for (let y = k; y <= END; y++) {
                    let x = (Math.pow((r ** 2 - (((y - k) ** m) / b)) * a, 1 / n)) + h
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

    const redrawLine = (canvas, x1, y1, x2, y2, drawingColor = color) => {
        drawLine(canvas, x1, y1, x2, y2, false, drawingColor)
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


            drawLine(canvas, x - parteX, y - parteY, x + parteX, y + parteY, false, drawingColor)


            dispatch(changeCoordinates(activeShape.id, coordinates))
        }


        canvas.moveTo(0, 0)

    }

    return [drawLine, deleteLine, redrawLine, moveLine]
}