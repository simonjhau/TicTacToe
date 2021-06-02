import React from "react";
import "./Game.css";

const numRowCol = 3;

const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderRow = (rowNum) => {
    let row = [];
    for (let y = 0; y < numRowCol; y++) {
      row.push(this.renderSquare(rowNum * 3 + y));
    }
    return (
      <div className="board-row" key={"row" + rowNum}>
        {row}
      </div>
    );
  };

  renderGrid = () => {
    let grid = [];
    for (let x = 0; x < numRowCol; x++) {
      grid.push(this.renderRow(x));
    }
    return <div>{grid}</div>;
  };

  render() {
    return <div>{this.renderGrid()}</div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      stepNumber: 0,
      xIsNext: true,
      moveHistory: [null],
      sortDesc: false,
      //gameFinished: false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const moveHistory = this.state.moveHistory.slice(
      0,
      this.state.stepNumber + 1
    );
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares: squares }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      moveHistory: moveHistory.concat(i),
    });

    console.log(this.state.history);
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  sort = () => {
    let sortState = !this.state.sortDesc;
    this.setState({ sortDesc: sortState });
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((hist, moveNum) => {
      const playerAtMoveNum = moveNum % 2 === 1 ? "X" : "O";
      const playedMove = this.state.moveHistory[moveNum];
      const playedCol = Math.floor(playedMove / 3 + 1);
      const playedRow = (playedMove % 3) + 1;
      const desc = moveNum
        ? "Go to move #" +
          moveNum +
          " (" +
          playerAtMoveNum +
          ": (" +
          playedCol +
          "," +
          playedRow +
          "))"
        : "Go to game start";
      if (moveNum > 0 && moveNum === this.state.stepNumber) {
        return (
          <li key={moveNum} value={moveNum + 1}>
            <button onClick={() => this.jumpTo(moveNum)}>
              <strong>{desc}</strong>
            </button>
          </li>
        );
      } else {
        return (
          <li key={moveNum} value={moveNum + 1}>
            <button onClick={() => this.jumpTo(moveNum)}>{desc}</button>
          </li>
        );
      }
    });

    let sortState = "Sort Decending";
    if (this.state.sortDesc) {
      moves.reverse();
      sortState = "Sort Ascending";
    }

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game-box">
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <button onClick={() => this.sort()}>{sortState}</button>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
