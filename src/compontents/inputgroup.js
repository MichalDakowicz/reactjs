export default function InputGroup({
    placeholder,
    buttonText,
    Icon,
    onClick,
    id,
}) {
    return (
        <div className="w-2/3 mb-4">
            <div className="flex border-2 rounded-md border-gray-500 bg-neutral-950 transition-all ease-in-out duration-150 hover:bg-neutral-700 focus-within:border-blue-500">
                <input
                    type="text"
                    className="flex-1 py-3 px-4 bg-transparent text-zinc-200 placeholder-gray-400 text-lg focus:outline-none"
                    placeholder={placeholder}
                    id={id}
                />
                <button
                    type="button"
                    className="flex rounded-r-[3px] items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white font-semibold transition-all ease-in-out duration-150 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    onClick={onClick}
                >
                    {Icon && <Icon className="w-5 h-5" />}
                    {buttonText}
                </button>
            </div>
        </div>
    );
}
