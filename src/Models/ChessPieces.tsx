import { ChessColors, ChessPieceModel, ChessPieceEnum } from "./ChessPiece";

export const BlackPawn = () => {
    return {
        type: ChessPieceEnum.Pawn,
        color: ChessColors.Black
    } as ChessPieceModel
} 

export const WhitePawn = () => {
    return {
        type: ChessPieceEnum.Pawn,
        color: ChessColors.White
    } as ChessPieceModel
} 

export const BlackKnight = () => {
    return {
        type: ChessPieceEnum.Knight,
        color: ChessColors.Black
    } as ChessPieceModel
} 

export const WhiteKnight = () => {
    return {
        type: ChessPieceEnum.Knight,
        color: ChessColors.White
    } as ChessPieceModel
} 

export const BlackBishop = () => {
    return {
        type: ChessPieceEnum.Bishop,
        color: ChessColors.Black
    } as ChessPieceModel
} 

export const WhiteBishop = () => {
    return {
        type: ChessPieceEnum.Bishop,
        color: ChessColors.White
    } as ChessPieceModel
} 

export const BlackRook = () => {
    return {
        type: ChessPieceEnum.Rook,
        color: ChessColors.Black
    } as ChessPieceModel
} 

export const WhiteRook = () => {
    return {
        type: ChessPieceEnum.Rook,
        color: ChessColors.White
    } as ChessPieceModel
} 

export const BlackQueen = () => {
    return {
        type: ChessPieceEnum.Queen,
        color: ChessColors.Black
    } as ChessPieceModel
} 

export const WhiteQueen = () => {
    return {
        type: ChessPieceEnum.Queen,
        color: ChessColors.White
    } as ChessPieceModel
} 

export const BlackKing = () => {
    return {
        type: ChessPieceEnum.King,
        color: ChessColors.Black
    } as ChessPieceModel
} 

export const WhiteKing = () => {
    return {
        type: ChessPieceEnum.King,
        color: ChessColors.White
    } as ChessPieceModel
} 

export const EmptySpace = () => {
    return {
        type: ChessPieceEnum.Empty,
        color: ChessColors.Empty
    } as ChessPieceModel
}