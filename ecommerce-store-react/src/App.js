import './App.css';
import Header from './Header'
import React from 'react'
import Products from './Products'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/products">
            <Header />
            <Products />
          </Route>
          <Route path="/categories">
            <Header />
          </Route>
          <Route path="/cart">
            <Header />
          </Route>
          <Route path="/">
            <Header />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
