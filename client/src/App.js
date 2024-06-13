import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Home from './pages/Home';

// establish the connection to the back-end server's /graphql endpoint.
const httpLink = createHttpLink({
  uri: '/graphql',
});
// se the ApolloClient() constructor to instantiate the Apollo Client instance and create the connection to the API endpoint
const client = new ApolloClient({
  link: httpLink,
  // instantiate a new cache object using new InMemoryCache()
  cache: new InMemoryCache(),
});

function App() {
  return (
    //we're passing the client variable in as the value for the client prop in the provider, everything between the JSX tags will eventually have access to the server's API data through the client we set up.
    <ApolloProvider client={client}>
    <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
                 <Route path="/profile">
                  <Route path=":username" element={<Profile />} />
                 <Route path="" element={<Profile />} />
                </Route>
                 <Route
                path="/thought/:id"
                element={<SingleThought />}
                />
              <Route
              path="*"
              element={<NoMatch />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
