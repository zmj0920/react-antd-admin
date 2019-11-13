import React from 'react';
import Login from './Login'
import { BrowserRouter as Router, Route } from 'react-router-dom'
function Main() {
    return (
        <Router>
          <Route path="/login/" exact component={Login}/>
        </Router>
    )
}

export default Main