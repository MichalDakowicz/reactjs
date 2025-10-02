import { TbTrash } from "react-icons/tb";
import Checkbox from "../checkbox";

const AppContainer = () => {
    return (
        <div className="app-container flex flex-col">
            <h1>To-do List</h1>
            <ul>
                {[1, 2, 3, 4].map((item) => (
                    <li key={item}>
                        <div id="note-info">
                            <Checkbox label={`Element ${item}`} />
                            <p contentEditable="true">{`Description for Element ${item}`}</p>
                        </div>
                        <button type="button" id="delete-button">
                            <TbTrash />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppContainer;
