import React from 'react'

interface ButtonsProps {
    solveWithSteps: () => Promise<void>;
    solveInstantly: () => void;
    generateRandom: () => void;
    clearBoard: () => void;
}

const Buttons = ({solveWithSteps,solveInstantly,generateRandom,clearBoard}:ButtonsProps) => {
    return (
        <div className="flex justify-center items-center w-full">
            {[
                { label: 'Show Steps', action: solveWithSteps },
                { label: 'Solve Instantly', action: solveInstantly },
                { label: 'Random Puzzle', action: generateRandom }, // Shortened label for consistency
                { label: 'Clear', action: clearBoard },
            ].map(({ label, action }, idx) => (
                <button
                key={idx}
                onClick={action}
                className="w-1/4 h-10 text-[10px] sm:text-[15px] border rounded m-2 p-2 flex items-center justify-center"
                >
                {label}
                </button>
            ))}
        </div>
    )
}

export default Buttons