import { useDispatch, useSelector } from 'react-redux';
import { clearAction, clearShapeDrawing, deleteShape, redraw } from '../actions/shape';
import { DELETE_COLOR, EVITAR_DIFUMINADO } from '../const/const';
import { usePoint } from './usePoint';

export const useLine = () => {

    let dx = 0;
    let dy = 0;


    const { color } = useSelector(state => state.shape)

    const dispatch = useDispatch()

    const [drawPoint] = usePoint()

    const drawLine = (plano, x1, y1, x2, y2, oneTime = false, drawingColor = color) => {

        if (plano) {
            plano.fillStyle = drawingColor
            //Se multiplica por 10 solamente para la escala pintar a escala
            // x1 *= 10;
            // x2 *= 10;
            // y1 *= 10;
            // y2 *= 10;

            dx = (x2 - x1);
            dy = (y2 - y1);

            let pasos = 0;

            if (Math.abs(dx) > Math.abs(dy)) {
                pasos = Math.abs(dx);
            } else {
                pasos = Math.abs(dy);
            }

            const siguienteX = dx / pasos;
            const siguienteY = dy / pasos;

            let x = x1;
            let y = y1;

            for (let i = 0; i <= pasos; i++) {


                //* Para que pinte el primer pixel
                if (i === 0) {
                    drawPoint(plano, x, y);
                    continue;
                }

                x += siguienteX;
                y += siguienteY;

                drawPoint(plano, x, y);
            }

        }

        dx = 0
        dy = 0


        oneTime && dispatch(clearShapeDrawing())
    }

    const deleteLine = (plano, x1, y1, x2, y2, id) => {

        for (let i = 0; i < EVITAR_DIFUMINADO; i++) {
            drawLine(plano, x1, y1, x2, y2, false, DELETE_COLOR)
        }

        plano.fillStyle = color
        plano.moveTo(0, 0)
        dispatch(deleteShape(id))
        dispatch(redraw())
        // dispatch(clearAction())
    }

    const redrawLine = (plano, x1, y1, x2, y2, drawingColor = color) => {
        drawLine(plano, x1, y1, x2, y2, false, drawingColor)
        plano.moveTo(0, 0)
        dispatch(clearAction())
    }

    return [drawLine, deleteLine, redrawLine]
}