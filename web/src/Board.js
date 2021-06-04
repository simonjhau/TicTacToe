import "./Game.css";
const numRowCol = 3;

const Square = ({ onClick, value }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board = ({ squares, onClick }) => {
  const renderSquare = (i) => {
    return <Square key={i} value={squares[i]} onClick={() => onClick(i)} />;
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
