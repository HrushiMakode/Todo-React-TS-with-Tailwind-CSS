import { ChangeEvent, FormEvent } from "react";
import { ReactComponent as PlusIcon } from "../assets/svgs/plus.svg";

export type AddTodoProps = {
    task: string;
    onSubmitTodo: (e: FormEvent) => void;
    onChangeTodo: (e: ChangeEvent) => void;
};

const AddTodo = ({ task, onChangeTodo, onSubmitTodo }: AddTodoProps) => {
    return (
        <form
            className="flex justify-between w-full items-center"
            onSubmit={(e: FormEvent) => onSubmitTodo(e)}
        >
            <input
                type="text"
                name="task"
                value={task}
                className="flex-1 rounded shadow p-2 text-gray-700 mr-2"
                onChange={(e: ChangeEvent) => onChangeTodo(e)}
            />
            <button type="submit" aria-label="Add Todo">
                <PlusIcon />
            </button>
        </form>
    );
};

export default AddTodo;
