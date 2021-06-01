import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css'
import Room from '../pages/Room';
import Lobby from '../pages/Lobby';
import Main from '../pages/Main';

const App = () => {
  const name = window.sessionStorage.getItem('userName');
  const [roomList, setRommList] = useState([
      {player: 2, state: 'on'},
      {player: 4, state: 'off'},
  ])
  const [playerList, setPlayerList] = useState('');

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" render={props => <Main {...props} />}/>
          <Route path="/lobby" render={props =>
            <Lobby
              roomList = {roomList}
              playerList = {playerList}
              setPlayerList = {setPlayerList}
              {...props}
            />}/>
          <Route path="/room/:id" render={props =>
            <Room
              roomList = {roomList}
              playerList = {playerList}
              setPlayerList = {setPlayerList}
              {...props}
          />}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
