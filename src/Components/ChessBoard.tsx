import React, { Component } from "react";
import { ChessColors, ChessPieceModel } from "../Models/ChessPiece";
import ChessSquare from "./ChessSquare";
import '../Styles/ChessBoard.scss';
import { Square } from "../Models/Square";
import { Move } from "../Models/Move";


interface State {
}

interface ChessBoardProps {
    PlayersTurn: ChessColors
    grid: ChessPieceModel[][]
    SelectPiece: (square: Square) => void;
    SelectedSquare: Square;
    SelectedPiece: ChessPieceModel;
    PossibleDestinations: Square[];
    MakeMove: (move: Move) => void;
}

class ChessBoard extends Component<ChessBoardProps, State> {   

    constructor(props: ChessBoardProps) {
        super(props);

        this.state = {
        }
    }

    render() {
        let white = false;

        return(
            <div className="ChessBoard">
                {this.props.grid.map((row, rowIndex) => {
                    white = !white;
                    return (
                    <div key={rowIndex} className="BoardRow">
                        {row.map((item, column) => {
                            white = !white;
                            let square = {
                                row: rowIndex,
                                column: column
                            } as Square
                            let possible = (this.props.PossibleDestinations.filter(e => e.row === rowIndex && e.column === column).length > 0)
                            let selected = (this.props.SelectedSquare.column === column) && (this.props.SelectedSquare.row === rowIndex)
                            return (
                                <ChessSquare SelectedPiece={this.props.SelectedPiece} MakeMove={this.props.MakeMove} key={7*rowIndex+column} IsSelected={selected} SelectedSquare={this.props.SelectedSquare} PossibleMove={possible} SelectPiece={this.props.SelectPiece} Square={square} Color={white ? ChessColors.White  : ChessColors.Black} Piece={item} Text={(rowIndex + " - " + column) as string}/>
                            );
                        })}
                    </div>
                    );
                })}
            </div>
        )
    }

    


}

export default ChessBoard;