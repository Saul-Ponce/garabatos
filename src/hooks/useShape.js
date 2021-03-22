import { useState } from "react";
import { useSelector } from "react-redux";

export const useShape = (canvas) => {


    const { shape, shapePositionStart, shapePositionEnd } = useSelector(state => state.shape)


    const [cuadradoAnterior, setCuadradoAnterior] = useState([])

    let plano = undefined;


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
            case "square":
                dibujarCuadrado(
                    shapePositionStart.x,
                    shapePositionStart.y,
                    shapePositionEnd.x,
                    shapePositionEnd.y
                )
                break;

            default:
                break;
        }
    }

    const dibujarLinea = (x1, y1, x2, y2) => {

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

            for (let i = 0; i < pasos; i++) {
                x += siguienteX;
                y += siguienteY;

                pintarPunto(x, y);
            }

        }

        dx = 0
        dy = 0
    }


    const eliminarCuadroAnterior = (x1, y1, x2, y2) => {
        plano.fillStyle = "#ff0";
        dibujarLinea(x1, y1, x2, y1)

        // x1,y1 -> x1,y2
        dibujarLinea(x1, y1, x1, y2)

        // x1,y2 -> x2,y2
        dibujarLinea(x1, y2, x2, y2)

        // x2,y2 -> x2,y1
        dibujarLinea(x2, y2, x2, y1)

        plano.fillStyle = "#000";
    }


    const dibujarCuadrado = (x1, y1, x2, y2) => {


        if (!plano) {
            return;
        }


        if (!x1 || !y1 || !x2 || !y2) {
            return;
        }

        eliminarCuadroAnterior(...cuadradoAnterior)

        setCuadradoAnterior([
            x1, y1, x2, y2
        ])

        plano.moveTo(0, 0)

        // x1,y1 -> x2,y1
        dibujarLinea(x1, y1, x2, y1)

        // x1,y1 -> x1,y2
        dibujarLinea(x1, y1, x1, y2)

        // x1,y2 -> x2,y2
        dibujarLinea(x1, y2, x2, y2)

        // x2,y2 -> x2,y1
        dibujarLinea(x2, y2, x2, y1)

    }

    const resetDeleteShapes = () => {
        setCuadradoAnterior([-1, -1, -1, -1])
    }


    return { drawShape, resetDeleteShapes }

}
