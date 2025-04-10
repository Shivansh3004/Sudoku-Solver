"use client"

import React, { useState } from 'react'
import Tile from './Tile';
import "../functions/solver"
import Buttons from './Buttons';

const Board = () => {

    const [boardText,setBoardText] = useState(()=>{
        const tempBoard = [];
        for (let i = 0; i < 9; i++) {
            const currRow = [];
            for (let j = 0; j < 9; j++) {
                currRow.push("");
            }
            tempBoard.push(currRow);
        }
        return tempBoard;
    })

    const board = boardText.map(row=>[...row]);


    const handleKeyDown = (event: React.KeyboardEvent,rowIndex:number,cellIndex:number) => {
        const key = event.key;
        const ascii = key.charCodeAt(0);
        if(key.length!=1){
            if(key === "Backspace"){
                setBoardText((prevBoard)=>{
                    const newBoard = prevBoard.map(row => [...row]);
                    newBoard[rowIndex][cellIndex] = newBoard[rowIndex][cellIndex].slice(0,-1);
                    return newBoard;
                })
            }
            return;
        }
        if(ascii<49 || ascii>57){
            alert("Invalid key");
            return;
        }
        setBoardText((prevBoard) => {
            const newBoard = prevBoard.map(row => [...row]);
            newBoard[rowIndex][cellIndex] = key;
            return newBoard;
        });
    }


    const setTileWithDelay = async(rowIndex:number,cellIndex:number, val:string) => {
        board[rowIndex][cellIndex] = val;
        setBoardText((prevBoard)=>{
            const newBoard = prevBoard.map(row => [...row]);
            newBoard[rowIndex][cellIndex] = val;
            return newBoard;
        })
        await new Promise((resolve)=>setTimeout(resolve,50));
    }

    const checkInitial = () => {
        
        //check each row
        for(let i=0;i<9;i++){
            const rowMap = new Map<string, boolean>();
            for(let j=0;j<9;j++){
                if(board[i][j] == "") continue;
                if(rowMap.get(board[i][j])){
                    console.log(i,j)
                    return false;
                } 
                rowMap.set(board[i][j],true);
            }
        }
        //check each column
        for(let j=0;j<9;j++){
            const colMap = new Map<string, boolean>();
            for(let i=0;i<9;i++){
                if(board[i][j] == "") continue;
                if(colMap.get(board[i][j])){
                    return false;
                } 
                colMap.set(board[i][j],true);
            }
        }
        //check each 3*3 grid
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                const gridMap = new Map<string, boolean>();
                for(let x = i*3;x<i*3+3;x++){
                    for(let y=j*3;y<j*3+3;y++){
                        if(board[x][y] == "") continue;
                        if(gridMap.get(board[x][y])){
                            console.log(i,j);
                            return false;
                        }
                        gridMap.set(board[x][y],true);
                    }
                }
            }
        }
        return true;
    }

//solve sudoku using backtracking
    const solveWithSteps = async() => {
        if(!checkInitial()){
            alert("Invalid initial board");
            return;
        }
        await helper(0,0);
    }

    let flag = false;


    const solveInstantly = () => {
        if(!checkInitial()){
            alert("Invalid initial board");
            return;
        }
        const success = solveBoard(board);
        if (success) {
            setBoardText(board);
        } else {
            alert("No solution found!");
        }
    };

    const solveBoard = (board: string[][]): boolean => {
        const check = (row: number, col: number, val: string): boolean => {
            for (let i = 0; i < 9; i++) {
                if (board[row][i] === val || board[i][col] === val) return false;
            }
    
            const startRow = Math.floor(row / 3) * 3;
            const startCol = Math.floor(col / 3) * 3;
            for (let i = startRow; i < startRow + 3; i++) {
                for (let j = startCol; j < startCol + 3; j++) {
                    if (board[i][j] === val) return false;
                }
            }
            return true;
        };
    
        const solve = (): boolean => {
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (board[row][col] === "") {
                        for (let num = 1; num <= 9; num++) {
                            const val = num.toString();
                            if (check(row, col, val)) {
                                board[row][col] = val;
                                if (solve()) return true;
                                board[row][col] = "";
                            }
                        }
                        return false; // No valid number found, backtrack
                    }
                }
            }
            return true; // Board is completely filled
        };
    
        return solve();
    };


    const check = (rowIndex: number, cellIndex: number, val: number): boolean => {
        const valStr = val.toString();
    
        // Check row
        for (let j = 0; j < 9; j++) {
            if (board[rowIndex][j] === valStr) return false;
        }
    
        // Check column
        for (let i = 0; i < 9; i++) {
            if (board[i][cellIndex] === valStr) return false;
        }
        //check 3*3 grid
        const startRow = Math.floor(rowIndex / 3)*3;
        const startCol = Math.floor(cellIndex / 3)*3;
        for (let i = startRow; i < startRow+3; i++) {
            for (let j = startCol; j < startCol+3; j++) {
                if (board[i][j] === valStr) return false;
            }
        }
        return true;
    };

    const helper = async(currRow:number,currCol:number)=>{
        if(currRow == 9) {
            flag = true;
            return;
        }
        if(currCol == 9){
            await helper(currRow+1,0);
            return;
        }
        if(board[currRow][currCol] != ""){
            await helper(currRow,currCol+1);
            return;
        }
        for(let i=1;i<=9;i++){
            if(check(currRow,currCol,i)){
                if(flag) return;
                await setTileWithDelay(currRow,currCol,i.toString());
                await helper(currRow,currCol+1);
                if(flag) return;
                await setTileWithDelay(currRow,currCol,"");
            }
        }
    }

    return (
        <div className='bg-white'>
            {
                boardText.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        {row.map((cell, cellIndex) => (
                            <Tile key={rowIndex*9+cellIndex} handleKeyDown={(event)=>handleKeyDown(event,rowIndex,cellIndex)} tileText = {boardText[rowIndex][cellIndex]}/>
                        ))}
                    </div>
                ))
            }
            <Buttons solveWithSteps={solveWithSteps} solveInstantly={solveInstantly}/>
        </div>
    )
}

export default Board