import './App.css';

function TodoList(myTodos) {
    return (
        myTodos.todo.map((myTodo, index) => {
            return (
                <li key={myTodo + "_" + index}>
                    <p>{myTodo}</p>
                </li>
            )
        })

    );
}

export default TodoList;
