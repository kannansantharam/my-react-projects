import React from 'react';
import './App.css';
import ClockBanner from './ClockBanner/ClockBanner';
import Header from './Header'
import Boxes from './Box/Boxes';
import Footer from './Footer/Footer';
function App() {
  return (
    <div className="App">
      <Header />
      <ClockBanner/>
      <div className="boxes">
        <Boxes number='1' isToggle="false"/>
        <Boxes number='2' isToggle="false"/>
        <Boxes number='3' isToggle="true"/>
        <Boxes number='4' isToggle="false"/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
