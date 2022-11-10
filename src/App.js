import logo from './logo.svg';
import './App.css';
import Task from './components /Task';
import { useState } from 'react';

function App() {
  const [state, setState] = useState({
    task: {
      id: "1",
      title: "Supertask",
      state: "TASK_PINNED"
    },
    onPinTask: ()=>console.log("onPinned"),
    onArchiveTask: ()=>{console.log("onArchove")}
  }
  );
  return (
    <div className="App">
      <Task {...state} />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
