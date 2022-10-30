import { ChessPieceModel } from "./ChessPiece";
import { Square } from "./Square";

export interface Move {
    piece: ChessPieceModel;
    from: Square;
    to: Square;
    promotedTo: ChessPieceModel;
    pieceTaken: ChessPieceModel;
}