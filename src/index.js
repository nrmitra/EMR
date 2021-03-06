import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss";
import "assets/demo/demo.css";
import "assets/external/external.css";
import indexRoutes from "routes/index.jsx";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';

const hist = createBrowserHistory();
const cache = new InMemoryCache();

export const client = new ApolloClient({
  cache,
  uri: "https://api.graph.cool/simple/v1/cjnaaji6g014p0127lqfjvz73"
});

ReactDOM.render(
  <ApolloProvider client={client}>
  <BrowserRouter>
  <Router history={hist}>
  
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} key={key} component={prop.component} />
      })}
    </Switch>
   
  </Router>
  </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
