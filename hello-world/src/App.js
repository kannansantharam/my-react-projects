import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello world!
        </p>
        <a
          className="App-link"
          href="https://github.com/kannan-santharam/my-react-projects"
          target="_blank"
          rel="noopener noreferrer"
        >
          View all my react-projects
        </a>
      </header>
    </div>
  );
}

export default App;
