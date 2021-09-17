import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Row, { Todo } from "./Row";
import AddTodo from "./AddTodo";
import { data } from "../data";

const Todos = () => {
    const [todos, setTodos] = useState<Todo[]>(data);
    const [task, setTask] = useState<string>("");
    const todosLength = todos.length;
    const hasTodos = todos.length > 0;
    const remainingTodos = todos.filter(todo => !todo.isCompleted).length;

    const handleChangeTodo = (e: ChangeEvent) => {
        const { value } = e.target as HTMLInputElement;
        setTask(value);
    };

    const handleAddTodo = (todo: Todo) => {
        const updatedTodos = [...todos, todo];
        setTodos(updatedTodos);
    };

    const handleSubmitTodo = (e: FormEvent) => {
        e.preventDefault();
        const todo: Todo = {
            id: uuidv4(),
            task: task,
            isCompleted: false,
        };
        task && handleAddTodo(todo);
        setTask("");
    };

    const handleDeleteTodo = (id: string) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        setTask("");
    };

    const handleCheckTodo = (id: string) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id)
                return { ...todo, isCompleted: !todo.isCompleted };
            return todo;
        });
        setTodos(updatedTodos);
    };

    return (
        <section className="w-10/12 lg:w-1/2 mx-w-2xl flex flex-col items-center ">
            <AddTodo
                task={task}
                onSubmitTodo={handleSubmitTodo}
                onChangeTodo={handleChangeTodo}
            />
            <div className="h-10" />
            {todos.map(todo => (
                <Row
                    key={todo.id}
                    todo={todo}
                    onDelete={handleDeleteTodo}
                    onCheck={handleCheckTodo}
                ></Row>
            ))}

            {!hasTodos && (
                <p className="mb-5 text-xl text-red-500 uppercase">
                    Please Add a todo !
                </p>
            )}

            {hasTodos && (
                <p>{`${remainingTodos} of ${todosLength} todos remaining `} </p>
            )}
        </section>
    );
};

export default Todos;
