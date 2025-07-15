 const boardElement = document.getElementById('board');
    let board = [];

    for (let row = 0; row < 9; row++) {
      board[row] = [];
      for (let col = 0; col < 9; col++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = 1;
        input.max = 9;
        input.className = 'cell';
        boardElement.appendChild(input);
        board[row][col] = input;
      }
    }

    function getBoard() {
      let grid = [];
      for (let i = 0; i < 9; i++) {
        grid[i] = [];
        for (let j = 0; j < 9; j++) {
          const val = board[i][j].value;
          grid[i][j] = val === '' ? 0 : parseInt(val);
        }
      }
      return grid;
    }

    function setBoard(grid) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          board[i][j].value = grid[i][j];
        }
      }
    }

    function isValid(board, row, col, num) {
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
        const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const boxCol = 3 * Math.floor(col / 3) + i % 3;
        if (board[boxRow][boxCol] === num) return false;
      }
      return true;
    }

    function solve(grid) {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] === 0) {
            for (let num = 1; num <= 9; num++) {
              if (isValid(grid, row, col, num)) {
                grid[row][col] = num;
                if (solve(grid)) return true;
                grid[row][col] = 0;
              }
            }
            return false;
          }
        }
      }
      return true;
    }

    function solveSudoku() {
      const grid = getBoard();
      if (solve(grid)) {
        setBoard(grid);
      } else {
        alert("❌ No solution found!");
      }
    }
