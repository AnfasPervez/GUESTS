import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import {Navbar} from './components/layouts/Navbar'
import Home from './components/pages/Home'
import GuestState from './context/guestContext/GuestState'
import AuthState  from './context/authContext/authstate'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import PrivateRoute from '../src/components/pages/Routes/PrivateRoute'
import setToken from '../src/Utils/setToken'


if(localStorage.token){
  setToken(localStorage.token)
}
function App() {
  return (
    <AuthState>
    <GuestState>

      <Router>
    <div >
    <Navbar />
   <Switch>
     <PrivateRoute exact path='/' component={Home}/>
      <Route exact path='/register' component={Register} />
    <Route exact path='/login' component={Login} />


   </Switch>
    
    </div>
    </Router>
    </GuestState>
    </AuthState>
  );
}

export default App;
