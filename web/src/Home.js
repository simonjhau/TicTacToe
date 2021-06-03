import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <Link to="game">
        <button>Local Game</button>
      </Link>
      <Link to="online-setup">
        <button>Online Game</button>
      </Link>
      <Link to="experiment">
        <button>Experiment</button>
      </Link>
    </div>
  );
};

export default Home;
