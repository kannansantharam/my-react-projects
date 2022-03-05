import './App.css';
import TodoList from './TodoList'
function addTodo() {
  let inputValue = document.getElementById("todoValue").value;
  console.log(inputValue)
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <input type="text" id="todoValue" placeholder="Enter todo" />
        <button type="button" onClick={addTodo} className="btn btn-primary">Add Todo</button>
      </header>
      <section>
        <TodoList />
      </section>
    </div>
  );
}

export default App;
