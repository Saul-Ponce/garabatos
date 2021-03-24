export const usePoint = () => {

    const drawPoint = (plano, x, y, multiplicar = false, drawingColor = null) => {


        if (drawingColor) {
            plano.fillStyle = drawingColor
        }

        let multiplicador = 1;

        //Se multiplica por 10 solamente para la escala pintar a escala
        multiplicar && (multiplicador = 10)

        plano && plano.fillRect(x * multiplicador, y * multiplicador, 3, 3);
    }

    return [drawPoint]
}