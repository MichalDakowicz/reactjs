import { useState, useEffect } from "react";

import { TbTrash } from "react-icons/tb";
import { TbPlus } from "react-icons/tb";
import Checkbox from "../checkbox";
import InputGroup from "../inputgroup";
import Modal from "../modal";

export default function AppContainer() {
    const [todos, setTodos] = useState(() => {
        const stored = JSON.parse(localStorage.getItem("todos")) || [];
        if (Array.isArray(stored)) return stored;
        return Object.entries(stored).map(
            ([id, [title, description, completed]]) => {
                return { id, title, description, completed };
            }
        );
    });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const reorderTodos = (list) => {
        const completed = list.filter((todo) => todo.completed);
        const notCompleted = list.filter((todo) => !todo.completed);
        return [...notCompleted, ...completed];
    };

    const deleteTodo = (id) => {
        setTodos((prevTodos) => {
            return prevTodos.filter((todo) => todo.id !== id);
        });
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todoToDeleteId, setTodoToDeleteId] = useState(null);
    const [todoToDeleteTitle, setTodoToDeleteTitle] = useState("");

    const openDeleteModal = (id, title) => {
        setTodoToDeleteId(id);
        setTodoToDeleteTitle(title || "");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTodoToDeleteId(null);
        setTodoToDeleteTitle("");
    };

    const handleConfirmDelete = () => {
        if (todoToDeleteId) {
            deleteTodo(todoToDeleteId);
        }
        closeModal();
    };

    const handleDescriptionChange = (id, newDescription) => {
        setTodos((prevTodos) => {
            const updated = prevTodos.map((todo) =>
                todo.id === id ? { ...todo, description: newDescription } : todo
            );
            return reorderTodos(updated);
        });
    };

    const handleCheckboxClick = (id, newState) => {
        setTodos((prevTodos) => {
            const updated = prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: newState } : todo
            );
            return reorderTodos(updated);
        });
    };

    const handleTitleChange = (id, newTitle) => {
        setTodos((prevTodos) => {
            const updated = prevTodos.map((todo) =>
                todo.id === id ? { ...todo, title: newTitle } : todo
            );
            return reorderTodos(updated);
        });
    };

    return (
        <div className="app-container flex flex-col">
            <h1>To-do List</h1>
            <InputGroup
                placeholder="Add new note..."
                Icon={TbPlus}
                buttonText="Add"
                todos={todos}
                setTodos={setTodos}
            />
            <ul>
                {todos.map((todo) => {
                    const { id, title, description, completed } = todo;
                    return (
                        <li
                            key={id}
                            data-id={id}
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
                                onClick={() => openDeleteModal(id, title)}
                            >
                                <TbTrash />
                            </button>
                        </li>
                    );
                })}
            </ul>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={"Confirm delete"}
                description={`Are you sure you want to delete "${todoToDeleteTitle}"? This action cannot be undone.`}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}
