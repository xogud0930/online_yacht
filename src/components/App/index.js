import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css'
import Room from '../pages/Room';
import Lobby from '../pages/Lobby';
import Main from '../pages/Main';
import socketio from 'socket.io-client';

const App = () => {
  //const name = window.sessionStorage.getItem('userName');
  const [roomList, setRoomList] = useState('')
  const [playerList, setPlayerList] = useState('');
  const [socket, setSocket] = useState();

    useEffect(() => {
        setSocket(socketio.connect('http://localhost:6050'));
    }, [])

  return (
    <div className="App">
      {socket ?
      <Router>
        <Switch>
          <Route exact path="/" render={props =>
            <Main
              socket = {socket}
              playerList = {playerList}
              {...props} />}/>
          
          <Route path="/lobby" render={props =>
            <Lobby
              socket = {socket}
              roomList = {roomList}
              setRoomList = {setRoomList}
              playerList = {playerList}
              setPlayerList = {setPlayerList}
              {...props}
            />}/>
          <Route path="/room/:id" render={props =>
            <Room
              socket = {socket}
              roomList = {roomList}
              setRoomList = {setRoomList}
              playerList = {playerList}
              setPlayerList = {setPlayerList}
              {...props}
          />}/>
        </Switch>
      </Router>
      : null }
    </div>
  );
}

export default App;
