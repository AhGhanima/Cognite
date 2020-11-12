import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import  ChatLayout  from './Layout/ChatLayout/ChatLayout';
import  Login  from './Components/Login/Login';
import { SocketContextProvider } from "./Context/SocketContext/SocketContext";

function App() {
  return (
    <div className="App">
      <SocketContextProvider>
        <Router>
        <Switch>
            <Route path="/chat/:friendName">
              <ChatLayout />
            </Route>
            <Route path="/chat">
              <ChatLayout />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
      </SocketContextProvider>
      </div>
  );
}

export default App;
