import { useState } from "react";
import "./Game.css";

const numRowCol = 3;

const Square = ({ id, player, square, onClick }) => {
  // Initialise the hooks
  const [lighten, setLighten] = useState(false);

  // Handler for when mouse hovers the square
  const mouserOver = () => {
    if (!square) {
      setLighten(true);
    }
  };

  // Handler for when mouse leaves the square
  const mouseLeave = () => {
    setLighten(false);
  };

  // Changes the opacity of the markers once square is clicked
  const clickTextLightener = () => {
    if (!square) {
      setLighten(false);
    }
  };

  return (
    <button
      className={"square a" + id + (lighten ? " lighten" : "")}
      onClick={() => {
        onClick();
        clickTextLightener();
      }}
      onMouseOver={mouserOver}
      onMouseLeave={mouseLeave}
    >
      {lighten && !square ? player : square}
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
