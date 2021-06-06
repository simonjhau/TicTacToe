import React from "react";
import "./Game.css";

const numRowCol = 3;

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: "square a" + this.props.id,
      fillerText: this.props.value,
    };
  }

  mouseLeave = () => {
    if (!this.props.value) {
      this.setState({ className: "square a" + this.props.id, fillerText: "" });
    } else {
      this.setState({
        className: "square a" + this.props.id,
        fillerText: this.props.value,
      });
    }
    this.setState({ className: "square a" + this.props.id });
  };

  mouseEnter = () => {
    if (!this.props.value) {
      this.setState({
        className: "square a" + this.props.id + " opacityHalf",
        fillerText: this.props.player,
      });
    } else {
      this.setState({
        className: "square a" + this.props.id,
        fillerText: this.props.value,
      });
    }
  };

  clickOpacityChanger = () => {
    if (!this.props.value) {
      this.setState({
        className: "square a" + this.props.id,
        fillerText: this.props.player,
      });
    }
  };

  render() {
    return (
      <button
        className={this.state.className}
        onClick={() => {
          this.props.onClick();
          this.clickOpacityChanger();
        }} //{this.props.onClick}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
      >
        {this.state.fillerText}
      </button>
    );
  }
}

const Board = ({ squares, onClick, player }) => {
  const renderSquare = (i) => {
    return (
      <Square
        key={i}
        id={i}
        player={player}
        value={squares[i]}
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
