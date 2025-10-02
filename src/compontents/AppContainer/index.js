import { TbTrash } from "react-icons/tb";
import Checkbox from "../checkbox";

const AppContainer = () => {
    return (
        <div className="app-container flex flex-col">
            <h1>To-do List</h1>
            <ul>
                <li>
                    <div>
                        <Checkbox label="Element 1" />
                        <button type="button">
                            <TbTrash />
                        </button>
                    </div>
                    <p>Description for Element 1</p>
                </li>
                <li>
                    <div>
                        <Checkbox label="Element 2" />
                        <button type="button">
                            <TbTrash />
                        </button>
                    </div>
                    <p>Description for Element 2</p>
                </li>
                <li>
                    <div>
                        <Checkbox label="Element 3" />
                        <button type="button">
                            <TbTrash />
                        </button>
                    </div>
                    <p>Description for Element 3</p>
                </li>
            </ul>
        </div>
    );
};

export default AppContainer;
