interface TileProps {
    handleKeyDown: (event:React.KeyboardEvent) => void;
    tileText: string;
    setTileFocused : () => void;
    isFocused: boolean;
    isBeingSolved: boolean;
}

const Tile = ({handleKeyDown,tileText,setTileFocused,isFocused,isBeingSolved}:TileProps) => {
    return (
        <div onKeyDown={handleKeyDown} onClick={setTileFocused} className={`w-10 h-10 border outline-none flex items-center justify-center cursor-pointer ${
            isFocused ? "bg-blue-500" : "bg-blue-300"} ${isBeingSolved?"bg-green-500":"bg-blue-300"}`} tabIndex={0}>{tileText}</div>
    )
}

export default Tile;