import { Link } from "react-router-dom";

const OnlineSetup = () => {
  return (
    <div className="online-setup">
      <Link to="online-setup">
        <button>Create New Game</button>
      </Link>
      <Link to="/">
        <button>Join Game</button>
      </Link>
    </div>
  );
};

export default OnlineSetup;
