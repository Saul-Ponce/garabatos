import { useDispatch, useSelector } from "react-redux";
import { changeCoordinates } from "../actions/shape";
import { DELETE_COLOR, EVITAR_DIFUMINADO } from "../const/const";
import { rotateX, rotateY } from "../helpers/rotatePoint";
import { useLine } from "./useLine";

export const useSquare = () => {
  const [drawLine] = useLine();

  const dispatch = useDispatch();

  const { color, movingCoordinates, activeShape, movingId } = useSelector(
    (state) => state.shape
  );

  const fillSquare = (plano, x1, y1, x2, y2, angle, fillColor = color) => {
    // plano.fillStyle = fillColor;

    const menorX = x1 < x2 ? x1 : x2;

    const dx = Math.abs(x1 - x2);

    for (let i = menorX; i <= menorX + dx; i++) {
      if (x1 > x2) {
        x1 -= 1;
        x2 += 1;
      } else {
        x1 += 1;
        x2 -= 1;
      }

      if (y1 > y2) {
        y1 -= 1;
        y2 += 1;
      } else {
        y1 += 1;
        y2 -= 1;
      }

      drawSquare(plano, x1, y1, x2, y2, angle, fillColor);
    }
    // plano.fillStyle = fillColor;
  };

  const drawSquare = (plano, x1, y1, x2, y2, angle, drawingColor = color) => {
    if (!plano) {
      return;
    }

    if (!x1 || !y1 || !x2 || !y2) {
      return;
    }

    let centerX = (x1 + x2) / 2;
    let centerY = (y1 + y2) / 2;
    // drawPoint(plano, centroX, centroY)
    // x1 -= centroX
    // x2 -= centroX
    // y1 -= centroY
    // y2 -= centroY

    let angl = angle;

    let nX1, nY1, nX2, nY2;

    plano.moveTo(0, 0);

    // x1,y1 -> x2,y1
    nX1 = rotateX({ angle: angl, centerX, centerY, x: x1, y: y1 });
    nY1 = rotateY({ angle: angl, centerX, centerY, x: x1, y: y1 });
    nX2 = rotateX({ angle: angl, centerX, centerY, x: x2, y: y1 });
    nY2 = rotateY({ angle: angl, centerX, centerY, x: x2, y: y1 });

    drawLine(plano, nX1, nY1, nX2, nY2, false, drawingColor, 0);

    // x1,y1 -> x1,y2
    nX1 = rotateX({ angle: angl, centerX, centerY, x: x1, y: y1 });
    nY1 = rotateY({ angle: angl, centerX, centerY, x: x1, y: y1 });
    nX2 = rotateX({ angle: angl, centerX, centerY, x: x1, y: y2 });
    nY2 = rotateY({ angle: angl, centerX, centerY, x: x1, y: y2 });
    drawLine(plano, nX1, nY1, nX2, nY2, false, drawingColor, 0);

    // x1,y2 -> x2,y2
    nX1 = rotateX({ angle: angl, centerX, centerY, x: x1, y: y2 });
    nY1 = rotateY({ angle: angl, centerX, centerY, x: x1, y: y2 });
    nX2 = rotateX({ angle: angl, centerX, centerY, x: x2, y: y2 });
    nY2 = rotateY({ angle: angl, centerX, centerY, x: x2, y: y2 });

    drawLine(plano, nX1, nY1, nX2, nY2, false, drawingColor, 0);

    // x2,y2 -> x2,y1
    nX1 = rotateX({ angle: angl, centerX, centerY, x: x2, y: y2 });
    nY1 = rotateY({ angle: angl, centerX, centerY, x: x2, y: y2 });
    nX2 = rotateX({ angle: angl, centerX, centerY, x: x2, y: y1 });
    nY2 = rotateY({ angle: angl, centerX, centerY, x: x2, y: y1 });
    drawLine(plano, nX1, nY1, nX2, nY2, false, drawingColor, 0);
  };

  const deleteSquare = (
    plano,
    x1,
    y1,
    x2,
    y2,
    angle,
    deleteColor = DELETE_COLOR
  ) => {
    for (let i = 0; i < EVITAR_DIFUMINADO; i++) {
      drawSquare(plano, x1, y1, x2, y2, angle, deleteColor);
    }

    fillSquare(plano, x1, y1, x2, y2, angle, deleteColor);

    plano.fillStyle = color;
    plano.moveTo(0, 0);
  };

  const redrawSquare = (plano, shape) => {
    const x1 = shape.coordinates[0].x,
      y1 = shape.coordinates[0].y,
      x2 = shape.coordinates[1].x,
      y2 = shape.coordinates[1].y;

    if (shape.fill) {
      fillSquare(
        plano,
        shape.coordinates[0].x,
        shape.coordinates[0].y,
        shape.coordinates[1].x,
        shape.coordinates[1].y,
        shape.angle,
        shape.fillColor
      );
    }

    drawSquare(
      plano,
      shape.coordinates[0].x,
      shape.coordinates[0].y,
      shape.coordinates[1].x,
      shape.coordinates[1].y,
      shape.angle,
      shape.borderColor
    );

    if (activeShape.id === shape.id) {
      selectSquare(plano, x1, y1, x2, y2, shape.angle);
    }

    plano.moveTo(0, 0);
  };

  const moveSquare = (plano, x1, y1, x2, y2, drawingColor = color, shape) => {
    const { x, y } = movingCoordinates;

    let dx = Math.abs(x1 - x2);
    let dy = Math.abs(y1 - y2);

    let parteX = dx / 2;
    let parteY = dy / 2;

    if (movingId === shape.id) {
      deleteSquare(plano, x1, y1, x2, y2);
      if (activeShape.fill) {
        fillSquare(plano, x1, y1, x2, y2, DELETE_COLOR);
      }
    }

    if (movingId !== shape.id) {
      if (shape.fill) {
        fillSquare(
          plano,
          shape.coordinates[0].x,
          shape.coordinates[0].y,
          shape.coordinates[1].x,
          shape.coordinates[1].y,
          shape.angle,
          shape.fillColor
        );
      }
      drawSquare(
        plano,
        shape.coordinates[0].x,
        shape.coordinates[0].y,
        shape.coordinates[1].x,
        shape.coordinates[1].y,
        shape.angle,
        shape.borderColor
      );
    }

    if (movingId === shape.id) {
      const coordinates = [
        { x: x - parteX, y: y - parteY },
        { x: x + parteX, y: y + parteY },
      ];

      if (shape.fill) {
        fillSquare(
          plano,
          coordinates[0].x,
          coordinates[0].y,
          coordinates[1].x,
          coordinates[1].y,
          shape.angle,
          shape.fillColor
        );
      }

      drawSquare(
        plano,
        x - parteX,
        y - parteY,
        x + parteX,
        y + parteY,
        shape.angle,
        shape.borderColor
      );

      if (activeShape.id === shape.id) {
        selectSquare(
          plano,
          coordinates[0].x,
          coordinates[0].y,
          coordinates[1].x,
          coordinates[1].y,
          shape.angle
        );
      }

      dispatch(changeCoordinates(activeShape.id, coordinates));
    }

    plano.moveTo(0, 0);
  };

  const changeSizeSquare = (
    plano,
    x1,
    y1,
    x2,
    y2,
    drawingColor = color,
    shape
  ) => {
    const { x, y } = movingCoordinates;

    if (movingId !== shape.id) {
      drawSquare(
        plano,
        shape.coordinates[0].x,
        shape.coordinates[0].y,
        shape.coordinates[1].x,
        shape.coordinates[1].y,
        shape.angle,
        shape.borderColor
      );
      if (shape.fill) {
        fillSquare(
          plano,
          shape.coordinates[0].x,
          shape.coordinates[0].y,
          shape.coordinates[1].x,
          shape.coordinates[1].y,
          shape.angle,
          shape.fillColor
        );
      }
    }

    if (movingId === shape.id) {
      const coordinates = [
        { x: x1, y: y1 },
        { x, y },
      ];

      drawSquare(plano, x1, y1, x, y, shape.angle, shape.borderColor);

      if (shape.fill) {
        fillSquare(
          plano,
          coordinates[0].x,
          coordinates[0].y,
          coordinates[1].x,
          coordinates[1].y,
          shape.angle,
          shape.fillColor
        );
      }

      if (activeShape.id === shape.id) {
        selectSquare(
          plano,
          coordinates[0].x,
          coordinates[0].y,
          coordinates[1].x,
          coordinates[1].y,
          shape.angle
        );
      }

      dispatch(changeCoordinates(activeShape.id, coordinates));
    }

    plano.moveTo(0, 0);
  };

  const selectSquare = (plano, x1, y1, x2, y2, angle) => {
    if (x1 > x2) {
      x1 += 3;
      x2 -= 3;
    } else {
      x1 -= 3;
      x2 += 3;
    }
    if (y1 > y2) {
      y1 += 3;
      y2 -= 3;
    } else {
      y1 -= 3;
      y2 += 3;
    }
    drawSquare(plano, x1, y1, x2, y2, angle, "yellow");
    // plano.moveTo(0, 0)
  };

  return [
    drawSquare,
    deleteSquare,
    redrawSquare,
    fillSquare,
    moveSquare,
    changeSizeSquare,
  ];
};
