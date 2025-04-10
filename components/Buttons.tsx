import React from 'react'

interface ButtonsProps {
    solveWithSteps: () => Promise<void>;
    solveInstantly: () => void;
}

const Buttons = ({solveWithSteps,solveInstantly}:ButtonsProps) => {
    return (
        <div className="bg-red-400 flex-1 flex justify-center items-center">
            <button onClick={solveWithSteps} className='p-4 m-4 border cursor-pointer'>Show Steps</button>
            <button onClick={solveInstantly} className='p-4 m-4 border cursor-pointer'>Solve Instantly</button>
        </div>
    )
}

export default Buttons