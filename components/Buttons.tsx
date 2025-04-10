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
            <button onClick={solveWithSteps} className='p-4 m-4 text-xs sm:text-xl sm:px-3 sm:py-2 border cursor-pointer'>Show Steps</button>
            <button onClick={solveInstantly} className='p-4 m-4 text-xs sm:text-xl sm:px-3 sm:py-2 border cursor-pointer'>Solve Instantly</button>
            <button onClick={generateRandom} className='p-4 m-4 text-xs sm:text-xl sm:px-3 sm:py-2 border cursor-pointer'>Generate random puzzle</button>
            <button onClick={clearBoard} className='p-4 m-4 text-xs sm:text-xl sm:px-3 sm:py-2 border cursor-pointer'>Clear Board</button>
        </div>
    )
}

export default Buttons