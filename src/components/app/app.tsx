import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { FibonacciPage } from "../fibonacci-page/fibonacci-page";
import { ListPage } from "../list-page/list-page";
import { MainPage } from "../main-page/main-page";
import { QueuePage } from "../queue-page/queue-page";
import { StringComponent } from "../string/string";
import { SortingPage } from "../sorting-page/sorting-page";
import { StackPage } from "../stack-page/stack-page";

import app from "../app/app.module.css";

function App() {
  return (
    <div className={app.app}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/recursion" exact>
            <StringComponent />
          </Route>
          <Route path="/fibonacci" exact>
            <FibonacciPage />
          </Route>
          <Route path="/sorting" exact>
            <SortingPage />
          </Route>
          <Route path="/stack" exact>
            <StackPage />
          </Route>
          <Route path="/queue" exact>
            <QueuePage />
          </Route>
          <Route path="/list" exact>
            <ListPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
