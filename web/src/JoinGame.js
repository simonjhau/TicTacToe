import { useState } from "react";

const JoinGame = ({ apiUrl, setGameId, setGameState }) => {
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${apiUrl}/${id}`, { method: "PUT" })
      .then((res) => res.json())
      .then((data) => {
        setGameId(id);
        setGameState("started");
      })
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
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
