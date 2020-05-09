import React from "react";

import reducer from "./reducer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Container from "./component";
import Quiz from "./component/Quiz";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const store = createStore(reducer);

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Container />
        </Route>
        <Route path="/course/:id" exact>
          <Quiz />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
