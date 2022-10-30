import React, { Component } from "react";
import { ChessColors, ChessPieceEnum, ChessPieceModel } from "../Models/ChessPiece";
import { BlackPawn, BlackRook, BlackKnight, BlackBishop, BlackQueen, BlackKing, EmptySpace, WhitePawn, WhiteRook, WhiteKnight, WhiteBishop, WhiteQueen, WhiteKing } from "../Models/ChessPieces";
import { Move } from "../Models/Move";
import { Square } from "../Models/Square";
import ChessBoard from "./ChessBoard";

interface State {
    PlayersTurn: ChessColors
    Grid: ChessPieceModel[][]
    SelectedSquare: Square
    PossibleDestinations: Square[]
}

interface ChessGameProps {
    
}

class ChessGame extends Component<ChessGameProps, State> {   

    constructor(props: ChessGameProps) {
        super(props);

        this.state = {
            PlayersTurn: ChessColors.White,
            Grid: this.initializeChessBoard() as ChessPieceModel[][],
            SelectedSquare: {
                row: -1,
                column: -1
            } as Square,
            PossibleDestinations: [] as Square[],
        }
    }

    render() {
        return(
            <div className="ChessGame">
                <ChessBoard PossibleDestinations={this.state.PossibleDestinations} SelectedSquare={this.state.SelectedSquare} SelectPiece={this.SelectPiece} PlayersTurn={this.state.PlayersTurn} grid={this.state.Grid} />
            </div>
        )
    }

    SelectPiece = (square: Square) => {
        let same = (this.state.SelectedSquare.column === square.column) && (this.state.SelectedSquare.row === square.row)
        let newSquare = square
        if(same) {
            newSquare = {
                row: -1,
                column: -1
            } as Square
        } 

        this.setState({
            SelectedSquare: newSquare
        })

        this.showPossibleMoves(newSquare)
    }

    getSquare = (row: Number, col: Number) => {
        let wantedSquare = {
            row: row,
            column: col
        } as Square
        return wantedSquare
    }

    getPiece = (square: Square, grid: ChessPieceModel[][]) => {
        let piece = grid[square.row][square.column] as ChessPieceModel
        return piece;
    }

    getPieceOnSquare = (row: Number, col: Number, grid: ChessPieceModel[][]) => {
        return this.getPiece(this.getSquare(row, col), grid) as ChessPieceModel
    }

    showPossibleMoves = (square: Square) => {
        let possibleDestinations = [] as Square[]
        let finalPossibleMoves = [] as Square[]

        if(square.row >= 0 && square.column >= 0) {
            let selectedPiece = this.state.Grid[square.row][square.column] as ChessPieceModel

            if(selectedPiece.type !== ChessPieceEnum.Empty) {   
                if(selectedPiece.color === this.state.PlayersTurn) {
                    possibleDestinations = this.getPossibleMovesForSquare(square, selectedPiece, this.state.Grid)

                    for(let i = 0; i < possibleDestinations.length; i++) {
                        let possibleDestination = possibleDestinations[i]
                        let possibleMove = {
                            from: square,
                            to: possibleDestination
                        } as Move

                        if(!this.anyKingInCheckAfterMove(possibleMove)) {
                            finalPossibleMoves.push(possibleDestination)
                        }
                    }
                }
            }
        } 

        this.setState({
            PossibleDestinations: finalPossibleMoves
        })
    }

    getPossibleMovesForSquare = (square: Square, selectedPiece: ChessPieceModel, grid: ChessPieceModel[][]) => {
        let possibleDestinations = [] as Square[]

        switch(selectedPiece.type) {
            case(ChessPieceEnum.Pawn):
                possibleDestinations = this.possiblePawnMoves(square, selectedPiece.color, grid)                               
                break;

            case(ChessPieceEnum.Knight):
                possibleDestinations =  this.possibleKnightMoves(square, selectedPiece.color, grid)
                break;

            case(ChessPieceEnum.Bishop):
                possibleDestinations =  this.possibleBishopMoves(square, selectedPiece.color, grid)
                break;

            case(ChessPieceEnum.Rook):
                possibleDestinations =  this.possibleRookMoves(square, selectedPiece.color, grid)
                break;

            case(ChessPieceEnum.Queen):
                possibleDestinations =  this.possibleQueenMoves(square, selectedPiece.color, grid)
                break;
        }       
        
        return possibleDestinations
    }

