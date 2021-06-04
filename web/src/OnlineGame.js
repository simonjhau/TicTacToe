import { useState, useEffect } from "react";
import JoinGame from "./JoinGame";
import Board from "./Board";

const apiUrl = "http://192.168.0.11:5000/api/game";

const gameStatusType = {
  NOT_STARTED: "not-started",
  JOINING: "joining",
  WAITING: "waiting",
  STARTED: "playing",
  FINISHED: "finished",
};

const OnlineGame = () => {
  const [gameStatus, setGameState] = useState(gameStatusType.NOT_STARTED);
  // const [gameId, setGameId] = useState("");
  const [gameData, setGameData] = useState({
    id: "",
    ip1: "",
    ip2: "",
    history: [{ squares: Array(9).fill(null) }],
    moveNum: 0,
    xIsNext: true,
  });

  const handleCreateNewGame = () => {
    console.log("new game clicked");
    fetch(apiUrl, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        console.log("new game data");
        console.log(data);
        setGameData(data);
        setGameState(gameStatusType.WAITING);
      })
      .catch((error) => console.log(error));
  };

  const handleJoinGame = () => {
    setGameState(gameStatusType.JOINING);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("use effect");
      console.log(gameData);

      if (gameData.id) {
        fetch(`${apiUrl}/${gameData.id}`, { method: "GET" })
          .then((res) => res.json())
          .then((data) => {
            console.log("in da loop");
            console.log(data);
            setGameData(data);
          })
          .catch((error) => console.log(error));
      }
    }, 1000);

    if (!gameData.id) {
      setGameState(gameStatusType.NOT_STARTED);
    } else if (!gameData.ip2) {
      setGameState(gameStatusType.WAITING);
    } else {
      setGameState(gameStatusType.STARTED);
    }

    return () => clearInterval(interval);
  }, [gameData]);

  // useEffect(() => {
  //   console.log(gameData);

  //   window.setInterval(() => {
  //     if (gameData.id) {
  //       console.log(`${apiUrl}/${gameData.id}`);

  //       fetch(`apiUrl/${gameData.id}`, { method: "GET" })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log(data);
  //           setGameData(data);
  //         })
  //         .catch((error) => console.log(error));
  //     }
  //   }, 1000);

  //   if (!gameData.id) {
  //     setGameState(gameStatusType.NOT_STARTED);
  //   } else if (!gameData.ip2) {
  //     setGameState(gameStatusType.WAITING);
  //   }
  // }, [gameData]);

  const handleClick = (i) => {
    console.log(`button ${i} clicked`);

    const gameDataCopy = gameData;
    const current = gameDataCopy.history[gameDataCopy.moveNum];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = gameData.xIsNext ? "X" : "O";

    // this.setState({
    //   history: history.concat([{ squares: squares }]),
    //   stepNumber: history.length,
    //   xIsNext: !this.state.xIsNext,
    //   moveHistory: moveHistory.concat(i),
    // });

    // console.log(this.state.history);
  };

  return (
    <div className="online-game">
      <div className="online-game-setup">
        {gameStatus === gameStatusType.NOT_STARTED && (
          <div>
            <button onClick={handleCreateNewGame}>Create New Game</button>
            <button onClick={handleJoinGame}>Join Game</button>
          </div>
        )}
        {gameStatus === gameStatusType.JOINING && (
          <JoinGame
            apiUrl={apiUrl}
            setGameData={setGameData}
            setGameState={setGameState}
          />
        )}
        {gameStatus === gameStatusType.WAITING && (
          <div>
            <h1>Game Code: {gameData.id}</h1>
            <p>Waiting for opponent...</p>
          </div>
        )}
      </div>
      <div>
        {gameStatus === gameStatusType.STARTED && (
          <div>
            <h1>{gameData.id}</h1>
            <Board
              squares={gameData.history[gameData.history.length - 1].squares}
              onClick={(i) => handleClick(i)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OnlineGame;

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
