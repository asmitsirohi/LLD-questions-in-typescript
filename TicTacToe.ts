/**
 * Design a Tic-Tac-Toe game where two players can take turns, validate moves, determine the winner, and prevent invalid moves. Implement the solution in Node.js + TypeScript using OOP principles.
 
 *Approach
    We’ll:
    1) Model entities as classes (Player, Board, Game).
    2) Use enums for game states and cell values.
    3) Store everything in-memory.
    4) Focus on clean, extensible design — could later add AI, multiple boards, etc.
 */

enum CellValue {
  EMPTY = "",
  X = "X",
  O = "O",
}

enum GameStatus {
  ONGOING = "ONGOING",
  DRAW = "DRAW",
  WINNER = "WINNER",
}

class Player {
  name: string;
  symbol: CellValue;

  constructor(name: string, symbol: CellValue) {
    this.name = name;
    this.symbol = symbol;
  }
}

class Board {
  size: number;
  grid: CellValue[][];

  constructor(size: number = 3) {
    this.size = size;
    this.grid = [];
    for (let i = 0; i < size; i++) {
      this.grid.push(new Array(size).fill(CellValue.EMPTY));
    }
  }

  printBoard() {
    console.log(this.grid);
  }

  makeMove(row: number, col: number, symbol: CellValue) {
    if (row < 0 || row >= this.size || col < 0 || col >= this.size) {
      return { ok: false, reason: "Out of bounds!" };
    }

    if (this.grid[row][col] != CellValue.EMPTY) {
      return { ok: false, reason: "Cell already occupied" };
    }

    this.grid[row][col] = symbol;
    return { ok: true };
  }

  isFull() {
    return this.grid.every((row) =>
      row.every((cell) => cell != CellValue.EMPTY)
    );
  }
}

class Game {
  board: Board;
  players: Player[];
  currentPlayerIndex: number;
  status: GameStatus;
  winner: Player | null;

  constructor(player1: Player, player2: Player, boardSize: number = 3) {
    this.board = new Board(boardSize);
    this.players = [player1, player2];
    this.currentPlayerIndex = 0;
    this.status = GameStatus.ONGOING;
    this.winner = null;
  }

  playMove(row: number, col: number) {
    if (this.status !== GameStatus.ONGOING) {
      console.log("Game is over");
    }

    const player = this.players[this.currentPlayerIndex];
    const success = this.board.makeMove(row, col, player.symbol);

    if (!success) {
      console.log("Invalid move! Try again");
      return;
    }

    this.board.printBoard();

    if (this.checkWin(player.symbol)) {
      this.status = GameStatus.WINNER;
      this.winner = player;
      console.log(`${player.name} wins!`);
      return;
    }

    if (this.board.isFull()) {
      this.status = GameStatus.DRAW;
      console.log("Game is draw!");
      return;
    }

    // switch player
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
  }

  checkWin(symbol: CellValue) {
    const n = this.board.size;
    const grid = this.board.grid;

    for (let i = 0; i < n; i++) {
      if (grid[i].every((cell) => cell === symbol)) return true;
      if (grid.every((row) => row[i] === symbol)) return true;
    }

    // check diagonls
    if (grid.every((row, idx) => row[idx] === symbol)) return true;
    if (grid.every((row, idx) => row[n - 1 - idx] === symbol)) return true;

    return false;
  }
}

const p1 = new Player("Rahul", CellValue.O);
const p2 = new Player("Virat", CellValue.X);

const game = new Game(p1, p2);

game.playMove(0, 0); // rahul
game.playMove(0, 1); // virat
game.playMove(1, 1); // rahul
game.playMove(0, 2); // virat
game.playMove(2, 2); // Rahul wins