    possiblePawnMoves = (square: Square, color: ChessColors, grid: ChessPieceModel[][]) => {
        let possibleDestinations = [] as Square[]
        let direction = (color === ChessColors.Black) ? -1 : 1

        if(this.getPieceOnSquare(square.row - (1*direction), square.column, grid).type === ChessPieceEnum.Empty) {
            possibleDestinations.push(this.getSquare(square.row - (1*direction), square.column))

            if(square.row === 6 && color === ChessColors.White) {
                if(this.getPieceOnSquare(square.row - (2*direction), square.column, grid).type === ChessPieceEnum.Empty) {
                    possibleDestinations.push(this.getSquare(square.row - (2*direction), square.column))
                }
            }

            if(square.row === 1 && color === ChessColors.Black) {
                if(this.getPieceOnSquare(square.row - (2*direction), square.column, grid).type === ChessPieceEnum.Empty) {
                    possibleDestinations.push(this.getSquare(square.row - (2*direction), square.column))
                }
            }
        }

        if(square.column - 1 >= 0) {
            let possiblePiece = this.getPieceOnSquare(square.row - (1*direction), square.column - 1, grid)
            let oppositeColor = (color === ChessColors.White) ? ChessColors.Black : ChessColors.White
            if(possiblePiece.type !== ChessPieceEnum.Empty && possiblePiece.color === oppositeColor) {
                possibleDestinations.push(this.getSquare(square.row - (1*direction), square.column - 1))
            }
        }

        if(square.column + 1 <= 7) {
            let possiblePiece = this.getPieceOnSquare(square.row - (1*direction), square.column + 1, grid)
            let oppositeColor = (color === ChessColors.White) ? ChessColors.Black : ChessColors.White
            if(possiblePiece.type !== ChessPieceEnum.Empty && possiblePiece.color === oppositeColor) {
                possibleDestinations.push(this.getSquare(square.row - (1*direction), square.column + 1))
            }
        }

        return possibleDestinations
    }

    possibleKnightMoves = (square : Square, color: ChessColors, grid: ChessPieceModel[][]) => {
        let row = square.row
        let col = square.column
        let possibleDestinations = [
            this.getSquare(row + 2, col + 1), this.getSquare(row + 2, col - 1), this.getSquare(row - 2, col + 1), this.getSquare(row - 2, col - 1),
            this.getSquare(row + 1, col + 2), this.getSquare(row - 1, col + 2), this.getSquare(row + 1, col - 2), this.getSquare(row - 1, col - 2)
        ] as Square[]

        let oppositeColor = (color === ChessColors.Black) ? ChessColors.White : ChessColors.Black
        
        possibleDestinations = possibleDestinations.filter(s => this.inBounds(s) 
        && (this.getPieceOnSquare(s.row, s.column, grid).type === ChessPieceEnum.Empty || this.getPieceOnSquare(s.row, s.column, grid).color === oppositeColor))

        return possibleDestinations
    }

