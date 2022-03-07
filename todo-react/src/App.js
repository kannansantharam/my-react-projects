import { useState } from 'react';
import './App.css';
import TodoList from './TodoList'
function App() {
  const [myTodos, setmyTodos] = useState([]);
  const addTodo = (stateTodos) => {
    let inputValue = document.getElementById("todoValue").value;
    document.getElementById("todoValue").value = '';
    if (stateTodos) {
      setmyTodos(() => [...stateTodos]);
      return
    }
    setmyTodos((myTodos) => [...myTodos, inputValue])
  }
  return (
    <div className="App">
      <header className="App-header">
        <input type="text" id="todoValue" placeholder="Enter todo" />
        <button type="button" onClick={e => addTodo("")} className="primary" >Add Todo</button>
      </header>
      <section>
        <ul>
          <TodoList todo={myTodos} updateState={addTodo} />
        </ul>
      </section>
    </div>
  );
}

export default App;
