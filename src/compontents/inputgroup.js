import { useRef } from "react";
import uuid from "react-uuid";
import Modal from "./modal";

export default function InputGroup({
    placeholder,
    buttonText,
    Icon,
    todos,
    setTodos,
}) {
    <Modal />;
    const newTodo = (title) => {
        if (!title || !title.trim()) return;
        const id = uuid();
        const newTodoObject = {
            id,
            title,
            description: "Description (click to edit)",
            completed: false,
        };
        const notCompleted = todos.filter((todo) => !todo.completed);
        const completed = todos.filter((todo) => todo.completed);
        setTodos([...notCompleted, newTodoObject, ...completed]);
        if (inputRef.current) inputRef.current.value = "";
    };

    const inputRef = useRef(null);

    return (
        <div className="w-2/3 mb-4">
            <div className="flex border-2 rounded-md border-gray-500 bg-neutral-950 transition-all ease-in-out duration-150 hover:bg-neutral-700 focus-within:border-blue-500">
                <input
                    ref={inputRef}
                    type="text"
                    className="flex-1 py-3 px-4 bg-transparent text-zinc-200 placeholder-gray-400 text-lg focus:outline-none"
                    placeholder={placeholder}
                />
                <button
                    type="button"
                    className="flex rounded-r-[3px] items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white font-semibold transition-all ease-in-out duration-150 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    onClick={() => newTodo(inputRef?.current?.value)}
                >
                    {Icon && <Icon className="w-5 h-5" />}
                    {buttonText}
                </button>
            </div>
        </div>
    );
}
