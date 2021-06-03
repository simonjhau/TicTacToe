import Navbar from "./Navbar";
import Home from "./Home";
import OnlineSetup from "./OnlineSetup";
import Game from "./Game";
import GameExp from "./GameExp";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/game">
              <Game />
            </Route>
            <Route path="/online-setup">
              <OnlineSetup />
            </Route>
            <Route path="/experiment">
              <GameExp />
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
