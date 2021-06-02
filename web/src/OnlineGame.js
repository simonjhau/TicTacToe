import { useState, useEffect } from "react";
import JoinGame from "./JoinGame";

const apiUrl = "http://192.168.0.11:5000/api/game";

const gameStatusType = {
  NOT_STARTED: "not-started",
  JOINING: "joining",
  STARTED: "started",
};

const OnlineGame = () => {
  const [gameStatus, setGameState] = useState(gameStatusType.NOT_STARTED);
  const [gameId, setGameId] = useState("");

  let handleCreateNewGame = () => {
    fetch(apiUrl, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGameId(data.id);
        setGameState(gameStatusType.STARTED);
      })
      .catch((error) => console.log(error));
  };

  let handleJoinGame = () => {
    setGameState(gameStatusType.JOINING);
  };

  useEffect(() => {
    console.log(gameId);
  });

  return (
    <div className="online-game">
      {gameStatus === gameStatusType.NOT_STARTED && (
        <div>
          <button onClick={handleCreateNewGame}>Create New Game</button>
          <button onClick={handleJoinGame}>Join Game</button>
        </div>
      )}
      {gameStatus === gameStatusType.JOINING && (
        <JoinGame
          apiUrl={apiUrl}
          setGameId={setGameId}
          setGameState={setGameState}
        />
      )}
      {gameStatus === gameStatusType.STARTED && <h1> id={gameId} </h1>}
    </div>
  );
};

export default OnlineGame;
