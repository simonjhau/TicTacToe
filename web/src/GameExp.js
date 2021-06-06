import React from "react";
import "./Game.css";
import undoIcon from "./static/undoIcon.png";

const numRowCol = 3;

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: "square a" + this.props.id,
    };
  }

  mouseLeave = () => {
    this.setState({ className: "square a" + this.props.id });
  };

  mouseEnter = () => {
    let addClass;
    if (this.props.player === "blue") {
      addClass = " squareBlue";
    } else {
      addClass = " squareRed";
    }

    this.setState({
      hover: true,
      className: "square a" + this.props.id + addClass,
    });
  };

  toggleBackgroundColor = () => {
    if (this.props.player === "blue") {
      this.setState({
        className: "square a" + this.props.id + " squareRed",
      });
    } else {
      this.setState({
        className: "square a" + this.props.id + " squareBlue",
      });
    }
  };

  render() {
    return (
      <button
        className={this.state.className}
        onClick={() => {
          this.props.onClick();
          this.toggleBackgroundColor();
        }} //{this.props.onClick}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        id={i}
        player={this.props.player}
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

class GameExp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      stepNumber: 0,
      bIsNext: true,
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
    var randomNum = Math.floor(Math.random() * 10);
    squares[i] = randomNum < 5 ? "X" : "O";

    this.setState({
      history: history.concat([{ squares: squares }]),
      stepNumber: history.length,
      bIsNext: !this.state.bIsNext,
      moveHistory: moveHistory.concat(i),
    });
  }

  jumpTo(step) {
    if (step >= 0) {
      this.setState({
        stepNumber: step,
        bIsNext: step % 2 === 0,
      });
    }
  }

  sort = () => {
    let sortState = !this.state.sortDesc;
    this.setState({ sortDesc: sortState });
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    let player;
    if (winner) {
      status = this.state.bIsNext ? "Red wins!" : "Blue wins!";
    } else {
      if (this.state.stepNumber < 9) {
        status = "Next player: " + (this.state.bIsNext ? "Blue" : "Red");
        player = this.state.bIsNext ? "blue" : "red";
      } else {
        status = "It's a draw";
      }
    }

    let statusStyle;
    if (winner) {
      statusStyle = "statusWinner";
    } else {
      if (player === "blue") {
        statusStyle = "statusBlue";
      } else {
        statusStyle = "statusRed";
      }
    }

    return (
      <div className="game-box">
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              player={player}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div className={statusStyle}>{status}</div>
            <img
              style={{ width: "30px" }}
              src={undoIcon}
              alt="Undo"
              onClick={() => this.jumpTo(this.state.stepNumber - 1)}
            />
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

export default GameExp;
