import React from 'react'

export const Canvas = () => {

    const handleMouseActions = (e) => {

        //* Posiciones dentro del canvas
        const { layerX: x, layerY: y } = e.nativeEvent
        console.log(x, y);
    }

    //TODO: hacer que dibuje un cuadrado

    return (
        <canvas
            onMouseDownCapture={handleMouseActions}    //* Captura la posicion inicial
            onMouseUpCapture={handleMouseActions}      //* Captura la posicion final
            onMouseMoveCapture={handleMouseActions}    //* Captura el movimiento
            className="canvas"
            style={{
                width: "100%",
                height: "100%"
            }}>

        </canvas>
    )
}
