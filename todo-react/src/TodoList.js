import './App.css';

function TodoList(myTodos) {
    const removeTodo = (e, myTodos) => {
        let value = e.target.textContent;
        let stateTodos = myTodos.todo;
        let stateValueIndex = stateTodos.findIndex(a => a === value)
        if (stateValueIndex !== -1) {
            stateTodos.splice(stateValueIndex, 1);
        };
        console.log(stateTodos);
        myTodos.updateState(stateTodos)
        ///e.target.parentElement.remove();

    }
    return (
        myTodos.todo.map((myTodo, index) => {
            return (
                <li key={myTodo + "_" + index} onClick={e => removeTodo(e, myTodos)}>
                    <p>{myTodo}</p>
                </li>
            )
        })

    );
}

export default TodoList;
