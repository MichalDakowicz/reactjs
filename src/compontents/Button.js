const Button = ({ children, handleClick }) => {
    return (
        <button
            type="button"
            className="bg-blue-700 text-white px-4 py-2 rounded-xl font-bold transition-all duration-300 ease-in-out hover:bg-blue-800"
            onClick={() => {
                console.log("Button clicked");
            }}
        >
            {children}
        </button>
    );
};

export default Button;
