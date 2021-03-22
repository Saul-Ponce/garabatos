import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const usePoints = (max = 0) => {
    const [maxPoints, setMaxPoints] = useState(max);
    const [count, setCount] = useState(0);
    const { points } = useSelector(state => state.shape)

    useEffect(() => {
        setMaxPoints(points)
    }, [points])

    const increment = () => {
        setCount(count + 1)
    }

    const reset = () => {
        setCount(0)
    }

    return [maxPoints, count, increment, reset]

}
