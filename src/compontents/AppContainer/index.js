import { TbTrash } from "react-icons/tb";
import Checkbox from "../checkbox";

const AppContainer = () => {
    return (
        <div className="app-container flex flex-col">
            <h1>To-do List</h1>
            <ul>
                {[1, 2, 3, 4].map((item) => (
                    <li key={item}>
                        <div>
                            <Checkbox label={`Element ${item}`} />
                            <button type="button">
                                <TbTrash />
                            </button>
                        </div>
                        <p>{`Description for Element ${item}`}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppContainer;
