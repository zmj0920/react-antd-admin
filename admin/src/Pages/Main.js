import React from 'react';
import Login from './Login'
import BaseLayout from './BaseLayout'
import { BrowserRouter as Router, Route } from 'react-router-dom'
function Main() {
    return (
        <Router>
          <Route path="/" exact component={Login}/>
          <Route path="/index" exact component={BaseLayout}/>
        </Router>
    )
}

export default Main