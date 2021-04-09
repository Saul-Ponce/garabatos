export const usePoint = () => {

    const drawPoint = (canvas, x, y, multiplicar = false, drawingColor = null) => {


        if (drawingColor) {
            canvas.fillStyle = drawingColor
        }

        let multiplicador = 1;

        //Se multiplica por 10 solamente para la escala pintar a escala
        multiplicar && (multiplicador = 10)

        canvas && canvas.fillRect(x * multiplicador, y * multiplicador, 3, 3);
    }

    return [drawPoint]
}