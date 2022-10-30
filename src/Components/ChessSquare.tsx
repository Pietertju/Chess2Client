import React, { Component } from "react";
import { ChessColors, ChessPieceModel, ChessPieceEnum } from "../Models/ChessPiece";
import { Move } from "../Models/Move";
import { Square } from "../Models/Square";
import '../Styles/ChessSquare.scss';
import ChessPiece from "./ChessPiece";


interface State {

}

interface ChessSquareProps {
    Square: Square;
    Color: ChessColors;
    Piece: ChessPieceModel;
    Text: String;
    SelectPiece: (square: Square) => void;
    MakeMove: (move: Move) => void;
    PossibleMove: Boolean
    IsSelected: Boolean
    SelectedSquare: Square
}

class ChessSquare extends Component<ChessSquareProps, State> {   

    constructor(props: ChessSquareProps) {
        super(props);

        this.state = {

        }
    }

    ClickSquare = () => {
        if(this.props.PossibleMove) {
            let move = {
                from: this.props.SelectedSquare,
                to: this.props.Square
            }

            this.props.MakeMove(move)
        } else {
            this.props.SelectPiece(this.props.Square)
        }
    }

    render() {
        if(this.props.Piece.type === ChessPieceEnum.Empty) {
            return(
                <div onClick={this.ClickSquare} className={"ChessSquare " + ((this.props.Color === ChessColors.White) ? " BlackSquare" : " WhiteSquare") 
                + ((this.props.PossibleMove) ? " PossibleMove" : "") + ((this.props.IsSelected) ? " SelectedSquare" : "" )}>
                    {"" + this.props.Text}
                </div>
            )
        } else {
            return(
                <div onClick={this.ClickSquare} className={"ChessSquare" + ((this.props.Color === ChessColors.White) ? " BlackSquare" : " WhiteSquare") 
                + ((this.props.PossibleMove) ? " PossibleMove" : "") + ((this.props.IsSelected) ? " SelectedSquare" : "" )}>
                    {"" + this.props.Text}
                    <ChessPiece Square={this.props.Square} Piece={this.props.Piece} />
                </div>
            )
        }
    }
}

export default ChessSquare;