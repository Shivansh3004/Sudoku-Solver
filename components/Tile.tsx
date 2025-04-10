interface TileProps {
    handleKeyDown: (event:React.KeyboardEvent) => void;
    tileText: string;
    setTileFocused : () => void;
    isFocused: boolean;
    isBeingSolved: boolean;
}

const Tile = ({handleKeyDown,tileText,setTileFocused,isFocused,isBeingSolved}:TileProps) => {
    return (
        <div onKeyDown={handleKeyDown} onClick={setTileFocused} className={`border outline-none flex items-center justify-center cursor-pointer text-xs sm:text-sm md:text-base
    ${isBeingSolved ? "bg-green-500" : isFocused ? "bg-blue-500" : "bg-blue-300"}
    w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12`} tabIndex={0}>{tileText}</div>
    )
}

export default Tile;