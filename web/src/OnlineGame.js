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
  // Hooks
  const [gameStatus, setGameState] = useState(gameStatusType.NOT_STARTED);
  const [gameData, setGameData] = useState({
    id: "",
    ip1: "",
    ip2: "",
    history: [{ squares: Array(9).fill(null) }],
    moveNum: 0,
    xIsNext: true,
  });
  const [playerSymbol, setPlayerSymbol] = useState("");

  // Check if gameData has changed
  // const gameDataDifferent = (data) => {
  //   if (
  //     data.id !== gameData.id ||
  //     data.ip1 !== gameData.ip1 ||
  //     data.ip2 !== gameData.ip2 ||
  //     !arrayEquals(data.history, gameData.history) ||
  //     data.moveNum !== gameData.moveNum ||
  //     data.xIsNext !== gameData.xIsNext
  //   ) {
  //     return true;
  //   }
  //   return false;
  // };

  // "Create New Game" button pressed
  const handleCreateNewGame = () => {
    console.log("new game clicked");
    fetch(apiUrl, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        setGameData(data.game);
        setPlayerSymbol("X");
        setGameState(gameStatusType.WAITING);
      })
      .catch((error) => console.log(error));
  };

  // "Join Game" button pressed
  const handleJoinGame = () => {
    setPlayerSymbol("O");
    setGameState(gameStatusType.JOINING);
  };

  // Called on every render
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("use effect");
      console.log(gameData);

      if (gameData.id) {
        fetch(`${apiUrl}/${gameData.id}`, { method: "GET" })
          .then((res) => res.json())
          .then((data) => {
            // if (gameDataDifferent(data)) {
            setGameData(data);
            // }
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

  // Called when square in board clicked
  const handleClick = (i) => {
    console.log(`button ${i} clicked`);

    const gameDataCopy = gameData;
    const current = gameDataCopy.history[gameDataCopy.moveNum];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = playerSymbol;

    const dataToSend = {
      squares: squares,
      moveNum: gameData.moveNum + 1,
    };

    console.log(dataToSend);

    fetch(`${apiUrl}/${gameData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGameData(data.game);
      })
      .catch((error) => console.log(error));
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

function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}
