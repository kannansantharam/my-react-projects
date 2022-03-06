import './App.css';

function TodoList(myTodos) {
    return (
        myTodos.todo.map((myTodo, index) => {
            return (
                <div key={myTodo + "_" + index}>
                    <p>{myTodo}</p>
                </div>
            )
        })

    );
}

export default TodoList;
