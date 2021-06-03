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
    </div>
  );
};

export default Home;
