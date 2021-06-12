import React from "react";
import "./Exp2.css";
import undoIcon from "./static/undoIcon.png";
import trollFace from "./static/trollFace.png";

const numRowCol = 5;
const hiddensquares = [0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24];

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false, backgroundColor: "#fff" };
  }

  mouseLeave = () => {
    this.setState({ hover: false });
    this.setState({ backgroundColor: "#fff" });
  };

  mouseEnter = () => {
    let colour;
    if (!hiddensquares.includes(this.props.id)) {
      if (this.props.player === "blue") {
        colour = "#a9f2f5";
      } else {
        colour = "#f5ada9";
      }

      this.setState({ hover: true, backgroundColor: colour });
    }
  };

  toggleBackgroundColor = () => {
    if (!hiddensquares.includes(this.props.id)) {
      if (this.props.player === "blue") {
        this.setState({ backgroundColor: "#f5ada9" });
      } else {
        this.setState({ backgroundColor: "#a9f2f5" });
      }
    }
  };

  render() {
    return (
      <button
        style={{ backgroundColor: this.state.backgroundColor }}
        className={"square a" + this.props.id}
        onClick={() => {
          if (canGo(this.props.id, this.props.stepNumber, this.props.squares)) {
            this.props.onClick();
            this.toggleBackgroundColor();
          }
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
        stepNumber={this.props.stepNumber}
        squares={this.props.squares}
      />
    );
  }

  renderRow = (rowNum) => {
    let row = [];
    for (let y = 0; y < numRowCol; y++) {
      row.push(this.renderSquare(rowNum * numRowCol + y));
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

class Exp2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(25).fill(null) }],
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
    squares[i] = this.state.bIsNext ? "X" : "O";

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
    const isTrollWin = isTrollWinner(current.squares);

    let status;
    let player;
    let turncounter;
    let turnmsg;
    let myimg;
    let mywidth;
    let myalt;

    if (winner) {
      status = this.state.bIsNext ? "O wins!" : "X wins!";
    } else {
      if (this.state.stepNumber < 9) {
        status = "Turn player: " + (this.state.bIsNext ? "X" : "O");
        player = this.state.bIsNext ? "blue" : "red";
      } else {
        status = "It's a draw";
      }
    }
    if (isTrollWin) {
      myimg = trollFace;
      mywidth = "300px";
      myalt = "Problem?";
    } else {
      myimg = undoIcon;
      mywidth = "30px";
      myalt = "Undo";
    }

    turncounter = this.state.stepNumber + 1;
    turnmsg = "Turn " + turncounter;

    return (
      <div className="game-box">
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              player={player}
              onClick={(i) => this.handleClick(i)}
              stepNumber={this.state.stepNumber}
            />
          </div>
          <div className="game-info">
            <div>{turnmsg}</div>
            <div style={{ color: player }}>{status}</div>
            <img
              style={{ width: mywidth }}
              src={myimg}
              alt={myalt}
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
    [6, 7, 8],
    [11, 12, 13],
    [16, 17, 18],
    [6, 11, 16],
    [7, 12, 17],
    [8, 13, 18],
    [6, 12, 18],
    [8, 12, 16],

    [0, 6, 12],
    [4, 8, 12],
    [20, 16, 12],
    [24, 18, 12],

    [1, 6, 11],
    [1, 7, 13],
    [2, 7, 12],
    [3, 8, 13],
    [3, 7, 11],

    [21, 16, 11],
    [21, 17, 13],
    [22, 17, 12],
    [23, 18, 13],
    [23, 17, 11],

    [5, 6, 7],
    [5, 11, 17],
    [10, 11, 12],
    [15, 16, 17],
    [15, 11, 7],

    [9, 8, 7],
    [9, 13, 17],
    [14, 13, 12],
    [19, 18, 17],
    [19, 13, 7],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isTrollWinner(squares) {
  const lines = [
    [0, 6, 12],
    [4, 8, 12],
    [20, 16, 12],
    [24, 18, 12],

    [1, 6, 11],
    [1, 7, 13],
    [2, 7, 12],
    [3, 8, 13],
    [3, 7, 11],

    [21, 16, 11],
    [21, 17, 13],
    [22, 17, 12],
    [23, 18, 13],
    [23, 17, 11],

    [5, 6, 7],
    [5, 11, 17],
    [10, 11, 12],
    [15, 16, 17],
    [15, 11, 7],

    [9, 8, 7],
    [9, 13, 17],
    [14, 13, 12],
    [19, 18, 17],
    [19, 13, 7],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return true;
    }
  }
  return false;
}

function canGo(square, turn, squares) {
  let turnplayer;

  if (turn % 2 === 1) {
    turnplayer = "O";
  } else {
    turnplayer = "X";
  }

  if (!hiddensquares.includes(square)) {
    return true;
  } else {
    if (hiddensquares.includes(square) && turn > 7) {
      switch (square) {
        case 0:
          if (squares[6] === squares[12] && squares[12] === turnplayer) {
            return true;
          } else {
            return false;
          }
        case 4:
          if (squares[8] === squares[12] && squares[12] === turnplayer) {
            return true;
          } else {
            return false;
          }
        case 20:
          if (squares[16] === squares[12] && squares[12] === turnplayer) {
            return true;
          } else {
            return false;
          }
        case 24:
          if (squares[18] === squares[12] && squares[12] === turnplayer) {
            return true;
          } else {
            return false;
          }
        case 2:
          if (squares[7] === squares[12] && squares[12] === turnplayer) {
            return true;
          } else {
            return false;
          }
        case 22:
          if (squares[17] === squares[12] && squares[12] === turnplayer) {
            return true;
          } else {
            return false;
          }
        case 10:
          if (squares[11] === squares[12] && squares[12] === turnplayer) {
            return true;
          } else {
            return false;
          }
        case 14:
          if (squares[13] === squares[12] && squares[12] === turnplayer) {
            return true;
          } else {
            return false;
          }

        case 1:
          if (
            (squares[6] === squares[11] && squares[11] === turnplayer) ||
            (squares[7] === squares[13] && squares[13] === turnplayer)
          ) {
            return true;
          } else {
            return false;
          }
        case 3:
          if (
            (squares[8] === squares[13] && squares[13] === turnplayer) ||
            (squares[7] === squares[11] && squares[11] === turnplayer)
          ) {
            return true;
          } else {
            return false;
          }
        case 21:
          if (
            (squares[16] === squares[11] && squares[11] === turnplayer) ||
            (squares[17] === squares[13] && squares[13] === turnplayer)
          ) {
            return true;
          } else {
            return false;
          }
        case 23:
          if (
            (squares[18] === squares[13] && squares[13] === turnplayer) ||
            (squares[17] === squares[11] && squares[11] === turnplayer)
          ) {
            return true;
          } else {
            return false;
          }

        case 5:
          if (
            (squares[6] === squares[7] && squares[7] === turnplayer) ||
            (squares[11] === squares[17] && squares[11] === turnplayer)
          ) {
            return true;
          } else {
            return false;
          }
        case 15:
          if (
            (squares[16] === squares[17] && squares[17] === turnplayer) ||
            (squares[11] === squares[7] && squares[11] === turnplayer)
          ) {
            return true;
          } else {
            return false;
          }
        case 9:
          if (
            (squares[8] === squares[7] && squares[7] === turnplayer) ||
            (squares[13] === squares[17] && squares[17] === turnplayer)
          ) {
            return true;
          } else {
            return false;
          }
        case 19:
          if (
            (squares[18] === squares[17] && squares[17] === turnplayer) ||
            (squares[7] === squares[13] && squares[13] === turnplayer)
          ) {
            return true;
          } else {
            return false;
          }
        default:
          return false;
      }
    } else {
      return false;
    }
  }
}

export default Exp2;
