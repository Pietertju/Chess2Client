import React, { Component } from "react";
import { ChessColors, ChessPieceModel } from "../Models/ChessPiece";
import ChessSquare from "./ChessSquare";
import '../Styles/ChessBoard.scss';
import { Square } from "../Models/Square";


interface State {
}

interface ChessBoardProps {
    PlayersTurn: ChessColors
    grid: ChessPieceModel[][]
    SelectPiece: (square: Square) => void;
    SelectedSquare: Square;
    PossibleDestinations: Square[]
}

class ChessBoard extends Component<ChessBoardProps, State> {   

    constructor(props: ChessBoardProps) {
        super(props);

        this.state = {
        }
    }

    render() {
        let white = false;
        let text = 1;
        return(
            <div className="ChessBoard">
                {this.props.grid.map((row, rowIndex) => {
                    white = !white;
                    return (
                    <div className="BoardRow">
                        {row.map((item, column) => {
                            white = !white;
                            let square = {
                                row: rowIndex,
                                column: column
                            } as Square
                            let possible = (this.props.PossibleDestinations.filter(e => e.row === rowIndex && e.column === column).length > 0)
                            let selected = (this.props.SelectedSquare.column === column) && (this.props.SelectedSquare.row === rowIndex)
                            return (
                                <ChessSquare SelectedSquare={selected}PossibleMove={possible} SelectPiece={this.props.SelectPiece} Square={square} Color={white ? ChessColors.White  : ChessColors.Black} Piece={item} Text={text++}/>
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