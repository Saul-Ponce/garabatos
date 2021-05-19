export const raiz = (base, raiz) => {
    return Math.pow(base, raiz)
}

export const formulaGeneral = ({
    x,
    a,
    b,
    m,
    n,
    r
}) => {
    return raiz((raiz(r, 2) - raiz(x, n) / a) * b, 1 / m)
}