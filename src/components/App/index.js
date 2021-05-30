import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Room from '../pages/Room';
import Lobby from '../pages/Lobby';
import Main from '../pages/Main';

const App = () => {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" render={props => <Main {...props} />}/>
          <Route path="/lobby" render={props => <Lobby {...props} />}/>
          <Route path="/room" render={props => <Room {...props} />}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
