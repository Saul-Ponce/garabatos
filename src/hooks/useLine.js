import { useDispatch, useSelector } from 'react-redux';
import { changeCoordinates } from '../actions/shape';
import { DELETE_COLOR, EVITAR_DIFUMINADO } from '../const/const';
import { usePoint } from './usePoint';

export const useLine = () => {

    let dx = 0;
    let dy = 0;


    const { color, activeShape, movingCoordinates, movingId } = useSelector(state => state.shape)

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

    }

    const deleteLine = (plano, x1, y1, x2, y2, deleteColor = DELETE_COLOR) => {

        for (let i = 0; i < EVITAR_DIFUMINADO; i++) {
            drawLine(plano, x1, y1, x2, y2, false, deleteColor)
        }

        plano.fillStyle = deleteColor
        plano.moveTo(0, 0)

    }

    const redrawLine = (plano, x1, y1, x2, y2, drawingColor = color) => {
        drawLine(plano, x1, y1, x2, y2, false, drawingColor)
        plano.moveTo(0, 0)

    }

    const moveLine = (plano, x1, y1, x2, y2, drawingColor = color, shape) => {

        console.log("dentro de movesquare");

        const { x, y } = movingCoordinates

        let dx = Math.abs(x1 - x2)
        let dy = Math.abs(y1 - y2)


        let parteX = dx / 2
        let parteY = dy / 2


        if ((y1 > y2 && x1 < x2) || (y2 > y1 && x2 < x1)) {
            parteY *= -1
        }
        console.log(parteY);


        if (movingId === shape.id) {
            deleteLine(plano, x1, y1, x2, y2)

        }


        if (movingId !== shape.id) {
            drawLine(
                plano,
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


            drawLine(plano, x - parteX, y - parteY, x + parteX, y + parteY, false, drawingColor)


            dispatch(changeCoordinates(activeShape.id, coordinates))
        }


        plano.moveTo(0, 0)

    }

    return [drawLine, deleteLine, redrawLine, moveLine]
}