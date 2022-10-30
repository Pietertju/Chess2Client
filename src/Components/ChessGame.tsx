import React, { Component } from "react";
import { ChessColors, ChessPieceEnum, ChessPieceModel } from "../Models/ChessPiece";
import { BlackPawn, BlackRook, BlackKnight, BlackBishop, BlackQueen, BlackKing, EmptySpace, WhitePawn, WhiteRook, WhiteKnight, WhiteBishop, WhiteQueen, WhiteKing } from "../Models/ChessPieces";
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

    getPiece = (square: Square) => {
        let piece = this.state.Grid[square.row][square.column] as ChessPieceModel
        return piece;
    }

    getPieceOnSquare = (row: Number, col: Number) => {
        return this.getPiece(this.getSquare(row, col)) as ChessPieceModel
    }

    showPossibleMoves = (square: Square) => {
        let possibleDestinations = [] as Square[]

        if(square.row >= 0 && square.column >= 0) {
            let selectedPiece = this.state.Grid[square.row][square.column] as ChessPieceModel

            if(selectedPiece.type !== ChessPieceEnum.Empty) {   
                if(selectedPiece.color === this.state.PlayersTurn) {
                    switch(selectedPiece.type) {

                        case(ChessPieceEnum.Pawn):
                            possibleDestinations = this.possiblePawnMoves(square, selectedPiece.color)                               
                            break;

                        case(ChessPieceEnum.Knight):
                            possibleDestinations =  this.possibleKnightMoves(square)
                            break;

                    }                   
                }
            }
        } 

        this.setState({
            PossibleDestinations: possibleDestinations
        })
    }

    possiblePawnMoves = (square: Square, color: ChessColors) => {
        let possibleDestinations = [] as Square[]
        let direction = (color === ChessColors.Black) ? -1 : 1

        if(this.getPieceOnSquare(square.row - (1*direction), square.column).type === ChessPieceEnum.Empty) {
            possibleDestinations.push(this.getSquare(square.row - (1*direction), square.column))
        }
        if(square.row === 6) {
            if(this.getPieceOnSquare(square.row - (2*direction), square.column).type === ChessPieceEnum.Empty) {
                possibleDestinations.push(this.getSquare(square.row - (2*direction), square.column))
            }
        }

        return possibleDestinations
    }

    possibleKnightMoves = (square : Square) => {
        let row = square.row
        let col = square.column
        let possibleDestinations = [
            this.getSquare(row + 2, col + 1), this.getSquare(row + 2, col - 1), this.getSquare(row - 2, col + 1), this.getSquare(row - 2, col - 1),
            this.getSquare(row + 1, col + 2), this.getSquare(row - 1, col + 2), this.getSquare(row + 1, col - 2), this.getSquare(row - 1, col - 2)
        ] as Square[]

        let oppositeColor = (this.state.PlayersTurn === ChessColors.Black) ? ChessColors.White : ChessColors.Black
        
        possibleDestinations.filter(s => (s.column >= 0 && s.column <= 7) && (s.row >= 0 && s.row <= 7) 
        && (this.getPieceOnSquare(s.row, s.column).type === ChessPieceEnum.Empty || this.getPieceOnSquare(s.row, s.column).color === oppositeColor))

        return possibleDestinations
    }



    initializeChessBoard = () => {
        let grid : ChessPieceModel[][]
        grid = [
            [BlackRook, BlackKnight, BlackBishop, BlackQueen, BlackKing, BlackBishop, BlackKnight, BlackRook],
            [BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn, BlackPawn],
            [EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace],
            [EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace],
            [EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace],
            [EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace, EmptySpace],
            [WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn, WhitePawn],
            [WhiteRook, WhiteKnight, WhiteBishop, WhiteQueen, WhiteKing, WhiteBishop, WhiteKnight, WhiteRook],
        ]

        return grid;
    }
}

export default ChessGame;