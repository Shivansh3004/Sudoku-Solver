const NumberPad = ({ onNumberClick }: { onNumberClick: (val: string) => void }) => {
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ""];

    return (
        <div className="grid grid-cols-5 gap-2 p-2">
            {numbers.map((num, idx) => (
            <button
                key={idx}
                className="p-4 bg-blue-200 rounded shadow text-xl cursor-pointer"
                onClick={() => onNumberClick(num)}
            >
                {num === "" ? "X" : num}
            </button>
            ))}
        </div>
    );
};

export default NumberPad;