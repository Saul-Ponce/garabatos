import { useDispatch } from 'react-redux';
import { clearShapeDrawing } from '../actions/shape';
import { useLine } from './useLine';

export const useSquare = () => {
    const dispatch = useDispatch()

    const [drawLine] = useLine()

    /* const rellenarCuadro = (plano, x1, y1, x2, y2) => {

        console.log("rellenando....");

        plano.fillStyle = "#000";

        const menorX = x1 < x2 ? x1 : x2;
        const mayorY = y1 > y2 ? y1 : y2;

        const dx = Math.abs(x1 - x2);


        //* Para disminuir 1 coordenada del cuadrado

        if (x1 > x2) {
            x1 += 1;
            x2 -= 1;
        } else {
            x1 -= 1;
            x2 += 1;
        }

        if (y1 > y2) {
            y1 -= 1;
            y2 += 1;
        } else {
            y1 += 1;
            y2 -= 1;
        }

        for (let i = menorX; i <= (menorX + dx); i++) {
            drawLine(plano, i, mayorY);
            console.log(i, mayorY);
        }

        plano.fillStyle = "#000";

    } */

    const drawSquare = (plano, x1, y1, x2, y2) => {

        if (!plano) {
            return;
        }


        if (!x1 || !y1 || !x2 || !y2) {
            return;
        }

        plano.moveTo(0, 0)

        // x1,y1 -> x2,y1
        drawLine(plano, x1, y1, x2, y1)

        // x1,y1 -> x1,y2
        drawLine(plano, x1, y1, x1, y2)

        // x1,y2 -> x2,y2
        drawLine(plano, x1, y2, x2, y2)

        // x2,y2 -> x2,y1
        drawLine(plano, x2, y2, x2, y1)


        dispatch(clearShapeDrawing())
    }

    return [
        drawSquare
    ]
}