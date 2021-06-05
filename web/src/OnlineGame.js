import { useState, useEffect, useRef } from "react";
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
  const [gameState, setGameState] = useState(gameStatusType.NOT_STARTED);
  const [gameData, setGameData] = useState({
    id: "",
    ip1: "",
    ip2: "",
    history: [{ squares: Array(9).fill(null) }],
    moveNum: 0,
    timeLastUpdate: null,
  });
  const [playerTurn, setPlayerTurn] = useState(false);
  const [winner, setWinner] = useState(null);
  const playerSymbol = useRef("");

  // "Create New Game" button pressed
  const handleCreateNewGame = () => {
    // Send API request to create new game
    fetch(apiUrl, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        setGameState(gameStatusType.WAITING);
        setGameData(data.game);
        playerSymbol.current = "X";
        setPlayerTurn(true);
      })
      .catch((error) => console.log(error));
  };

  // "Join Game" button pressed
  const handleJoinGame = () => {
    setGameState(gameStatusType.JOINING);
    playerSymbol.current = "O";
    setPlayerTurn(false);
  };

  // Called on every render
  useEffect(() => {
    // Call API once per second
    const interval = setInterval(() => {
      if (!winner && gameData.id) {
        fetch(`${apiUrl}/${gameData.id}`, { method: "GET" })
          .then((res) => res.json())
          .then((data) => {
            setGameData(data);
          })
          .catch((error) => console.log(error));
      }
    }, 500);

    // Check if game has started
    if (!gameData.id) {
      setGameState(gameStatusType.NOT_STARTED);
    } else if (!gameData.ip2) {
      setGameState(gameStatusType.WAITING);
    } else {
      setGameState(gameStatusType.STARTED);
    }

    // Check if it is currently this player's turn
    if (
      (playerSymbol.current === "X" && gameData.moveNum % 2 === 0) ||
      (playerSymbol.current === "O" && gameData.moveNum % 2 === 1)
    ) {
      setPlayerTurn(true);
    } else {
      setPlayerTurn(false);
    }

    // Check if game has finished
    const current = gameData.history[gameData.moveNum];
    const squares = current.squares.slice();
    setWinner(calculateWinner(squares));

    return () => clearInterval(interval);
  }, [gameData, playerSymbol, winner]);

  // Called when square in board clicked
  const handleClick = (i) => {
    const gameDataCopy = gameData;
    const current = gameDataCopy.history[gameDataCopy.moveNum];
    const squares = current.squares.slice();

    // Should board be clickable?
    if (calculateWinner(squares) || squares[i] || !playerTurn) {
      return;
    }

    // Set the square
    squares[i] = playerSymbol.current;

    // Send updated board to API
    const dataToSend = {
      squares: squares,
      moveNum: gameData.moveNum + 1,
    };

    fetch(`${apiUrl}/${gameData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        setGameData(data.game);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="online-game">
      <div className="online-game-setup">
        {gameState === gameStatusType.NOT_STARTED && (
          <div>
            <button onClick={handleCreateNewGame}>Create New Game</button>
            <button onClick={handleJoinGame}>Join Game</button>
          </div>
        )}
        {gameState === gameStatusType.JOINING && (
          <JoinGame
            apiUrl={apiUrl}
            setGameData={setGameData}
            setGameState={setGameState}
          />
        )}
        {gameState === gameStatusType.WAITING && (
          <div>
            <h1>Game Code: {gameData.id}</h1>
            <p>Waiting for opponent...</p>
          </div>
        )}
      </div>
      <div>
        {gameState === gameStatusType.STARTED && (
          <div>
            <h1>Game Code: {gameData.id}</h1>
            <br></br>
            <Board
              squares={gameData.history[gameData.history.length - 1].squares}
              onClick={(i) => handleClick(i)}
            />
            {winner && (
              <div>
                <br></br>
                <h2>{winner} has won!</h2>
              </div>
            )}
            {!winner && !playerTurn && <p>Waiting for other player...</p>}
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
