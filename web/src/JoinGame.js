import { useState } from "react";

const JoinGame = ({ apiUrl, setGameData, setGameInfo }) => {
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      fetch(`${apiUrl}/${id}`, { method: "PATCH" })
        .then((res) => res.json())
        .then((data) => {
          setGameData(data.game);
          setGameInfo("");
        })
        .catch((error) => {
          setGameInfo(`Unable to join game ${id}`);
        });
    } else {
      setGameInfo(`Please enter the ID of game you wish to join`);
    }
  };

  return (
    <form className="join-game" onSubmit={handleSubmit}>
      <label>
        Game ID:
        <input
          type="text"
          name="name"
          maxLength="5"
          onInput={(e) => {
            e.target.value = e.target.value.toUpperCase();
            setId(e.target.value);
          }}
        />
      </label>
      <input type="submit" value="Join Game" />
    </form>
  );
};

export default JoinGame;
