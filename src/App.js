import React, {useEffect} from 'react';
import { useKeycloak } from '@react-keycloak/web';
import Login from './Login';
import Home from './Home';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { addUserToDatabase } from './userService';
import AddEvent from './AddEvent';

const App = () => {
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    if(keycloak.authenticated){
        addUserToDatabase(keycloak)
        .then(result => {
          if (result.userAdded) {
              console.log('User was added to database:', result.data);
          } else {
              console.log('User already exists in database:', result.data);
          }
      })
      .catch(error => {
          console.error('Error:', error.message);
      });
    }
}, [keycloak, keycloak.authenticated])

  if (!initialized) {
    return null; 
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route 
        path='/login'
        element={keycloak.authenticated ? <Navigate replace to="/" /> : <Login />}
        />
        <Route 
        path='/'
        element={keycloak.authenticated ? <Home/> : <Navigate to="login" />}
        />
        <Route
        path='/events/add'
        element={<AddEvent/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
