import React, { Component } from "react";
import { ChessColors, ChessPieceEnum, ChessPieceModel } from "../Models/ChessPiece";
import { BlackPawn, BlackRook, BlackKnight, BlackBishop, BlackQueen, BlackKing, EmptySpace, WhitePawn, WhiteRook, WhiteKnight, WhiteBishop, WhiteQueen, WhiteKing } from "../Models/ChessPieces";
import { Move } from "../Models/Move";
import { Square } from "../Models/Square";
import ChessBoard from "./ChessBoard";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface State {
    PlayersTurn: ChessColors
    Grid: ChessPieceModel[][]
    SelectedSquare: Square
    PossibleDestinations: Square[]
    WhiteKingSideCastle: Boolean;
    WhiteQueenSideCastle: Boolean;
    BlackKingSideCastle: Boolean;
    BlackQueenSideCastle: Boolean;
    PreviousMove: Move;
    PromotionModal: Boolean;
}

interface ChessGameProps {
    
}

class ChessGame extends Component<ChessGameProps, State> {   

    constructor(props: ChessGameProps) {
        super(props);

        let DefaultSquare = {
            row: -1,
            column: -1
        } as Square

        let DefaultPiece = {
            type: ChessPieceEnum.Empty,
            color: ChessColors.Empty
        } as ChessPieceModel

        let defaultMove = {
            piece: DefaultPiece,
            to: DefaultSquare,
            from: DefaultSquare,
            promotedTo: DefaultPiece,
            pieceTaken: DefaultPiece
        }

        this.state = {
            PlayersTurn: ChessColors.White,
            Grid: this.initializeChessBoard() as ChessPieceModel[][],
            SelectedSquare: DefaultSquare,
            PossibleDestinations: [] as Square[],
            WhiteKingSideCastle: true,
            WhiteQueenSideCastle: true,
            BlackKingSideCastle: true,
            BlackQueenSideCastle: true,
            PreviousMove: defaultMove,
            PromotionModal: false
        }
    }

