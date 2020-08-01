import React from 'react';
import './App.css';
import User from './User';
import Header from './Header'
import Boxes from './Box/Boxes';
import Footer from './Footer/Footer';
function App() {
  return (
    <div className="App">
      <Header />
      <User name="Kannan" />
      <div className="boxes">
        <Boxes number='1' />
        <Boxes number='2' />
        <Boxes number='3' />
        <Boxes number='4' />
      </div>
      <Footer />
    </div>
  );
}

export default App;
