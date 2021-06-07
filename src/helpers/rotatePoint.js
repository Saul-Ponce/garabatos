export const rotateX = ({
    x,
    centerX,
    angle,
    y,
    centerY
}) => {
    let radianes = angle * Math.PI / 180


    let cos = Math.cos(radianes),
        sin = Math.sin(radianes)
    return (x - centerX) * cos - (y - centerY) * sin + centerX;
}

export const rotateY = ({
    x,
    centerX,
    angle,
    y,
    centerY
}) => {
    let radianes = angle * Math.PI / 180


    let cos = Math.cos(radianes),
        sin = Math.sin(radianes)
    return (x - centerX) * sin + (y - centerY) * cos + centerY
}