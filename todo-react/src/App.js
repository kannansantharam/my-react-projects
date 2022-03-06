import { useState } from 'react';
import './App.css';
import TodoList from './TodoList'
function App() {
  const [myTodos, setmyTodos] = useState([]);
  const addTodo = () => {
    let inputValue = document.getElementById("todoValue").value;
    console.log(inputValue);
    setmyTodos((myTodos) => [...myTodos, inputValue])
  }
  return (
    <div className="App">
      <header className="App-header">
        <input type="text" id="todoValue" placeholder="Enter todo" />
        <button type="button" onClick={addTodo} className="btn btn-primary">Add Todo</button>
      </header>
      <section>
        <TodoList todo={myTodos} />
      </section>
    </div>
  );
}

export default App;