    render() {
        return(
            <div className="ChessGame">
                <ChessBoard SelectedPiece={(this.inBounds(this.state.SelectedSquare)) ? this.state.Grid[this.state.SelectedSquare.row][this.state.SelectedSquare.column] as ChessPieceModel : { type: ChessPieceEnum.Empty, color: ChessColors.Empty } as ChessPieceModel} MakeMove={this.MakeMove} PossibleDestinations={this.state.PossibleDestinations} SelectedSquare={this.state.SelectedSquare} SelectPiece={this.SelectPiece} PlayersTurn={this.state.PlayersTurn} grid={this.state.Grid} />
                <h1>Move: {this.state.PlayersTurn}</h1>

                <Modal show={this.state.PromotionModal as boolean} onHide={this.hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Promotion</Modal.Title>
                    </Modal.Header>
                <Modal.Body>Woohoo, you're promoting your pawn! To which piece do you want to promote</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => {this.hideModal(); this.promotePiece(ChessPieceEnum.Queen)}}>
                            Queen
                        </Button>
                        <Button variant="primary" onClick={() => {this.hideModal(); this.promotePiece(ChessPieceEnum.Rook)}}>
                            Rook
                        </Button>
                        <Button variant="primary" onClick={() => {this.hideModal(); this.promotePiece(ChessPieceEnum.Bishop)}}>
                            Bishop
                        </Button>
                        <Button variant="primary" onClick={() => {this.hideModal(); this.promotePiece(ChessPieceEnum.Knight)}}>
                            Knight
                        </Button>  
                    </Modal.Footer>
                </Modal>
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

    promotePiece = (piece: ChessPieceEnum) => {
        let copyOfGrid: ChessPieceModel[][]
        copyOfGrid = this.state.Grid.slice()

        copyOfGrid[this.state.PreviousMove.to.row][this.state.PreviousMove.to.column].type = piece

        let copyOfPreviousMove: Move
        copyOfPreviousMove = this.state.PreviousMove
        copyOfPreviousMove.promotedTo.type = piece

        this.setState({
            Grid: copyOfGrid
        })
    }

    MakeMove = (move: Move) => {
        if(this.state.PromotionModal) return;
        let copyOfGrid : ChessPieceModel[][]
        copyOfGrid = this.state.Grid.slice()

        let from = move.from
        let to = move.to

        let piece = copyOfGrid[from.row][from.column] as ChessPieceModel
        let color = this.state.PlayersTurn
        let oppositeColor = (color === ChessColors.White) ? ChessColors.Black : ChessColors.White
        
        let blackKingSideCastle = this.state.BlackKingSideCastle;
        let blackQueenSideCastle = this.state.BlackQueenSideCastle;
        let whiteKingSideCastle = this.state.WhiteKingSideCastle;
        let whiteQueenSideCastle = this.state.WhiteQueenSideCastle;

        let promotion = false;

        if(piece.type === ChessPieceEnum.Pawn) {
            if(from.column !== to.column) {
                if(copyOfGrid[to.row][to.column].type === ChessPieceEnum.Empty) {
                    copyOfGrid[from.row][to.column] = EmptySpace()
                }
            }
            if(to.row === 0 || to.row === 7) {
                promotion = true;
            }
        } else if(piece.type === ChessPieceEnum.King) {
            if(color === ChessColors.Black) {
                blackKingSideCastle = false
                blackQueenSideCastle = false

                if(to.column > from.column) {
                    if(to.column - from.column === 2) {
                        copyOfGrid[from.row][7] = EmptySpace()
                        copyOfGrid[from.row][5] = BlackRook()
                    }
                } else if(from.column > to.column) {
                    if(from.column - to.column === 2) {
                        copyOfGrid[from.row][0] = EmptySpace()
                        copyOfGrid[from.row][3] = BlackRook()
                    }
                }
            } else if(color === ChessColors.White) {
                whiteKingSideCastle = false;
                whiteQueenSideCastle = false;

                if(to.column > from.column) {
                    if(to.column - from.column === 2) {
                        copyOfGrid[from.row][7] = EmptySpace()
                        copyOfGrid[from.row][5] = WhiteRook()
                    }
                } else if(from.column > to.column) {
                    if(from.column - to.column === 2) {
                        copyOfGrid[from.row][0] = EmptySpace()
                        copyOfGrid[from.row][3] = WhiteRook()
                    }
                }
            }
            
        } else if(piece.type === ChessPieceEnum.Rook) {
            if(color === ChessColors.White) {
                if(from.column === 0) {
                    whiteQueenSideCastle = false;
                } else if(from.column === 7) {
                    whiteKingSideCastle = false;
                }
            } else if(color === ChessColors.Black) {
                if(from.column === 0) {
                    blackQueenSideCastle = false;
                } else if(from.column === 7) {
                    blackKingSideCastle = false;
                }
            }
        }

        copyOfGrid[from.row][from.column] = EmptySpace()
        copyOfGrid[to.row][to.column] = piece

        this.setState({
            PreviousMove: move,
            Grid: copyOfGrid,
            PlayersTurn: oppositeColor,
            BlackKingSideCastle: blackKingSideCastle,
            BlackQueenSideCastle: blackQueenSideCastle,
            WhiteKingSideCastle: whiteKingSideCastle,
            WhiteQueenSideCastle: whiteQueenSideCastle,
            PromotionModal: promotion
        })
        this.SelectPiece(this.state.SelectedSquare)
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

                        if(!this.kingInCheckAfterMove(possibleMove)) {
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
                possibleDestinations = this.possibleKnightMoves(square, selectedPiece.color, grid)
                break;

            case(ChessPieceEnum.Bishop):
                possibleDestinations = this.possibleBishopMoves(square, selectedPiece.color, grid)
                break;

            case(ChessPieceEnum.Rook):
                possibleDestinations = this.possibleRookMoves(square, selectedPiece.color, grid)
                break;

            case(ChessPieceEnum.Queen):
                possibleDestinations = this.possibleQueenMoves(square, selectedPiece.color, grid)
                break;
            
            case(ChessPieceEnum.King):
                possibleDestinations = this.possibleKingMoves(square, selectedPiece.color, grid)
                break;
        }       
        
        return possibleDestinations
    }

    possiblePawnMoves = (square: Square, color: ChessColors, grid: ChessPieceModel[][]) => {
        let possibleDestinations = [] as Square[]
        let direction = (color === ChessColors.Black) ? -1 : 1

        let oppositeColor = (color === ChessColors.White) ? ChessColors.Black : ChessColors.White

        let targetSquare1 = { row: square.row - (1*direction), column: square.column }
        if(this.inBounds(targetSquare1)) {
            if(this.getPieceOnSquare(targetSquare1.row, targetSquare1.column, grid).type === ChessPieceEnum.Empty) {
                possibleDestinations.push(this.getSquare(targetSquare1.row, targetSquare1.column))
                let targetSquare2 = { row: square.row - (2*direction), column: square.column }
                if(this.inBounds(targetSquare2)) {
                    if(square.row === 6 && color === ChessColors.White) {

                        if(this.getPieceOnSquare(targetSquare2.row, targetSquare2.column, grid).type === ChessPieceEnum.Empty) {
                            possibleDestinations.push(this.getSquare(targetSquare2.row, targetSquare2.column))
                        }
                    }

                    if(square.row === 1 && color === ChessColors.Black) {
                        if(this.getPieceOnSquare(targetSquare2.row, targetSquare2.column, grid).type === ChessPieceEnum.Empty) {
                            possibleDestinations.push(this.getSquare(targetSquare2.row, targetSquare2.column))
                        }
                    }
                }
            }
        }

        let targetSquare3 = { row: square.row - (1*direction), column: square.column - 1 }
        if(this.inBounds(targetSquare3)) {
            let possiblePiece = this.getPieceOnSquare(targetSquare3.row, targetSquare3.column, grid)
            if(possiblePiece.type !== ChessPieceEnum.Empty && possiblePiece.color === oppositeColor) {
                possibleDestinations.push(this.getSquare(targetSquare3.row, targetSquare3.column))
            }
        }

        let targetSquare4 = { row: square.row - (1*direction), column: square.column + 1 }
        if(this.inBounds(targetSquare4)) {
            let possiblePiece = this.getPieceOnSquare(targetSquare4.row, targetSquare4.column, grid)
            if(possiblePiece.type !== ChessPieceEnum.Empty && possiblePiece.color === oppositeColor) {
                possibleDestinations.push(this.getSquare(targetSquare4.row, targetSquare4.column))
            }
        }

        //add en passant
        if(color === ChessColors.White && square.row === 3) {
            let possibleTarget1 = this.getSquare(square.row, square.column - 1)
            let possibleTarget2 = this.getSquare(square.row, square.column + 1)
            if(this.inBounds(possibleTarget1)) {
                if(this.getPieceOnSquare(possibleTarget1.row, possibleTarget1.column, grid).type === ChessPieceEnum.Pawn && this.getPieceOnSquare(possibleTarget1.row, possibleTarget1.column, grid).color === oppositeColor) {
                    if(this.state.PreviousMove.from.column === possibleTarget1.column && this.state.PreviousMove.from.row === 1) {
                        possibleDestinations.push(this.getSquare(square.row - 1, square.column - 1))
                    }
                }
            }

            if(this.inBounds(possibleTarget2)) {
                if(this.getPieceOnSquare(possibleTarget2.row, possibleTarget2.column, grid).type === ChessPieceEnum.Pawn && this.getPieceOnSquare(possibleTarget2.row, possibleTarget2.column, grid).color === oppositeColor) {
                    if(this.state.PreviousMove.from.column === possibleTarget2.column && this.state.PreviousMove.from.row === 1) {
                        possibleDestinations.push(this.getSquare(square.row - 1, square.column + 1))
                    }
                }
            }
        } else if(color === ChessColors.Black && square.row === 4) {
            let possibleTarget1 = this.getSquare(square.row, square.column - 1)
            let possibleTarget2 = this.getSquare(square.row, square.column + 1)
            if(this.inBounds(possibleTarget1)) {
                if(this.getPieceOnSquare(possibleTarget1.row, possibleTarget1.column, grid).type === ChessPieceEnum.Pawn && this.getPieceOnSquare(possibleTarget1.row, possibleTarget1.column, grid).color === oppositeColor) {
                    if(this.state.PreviousMove.from.column === possibleTarget1.column && this.state.PreviousMove.from.row === 6) {
                        possibleDestinations.push(this.getSquare(square.row + 1, square.column - 1))
                    }
                }
            }

            if(this.inBounds(possibleTarget2)) {
                if(this.getPieceOnSquare(possibleTarget2.row, possibleTarget2.column, grid).type === ChessPieceEnum.Pawn && this.getPieceOnSquare(possibleTarget2.row, possibleTarget2.column, grid).color === oppositeColor) {
                    if(this.state.PreviousMove.from.column === possibleTarget2.column && this.state.PreviousMove.from.row === 6) {
                        possibleDestinations.push(this.getSquare(square.row + 1, square.column + 1))
                    }
                }
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

    possibleKingMoves =  (square: Square, color: ChessColors, grid: ChessPieceModel[][]) => {
        let row = square.row
        let col = square.column
        
        let possibleDestinations = [] as Square[]

        let oppositeColor = (color === ChessColors.Black) ? ChessColors.White : ChessColors.Black

        let potentialSquares = [
            this.getSquare(row-1, col-1),
            this.getSquare(row-1, col),
            this.getSquare(row-1, col+1),
            this.getSquare(row, col-1),
            this.getSquare(row, col+1),
            this.getSquare(row+1, col-1),
            this.getSquare(row+1, col),
            this.getSquare(row+1, col+1),
        ] as Square[]


        for(let i = 0; i < potentialSquares.length; i ++) {
            let target = potentialSquares[i]
            if(this.inBounds(target)) {
                if(this.getPieceOnSquare(target.row, target.column, grid).type === ChessPieceEnum.Empty || this.getPieceOnSquare(target.row, target.column, grid).color === oppositeColor) {
                    possibleDestinations.push(target)
                }
            }
        }

        //castle
        if(!this.currentlyInCheck(grid)) {
            if(color === ChessColors.Black) {
                if(this.state.BlackKingSideCastle) {
                    let freeSquare1 = this.getSquare(row, col + 1)
                    let freeSquare2 = this.getSquare(row, col + 2)
                    if(this.getPieceOnSquare(freeSquare1.row, freeSquare1.column, grid).type === ChessPieceEnum.Empty && this.getPieceOnSquare(freeSquare2.row, freeSquare2.column, grid).type === ChessPieceEnum.Empty) {
                        let checkMoveForCheck = {
                            from: square,
                            to: freeSquare2
                        } as Move

                        if(!this.kingInCheckAfterMove(checkMoveForCheck)) {
                            possibleDestinations.push(freeSquare2)                         
                        }
                    }
                }
                if(this.state.BlackQueenSideCastle) {
                    let freeSquare1 = this.getSquare(row, col - 1)
                    let freeSquare2 = this.getSquare(row, col - 2)
                    let freeSquare3 = this.getSquare(row, col - 3)
                    if(this.getPieceOnSquare(freeSquare1.row, freeSquare1.column, grid).type === ChessPieceEnum.Empty && this.getPieceOnSquare(freeSquare2.row, freeSquare2.column, grid).type === ChessPieceEnum.Empty && this.getPieceOnSquare(freeSquare3.row, freeSquare3.column, grid).type === ChessPieceEnum.Empty) {
                        let checkMoveForCheck = {
                            from: square,
                            to: freeSquare2
                        } as Move

                        if(!this.kingInCheckAfterMove(checkMoveForCheck)) {
                            possibleDestinations.push(freeSquare2)
                        }
                    }
                }
            } else if(color === ChessColors.White) {
                if(this.state.WhiteKingSideCastle) {
                    let freeSquare1 = this.getSquare(row, col + 1)
                    let freeSquare2 = this.getSquare(row, col + 2)
                    if(this.getPieceOnSquare(freeSquare1.row, freeSquare1.column, grid).type === ChessPieceEnum.Empty && this.getPieceOnSquare(freeSquare2.row, freeSquare2.column, grid).type === ChessPieceEnum.Empty) {
                        let checkMoveForCheck = {
                            from: square,
                            to: freeSquare2
                        } as Move

                        if(!this.kingInCheckAfterMove(checkMoveForCheck)) {
                            possibleDestinations.push(freeSquare2)
                        }
                    }
                }
                if(this.state.WhiteQueenSideCastle) {
                    let freeSquare1 = this.getSquare(row, col - 1)
                    let freeSquare2 = this.getSquare(row, col - 2)
                    let freeSquare3 = this.getSquare(row, col - 3)
                    if(this.getPieceOnSquare(freeSquare1.row, freeSquare1.column, grid).type === ChessPieceEnum.Empty && this.getPieceOnSquare(freeSquare2.row, freeSquare2.column, grid).type === ChessPieceEnum.Empty && this.getPieceOnSquare(freeSquare3.row, freeSquare3.column, grid).type === ChessPieceEnum.Empty) {
                        let checkMoveForCheck = {
                            from: square,
                            to: freeSquare2
                        } as Move
                 
                        if(!this.kingInCheckAfterMove(checkMoveForCheck)) {
                            possibleDestinations.push(freeSquare2)
                        }
                    }
                }
            }
        }
        
        return possibleDestinations;
    }

    inBounds  = (square: Square) => {
        return ((square.column >= 0 && square.column <= 7) && (square.row >= 0 && square.row <= 7))
    }

    kingInCheckAfterMove = (move: Move) => {
        let nextMoveGrid : ChessPieceModel[][]

        nextMoveGrid = this.state.Grid.map(item => ({...item}))

        let movedPiece = nextMoveGrid[move.from.row][move.from.column]
        nextMoveGrid[move.from.row][move.from.column] = EmptySpace()
        nextMoveGrid[move.to.row][move.to.column] = movedPiece

        return this.currentlyInCheck(nextMoveGrid)
    }

    currentlyInCheck = (grid: ChessPieceModel[][]) => {
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                
                let piece = grid[i][j]
                let opposite = (this.state.PlayersTurn === ChessColors.White) ? ChessColors.Black : ChessColors.White

                if(piece.color === opposite && piece.type !== ChessPieceEnum.King) {
                    let possibleMoves = this.getPossibleMovesForSquare(this.getSquare(i, j), piece, grid)     
                            
                    for(let k = 0; k < possibleMoves.length; k++) {
                        let possibleMove = possibleMoves[k]
                        if(grid[possibleMove.row][possibleMove.column].type === ChessPieceEnum.King && grid[possibleMove.row][possibleMove.column].color === this.state.PlayersTurn) {
                            return true;
                        }
                    }
                }

            }
        }

        return false;
    }

    hideModal = () =>  {
        this.setState({
            PromotionModal: false
        })
    }

    initializeChessBoard = () => {
        let grid : ChessPieceModel[][]
        grid = [
            [BlackRook(), BlackKnight(), BlackBishop(), BlackQueen(), BlackKing(), BlackBishop(), BlackKnight(), BlackRook()],
            [BlackPawn(), BlackPawn(), BlackPawn(), BlackPawn(), BlackPawn(), BlackPawn(), BlackPawn(), BlackPawn()],
            [EmptySpace(), EmptySpace(), EmptySpace(), EmptySpace(), EmptySpace(), EmptySpace(), EmptySpace(), EmptySpace()],
            [BlackQueen(), EmptySpace(), BlackPawn(), WhitePawn(), EmptySpace(), EmptySpace(), EmptySpace(), EmptySpace()],
            [EmptySpace(), EmptySpace(), EmptySpace(), EmptySpace(), EmptySpace(), WhitePawn(), BlackPawn(), EmptySpace()],
            [EmptySpace(), WhiteQueen(), BlackPawn(), EmptySpace(), EmptySpace(), EmptySpace(), EmptySpace(), EmptySpace()],
            [WhiteBishop(), WhitePawn(), WhitePawn(), WhitePawn(), WhitePawn(), WhitePawn(), WhitePawn(), WhitePawn()],
            [WhiteRook(), WhiteKnight(), WhiteKnight(), EmptySpace(), WhiteKing(), EmptySpace(), EmptySpace(), WhiteRook()],
        ]

        return grid;
    }
}

export default ChessGame;