export enum ChessColors {
    White = "White ",
    Black = "Black ",
    Empty = "Empty "
}

export enum ChessPieceEnum {
    Pawn = "P",
    Bishop = "B",
    Knight = "N",
    Rook = "R",
    Queen = "Q",
    King = "K",
    Empty = ""
}

export interface ChessPieceModel {
    type: ChessPieceEnum
    color: ChessColors
}
