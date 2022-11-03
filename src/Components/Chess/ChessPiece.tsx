import React, { Component } from "react";
import { ChessPieceModel } from "../../Models/ChessPiece";
import { Square } from "../../Models/Square";
import '../Styles/ChessPiece.scss';

interface State {
    
}

interface ChessPieceProps {
    Piece: ChessPieceModel
    Square: Square;
}

class ChessPiece extends Component<ChessPieceProps, State> {   

    constructor(props: ChessPieceProps) {
        super(props);

        this.state = {
       
        }
    }

    render() {
        return(
            <div className="ChessPiece">
                {this.props.Piece.color}
                {this.props.Piece.type}
            </div>
        )
    }
}

export default ChessPiece;