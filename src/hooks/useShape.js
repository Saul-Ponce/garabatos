import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearShapeDrawing } from "../actions/shape";

export const useShape = (canvas) => {

    const { shape, coordinates, countPoints, maxPoints } = useSelector(state => state.shape)
    const dispatch = useDispatch()

    let plano = undefined;


    useEffect(() => {

        console.log(countPoints, maxPoints);

        if (countPoints === (maxPoints)) {
            drawShape()
        }

    }, [coordinates, countPoints])

    canvas && (plano = canvas.getContext("2d"))


    if (plano) {
        // plano.translate(0, canvas.height);
        plano.scale(1, -1);
    }

    const pintarPunto = (x, y, multiplicar = false) => {

        let multiplicador = 1;

        //Se multiplica por 10 solamente para la escala pintar a escala
        multiplicar && (multiplicador = 10)

        plano && plano.fillRect(x * multiplicador, y * multiplicador, 3, 3);
    }

    let dx = 0, dy = 0

    const drawShape = () => {
        switch (shape) {

            case "line":
                dibujarLinea(
                    coordinates[0].x,
                    coordinates[0].y,
                    coordinates[1].x,
                    coordinates[1].y,
                    true
                )
                break;

            case "square":
                dibujarCuadrado(
                    coordinates[0].x,
                    coordinates[0].y,
                    coordinates[1].x,
                    coordinates[1].y
                )
                break;

            default:
                break;
        }

    }

    const dibujarLinea = (x1, y1, x2, y2, oneTime = false) => {

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
                    pintarPunto(x, y);
                    continue;
                }

                x += siguienteX;
                y += siguienteY;

                pintarPunto(x, y);
            }

        }

        dx = 0
        dy = 0

        oneTime && dispatch(dispatch(clearShapeDrawing()))

    }

    const rellenarCuadro = (x1, y1, x2, y2) => {

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
            dibujarLinea(i, mayorY);
            console.log(i, mayorY);
        }

        plano.fillStyle = "#000";

    }

    const dibujarCuadrado = (x1, y1, x2, y2) => {
        console.log("Dibujando Cuadrado...");
        console.log(x1, y1, x2, y2);
        console.log("Fin Dibujando Cuadrado...");
        if (!plano) {
            return;
        }


        if (!x1 || !y1 || !x2 || !y2) {
            return;
        }

        plano.moveTo(0, 0)

        // x1,y1 -> x2,y1
        dibujarLinea(x1, y1, x2, y1)

        // x1,y1 -> x1,y2
        dibujarLinea(x1, y1, x1, y2)

        // x1,y2 -> x2,y2
        dibujarLinea(x1, y2, x2, y2)

        // x2,y2 -> x2,y1
        dibujarLinea(x2, y2, x2, y1)

        dispatch(dispatch(clearShapeDrawing()))

    }

    return { pintarPunto }

}
