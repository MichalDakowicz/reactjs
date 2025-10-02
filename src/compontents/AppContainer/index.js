import { useState, useEffect } from "react";

import uuid from "react-uuid";

import { TbTrash } from "react-icons/tb";
import { TbPlus } from "react-icons/tb";
import Checkbox from "../checkbox";
import InputGroup from "../inputgroup";

export default function AppContainer() {
    const [todos, setTodos] = useState(
        () => JSON.parse(localStorage.getItem("todos")) || {}
    );

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const reorderTodos = () => {
        const completed = [];
        const notCompleted = [];
        Object.entries(todos).forEach(([id, todo]) => {
            if (todo[2]) {
                completed.push([id, todo]);
            } else {
                notCompleted.push([id, todo]);
            }
        });
        const reordered = [...notCompleted, ...completed];
        const newTodos = {};
        reordered.forEach(([id, todo]) => {
            newTodos[id] = todo;
        });
        setTodos(newTodos);
    };

    const newTodo = (title) => {
        if (!title || !title.trim()) return;
        const id = uuid();
        const completed = [];
        const notCompleted = [];
        Object.entries(todos).forEach(([id, todo]) => {
            if (todo[2]) {
                completed.push([id, todo]);
            } else {
                notCompleted.push([id, todo]);
            }
        });
        const reordered = [
            ...notCompleted,
            [id, [title, "Description (click to edit)", false]],
            ...completed,
        ];
        const newTodos = {};
        reordered.forEach(([id, todo]) => {
            newTodos[id] = todo;
        });
        setTodos(newTodos);
        const input = document.getElementById("add-note");
        if (input) input.value = "";
    };

    const deleteTodo = (id) => {
        setTodos((prevTodos) => {
            const next = { ...prevTodos };
            delete next[id];
            return next;
        });
    };

    const handleDescriptionChange = (id, newDescription) => {
        setTodos((prevTodos) => {
            const next = { ...prevTodos };
            if (next[id]) {
                next[id][1] = newDescription;
            }
            return next;
        });
        reorderTodos();
    };

    const handleCheckboxClick = (id, newState) => {
        setTodos((prevTodos) => {
            const next = { ...prevTodos };
            if (next[id]) {
                next[id][2] = newState;
            }
            return next;
        });
        reorderTodos();
        const liElement = document.querySelector(`li[key='${id}']`);
        if (liElement) {
            if (newState) {
                liElement.classList.add("completed");
            } else {
                liElement.classList.remove("completed");
            }
        }
    };

    const handleTitleChange = (id, newTitle) => {
        setTodos((prevTodos) => {
            const next = { ...prevTodos };
            if (next[id]) {
                next[id][0] = newTitle;
            }
            return next;
        });
        reorderTodos();
    };

    return (
        <div className="app-container flex flex-col">
            <h1>To-do List</h1>
            <InputGroup
                placeholder="Add new note..."
                Icon={TbPlus}
                buttonText="Add"
                onClick={() => {
                    newTodo(document.getElementById("add-note").value);
                }}
                id="add-note"
            />
            <ul>
                {Object.entries(todos).map(
                    ([id, [title, description, completed]]) => (
                        <li
                            key={id}
                            className={`${completed ? "completed" : ""}`}
                        >
                            <div id="note-info">
                                <Checkbox
                                    label={`${title}`}
                                    isContentEditable={true}
                                    onContentEdit={(e) =>
                                        handleTitleChange(
                                            id,
                                            e.target.innerText
                                        )
                                    }
                                    state={completed}
                                    onChange={(newState) =>
                                        handleCheckboxClick(id, newState)
                                    }
                                />
                                <p
                                    className="whitespace-pre-wrap"
                                    contentEditable="true"
                                    onBlur={(e) => {
                                        const text = e.target.innerText;
                                        const cleaned = text.trimEnd();
                                        e.target.innerText = cleaned;
                                        handleDescriptionChange(id, cleaned);
                                    }}
                                >
                                    {description}
                                </p>
                            </div>
                            <button
                                type="button"
                                id="delete-button"
                                onClick={() => deleteTodo(id)}
                            >
                                <TbTrash />
                            </button>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}
