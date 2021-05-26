import Navbar from "./Navbar";
import Game from "./Game";
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
              <Game />
            </Route>
            {
              /* <Route path="/create">
              <Create />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>*/
              <Route path="*">
                <NotFound></NotFound>
              </Route>
            }
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
