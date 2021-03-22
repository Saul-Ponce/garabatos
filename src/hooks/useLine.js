import { useDispatch } from 'react-redux';
import { clearShapeDrawing } from '../actions/shape';
import { usePoint } from './usePoint';

export const useLine = () => {

    let dx = 0;
    let dy = 0;

    const dispatch = useDispatch()

    const [drawPoint] = usePoint()

    const drawLine = (plano, x1, y1, x2, y2, oneTime = false) => {

        if (plano) {
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

    return [drawLine]
}