import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import PropTypes from "prop-types";

// apollo stuff
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// styles
import "./index.css";

// custom components
import App from "./components/App";
import Navbar from "./components/Navbar/Navbar";

// Auth
import Signup from "./components/Auth/Signup";
import Signin from "./components/Auth/Signin";
import withSession from "./components/withSession";
import Profile from "./components/Profile/Profile";

// Cologne
import AddCologne from "./components/Cologne/AddCologne";
import ColognePage from "./components/Cologne/ColognePage";
import Search from "./components/Cologne/Search";

// our apollo client
const client = new ApolloClient({
  uri: "http://localhost:4444/graphql",
  // uri: 'https://fivestarcologne.herokuapp.com/graphql',
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log("Network Error", networkError);
    }
  }
});

const Root = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <Navbar session={session} />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/search" component={Search} />
        <Route path="/profile" render={() => <Profile session={session} />} />
        <Route
          path="/cologne/add"
          render={() => <AddCologne session={session} />}
        />
        <Route path="/cologne/:_id" component={ColognePage} />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);

Root.propTypes = {
  refetch: PropTypes.func,
  session: PropTypes.object
};

Root.defaultProps = {
  refetch: undefined,
  session: null
};

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById("root")
);
