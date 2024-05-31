import { Component, OnInit } from '@angular/core';
import { PieceType, PieceColor } from 'src/constants';
import { ChessPiece } from '../chess-piece';
import { DataserviceService } from '../dataservice.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css']
})
export class ChessboardComponent implements OnInit{
  PieceType = PieceType; //PieceType enum
  board:ChessPiece[][] = [];
  selectedPiece: {row: number, col: number} | null = null;
  data:any;

  constructor(private dataservice: DataserviceService) {}

  ngOnInit(): void {
    this.dataservice.getData().subscribe({
      next: (data)=> {this.data = data;
        console.log('Data received', this.data);},
      error: (error) => {console.error(error)}
    }
    );
      //Initializing the chess board
      this.initializeBoard()
  }

  initializeBoard(): void {
    //defining empty square
    const emptySquare: ChessPiece = {type: PieceType.Empty, color: PieceColor.Empty};
    //Initialize chessboard with empty arrays for each row
    for (let i=0; i<8;i++){
      this.board[i] = [];
      for (let j=0;j<8;j++) {
        this.board[i][j] = {...emptySquare}; //Empty square
      }
    }

    //Initializing pawns
    for (let i=0; i< 8; i++) {
      this.board[1][i] = {type: PieceType.Pawn, color: PieceColor.Black};
      this.board[6][i] = {type: PieceType.Pawn, color: PieceColor.White};
    }

    //Initializing other pieces
    const backRow: ChessPiece[] = [
      {type: PieceType.Rook, color: PieceColor.Black},
      {type: PieceType.Knight, color: PieceColor.Black},
      {type: PieceType.Bishop, color: PieceColor.Black},
      {type: PieceType.Queen, color: PieceColor.Black},
      {type: PieceType.King, color: PieceColor.Black},
      {type: PieceType.Bishop, color: PieceColor.Black},
      {type: PieceType.Knight, color: PieceColor.Black},
      {type: PieceType.Rook, color: PieceColor.Black},
    ];

    for (let i =0; i<8; i++) {
      this.board[0][i] = backRow[i];
      this.board[7][i] = {...backRow[i], color: PieceColor.White}
    }
  }

  drop(event: CdkDragDrop<ChessPiece[]>, toRow: number, toCol: number): void {
    if (!event.isPointerOverContainer) {
      return;
    }
    const fromRow = event.previousIndex;
    const fromCol = this.board[fromRow].indexOf(event.item.data);

    // Perform the move
    this.board[toRow][toCol] = this.board[fromRow][fromCol];
    this.board[fromRow][fromCol] = {type: PieceType.Empty, color: PieceColor.Empty};

    this.board = [...this.board];
  }
}
