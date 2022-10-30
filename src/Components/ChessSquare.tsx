import React, { Component } from "react";
import { ChessColors, ChessPieceModel, ChessPieceEnum } from "../Models/ChessPiece";
import { Square } from "../Models/Square";
import '../Styles/ChessSquare.scss';
import ChessPiece from "./ChessPiece";


interface State {

}

interface ChessSquareProps {
    Square: Square;
    Color: ChessColors;
    Piece: ChessPieceModel;
    Text: Number;
    SelectPiece: (square: Square) => void;
    PossibleMove: Boolean
    SelectedSquare: Boolean
}

class ChessSquare extends Component<ChessSquareProps, State> {   

    constructor(props: ChessSquareProps) {
        super(props);

        this.state = {

        }
    }

    render() {
        if(this.props.Piece.type === ChessPieceEnum.Empty) {
            return(
                <div onClick={() => this.props.SelectPiece(this.props.Square)} className={"ChessSquare " + ((this.props.Color === ChessColors.White) ? " BlackSquare" : " WhiteSquare") 
                + ((this.props.PossibleMove) ? " PossibleMove" : "") + ((this.props.SelectedSquare) ? " SelectedSquare" : "" )}>
                    {"" + this.props.Text}
                </div>
            )
        } else {
            return(
                <div onClick={() => this.props.SelectPiece(this.props.Square)} className={"ChessSquare" + ((this.props.Color === ChessColors.White) ? " BlackSquare" : " WhiteSquare") 
                + ((this.props.PossibleMove) ? " PossibleMove" : "") + ((this.props.SelectedSquare) ? " SelectedSquare" : "" )}>
                    {"" + this.props.Text}
                    <ChessPiece Square={this.props.Square} Piece={this.props.Piece} />
                </div>
            )
        }
    }
}

export default ChessSquare;