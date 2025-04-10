interface TileProps {
    handleKeyDown: (event:React.KeyboardEvent) => void
    tileText: string;
}

const Tile = ({handleKeyDown,tileText}:TileProps) => {
    return (
        <div onKeyDown={handleKeyDown} className='w-10 h-10 bg-blue-300 border outline-none flex items-center justify-center' tabIndex={0}>{tileText}</div>
    )
}

export default Tile