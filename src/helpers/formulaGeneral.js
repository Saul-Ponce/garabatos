export const raiz = (base, raiz) => {
    return Math.pow(base, raiz)
}

export const formulaGeneral = ({
    x,
    h,
    k,
    a,
    b,
    m,
    n,
    r
}) => {
    return (raiz((raiz(r, 2) - raiz(x - h, n) / a) * b, 1 / m) + k)
}

export const formulaGeneralRadio = ({
    x,
    y,
    h,
    k,
    a,
    b,
    m,
    n,
    r
}) => {
    return raiz((raiz(x - h, m) / a + raiz(y - k, n) / b), 1 / 2)
}

//(Math.pow((r ** 2 - (((x) ** n) / a)) * b, 1 / m))
//(Math.pow((r ** 2 - (((x - h) ** n) / a)) * b, 1 / m)) + k