import React from 'react';
import './App.css';
import UserDetails from './components/user_details/UserDetails';
import { useState } from "react";
import LoginDetails from './components/Auth/LoginDetails'

function App() {
  const [user, setUser] = useState(undefined);
  //GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
  return (
    <>
      {(user !== undefined) ? <UserDetails user={user} /> : <LoginDetails onAuth={(user) => setUser(user)} />
      }
    </ >
  );
}

export default App;
