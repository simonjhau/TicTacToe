import React from "react";
import "./Game.css";
import undoIcon from "./static/undoIcon.png";
import BoardExp from "./BoardExp";

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
            <BoardExp
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
