import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLine } from "./useLine";
import { usePoint } from "./usePoint";
import { useSquare } from "./useSquare";

export const useShape = () => {

    const [canvas, setCanvas] = useState(undefined);

    const { type, coordinates, countPoints, maxPoints } = useSelector(state => state.shape)

    let plano = undefined;

    const [drawLine] = useLine()
    const [drawSquare] = useSquare()
    const [drawPoint] = usePoint()


    canvas && (plano = canvas.getContext("2d"))

    useEffect(() => {
        if (plano) {
            plano.translate(0, canvas.height);
            plano.scale(1, -1);
        }
    }, [canvas, plano])

    useEffect(() => {

        if (countPoints === (maxPoints)) {
            switch (type) {

                case "line":
                    drawLine(
                        plano,
                        coordinates[0].x,
                        coordinates[0].y,
                        coordinates[1].x,
                        coordinates[1].y,
                        true
                    )
                    break;

                case "square":
                    drawSquare(
                        plano,
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

    }, [
        coordinates,
        countPoints,
        maxPoints,
        drawLine,
        drawPoint,
        drawSquare,
        plano,
        type])


    const loadCanvas = (ref) => {
        setCanvas(ref)
    }

    const point = (x, y) => {
        drawPoint(plano, x, y)
    }



    return [point, loadCanvas]
}