    possibleBishopMoves = (square : Square, color: ChessColors, grid: ChessPieceModel[][]) => {
        let row = square.row
        let col = square.column
        
        let possibleDestinations = [] as Square[]

        let oppositeColor = (color === ChessColors.Black) ? ChessColors.White : ChessColors.Black

        //top left
        for(let i = 1; i < 8; i++) {
            let targetSquare = this.getSquare(row - i, col - i)
            if(this.inBounds(targetSquare)) {
                if(this.getPieceOnSquare(targetSquare.row, targetSquare.column, grid).type === ChessPieceEnum.Empty) {
                    possibleDestinations.push(targetSquare)
                } else if(this.getPieceOnSquare(targetSquare.row, targetSquare.column, grid).color === oppositeColor) {
                    possibleDestinations.push(targetSquare)
                    break;
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        //top right
        for(let i = 1; i < 8; i++) {
            let targetSquare = this.getSquare(row - i, col + i)
            if(this.inBounds(targetSquare)) {
                if(this.getPieceOnSquare(targetSquare.row, targetSquare.column, grid).type === ChessPieceEnum.Empty) {
                    possibleDestinations.push(targetSquare)
                } else if(this.getPieceOnSquare(targetSquare.row, targetSquare.column, grid).color === oppositeColor) {
                    possibleDestinations.push(targetSquare)
                    break;
                } else {
                    break;
                }              
            } else {
                break;
            }
        }

        //bottom right
        for(let i = 1; i < 8; i++) {
            let targetSquare = this.getSquare(row + i, col + i)
            if(this.inBounds(targetSquare)) {
                if(this.getPieceOnSquare(targetSquare.row, targetSquare.column, grid).type === ChessPieceEnum.Empty) {
                    possibleDestinations.push(targetSquare)
                } else if(this.getPieceOnSquare(targetSquare.row, targetSquare.column, grid).color === oppositeColor) {
                    possibleDestinations.push(targetSquare)
                    break;
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        //bottom left
        for(let i = 1; i < 8; i++) {
            let targetSquare = this.getSquare(row + i, col - i)
            if(this.inBounds(targetSquare)) {
                if(this.getPieceOnSquare(targetSquare.row, targetSquare.column, grid).type === ChessPieceEnum.Empty) {
                    possibleDestinations.push(targetSquare)
                } else if(this.getPieceOnSquare(targetSquare.row, targetSquare.column, grid).color === oppositeColor) {
                    possibleDestinations.push(targetSquare)
                    break;
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        return possibleDestinations
    }

    possibleRookMoves = (square : Square, color: ChessColors, grid: ChessPieceModel[][]) => {
        let row = square.row
        let col = square.column
        
        let possibleDestinations = [] as Square[]

        let oppositeColor = (color === ChessColors.Black) ? ChessColors.White : ChessColors.Black

        //left
        for(let i = 1; i < 8; i++) {
            let targetSquare = this.getSquare(row, col - i)
            if(this.inBounds(targetSquare)) {
                if(this.getPieceOnSquare(targetSquare.row, targetSquare.column, grid).type === ChessPieceEnum.Empty) {
                    possibleDestinations.push(targetSquare)
                } else if(this.getPieceOnSquare(targetSquare.row, targetSquare.column, grid).color === oppositeColor) {
                    possibleDestinations.push(targetSquare)
                    break;
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        //right
        for(let i = 1; i < 8; i++) {
            let targetSquare = this.getSquare(row, col + i)
            if(this.inBounds(targetSquare)) {
                if(this.getPieceOnSquare(targetSquare.row, targetSquare.column, grid).type === ChessPieceEnum.Empty) {
                    possibleDestinations.push(targetSquare)
                } else if(this.getPieceOnSquare(targetSquare.row, targetSquare.column, grid).color === oppositeColor) {
                    possibleDestinations.push(targetSquare)
                    break;
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        //top
        for(let i = 1; i < 8; i++) {
            let targetSquare = this.getSquare(row - i, col)
            if(this.inBounds(targetSquare)) {
                if(this.getPieceOnSquare(targetSquare.row, targetSquare.column, grid).type === ChessPieceEnum.Empty) {
                    possibleDestinations.push(targetSquare)
                } else if(this.getPieceOnSquare(targetSquare.row, targetSquare.column, grid).color === oppositeColor) {
                    possibleDestinations.push(targetSquare)
                    break;
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        //bottom
        for(let i = 1; i < 8; i++) {
            let targetSquare = this.getSquare(row + i, col)
            if(this.inBounds(targetSquare)) {
                if(this.getPieceOnSquare(targetSquare.row, targetSquare.column, grid).type === ChessPieceEnum.Empty) {
                    possibleDestinations.push(targetSquare)
                } else if(this.getPieceOnSquare(targetSquare.row, targetSquare.column, grid).color === oppositeColor) {
                    possibleDestinations.push(targetSquare)
                    break;
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        return possibleDestinations
    }

    possibleQueenMoves = (square: Square, color: ChessColors, grid: ChessPieceModel[][]) => {
        return this.possibleBishopMoves(square, color, grid).concat(this.possibleRookMoves(square, color, grid))
    }

    inBounds  = (square: Square) => {
        return ((square.column >= 0 && square.column <= 7) && (square.row >= 0 && square.row <= 7))
    }

    anyKingInCheckAfterMove = (move: Move) => {
        let nextMoveGrid : ChessPieceModel[][]

        nextMoveGrid = this.state.Grid.map(item => ({...item}))

        let movedPiece = nextMoveGrid[move.from.row][move.from.column]
        nextMoveGrid[move.from.row][move.from.column] = EmptySpace
        nextMoveGrid[move.to.row][move.to.column] = movedPiece

        console.log(nextMoveGrid)

        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                
                let piece = nextMoveGrid[i][j]
                let opposite = (this.state.PlayersTurn === ChessColors.White) ? ChessColors.Black : ChessColors.White

                if(piece.color === opposite) {
                    let possibleMoves = this.getPossibleMovesForSquare(this.getSquare(i, j), piece, nextMoveGrid)     
                            
                    for(let k = 0; k < possibleMoves.length; k++) {
                        let possibleMove = possibleMoves[k]
                        if(nextMoveGrid[possibleMove.row][possibleMove.column].type === ChessPieceEnum.King && nextMoveGrid[possibleMove.row][possibleMove.column].color === this.state.PlayersTurn) {
                            return true;
                        }
                    }
                }

            }
        }

        return false;
    }


    initializeChessBoard = () => {
        let grid : ChessPieceModel[][]
        grid = [
            [BlackRook, BlackKnight, BlackBishop, BlackQueen, BlackKing, BlackBishop, BlackKnight, BlackRook],
            [BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn],
            [EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace],
            [BlackQueen, EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace],
            [EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace],
            [EmptySpace, WhiteQueen, EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace],
            [WhiteBishop, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn],
            [WhiteRook, WhiteKnight, WhiteBishop, WhiteQueen, WhiteKing, WhiteBishop, WhiteKnight, WhiteRook],
        ]

        return grid;
    }
}

export default ChessGame;