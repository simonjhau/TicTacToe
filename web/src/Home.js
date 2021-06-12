import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <Link to="local-game">
        <button>Local Game</button>
      </Link>
      <Link to="online-game">
        <button>Online Game</button>
      </Link>
      <Link to="experiment">
        <button>Experiment</button>
      </Link>
      <Link to="exp2">
        <button>TicTacTroll</button>
      </Link>
    </div>
  );
};

export default Home;
