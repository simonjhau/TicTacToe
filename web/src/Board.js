import { useState } from "react";
import "./Game.css";

const numRowCol = 3;

const Square = ({ id, player, square, onClick }) => {
  const [properties, setProperties] = useState({
    hover: false,
    fillerText: square,
  });

  const mouserOver = () => {
    if (!square) {
      setProperties({
        hover: true,
        fillerText: player,
      });
    } else {
      setProperties({
        fillerText: square,
      });
    }
  };

  const mouseLeave = () => {
    if (!square) {
      setProperties({ fillerText: "" });
    } else {
      setProperties({
        hover: false,
        fillerText: square,
      });
    }
  };

  const clickOpacityChanger = () => {
    if (!square) {
      setProperties({
        fillerText: player,
      });
    }
  };

  return (
    <button
      className={"square a" + id + (properties.hover ? " hover" : "")}
      onClick={() => {
        onClick();
        clickOpacityChanger();
      }}
      onMouseLeave={mouseLeave}
      onMouseOver={mouserOver}
    >
      {properties.fillerText}
    </button>
  );
};

const Board = ({ squares, onClick, player }) => {
  const renderSquare = (i) => {
    return (
      <Square
        key={i}
        id={i}
        player={player}
        square={squares[i]}
        onClick={() => onClick(i)}
      />
    );
  };

  const renderRow = (rowNum) => {
    let row = [];
    for (let y = 0; y < numRowCol; y++) {
      row.push(renderSquare(rowNum * 3 + y));
    }
    return (
      <div className="board-row" key={"row" + rowNum}>
        {row}
      </div>
    );
  };

  const renderGrid = () => {
    let grid = [];
    for (let x = 0; x < numRowCol; x++) {
      grid.push(renderRow(x));
    }
    return <div>{grid}</div>;
  };

  return <div>{renderGrid()}</div>;
};

export default Board;
