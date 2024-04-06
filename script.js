document.addEventListener('DOMContentLoaded', () => {
      const board = document.getElementById('board');
      const message = document.getElementById('message');
      const modeToggle = document.getElementById('modeToggle');
      const cells = [];

      let currentPlayer = 'X';
      let gameBoard = ['', '', '', '', '', '', '', '', ''];
      let gameOver = false;
      let isAgainstAI = true;

      // Create cells
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
        cells.push(cell);
      }

      // Handle cell click
      function handleCellClick(index) {
        if (gameBoard[index] === '' && !gameOver) {
          gameBoard[index] = currentPlayer;
          cells[index].textContent = currentPlayer;
          if (checkWinner()) {
            gameOver = true;
            message.textContent = `${currentPlayer} wins!`;
          } else if (gameBoard.every(cell => cell !== '')) {
            gameOver = true;
            message.textContent = 'It\'s a draw!';
          } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = isAgainstAI ? `${currentPlayer}'s turn (Play with AI)` : `${currentPlayer === 'X' ? 'Player 1' : 'Player 2'}'s turn (Play with Opponent)`;

            if (isAgainstAI && currentPlayer === 'O' && !gameOver) {
              setTimeout(() => {
                makeAIMove();
              }, 500);
            }
          }
        }
      }

      // Check for a winner
      function checkWinner() {
        const winPatterns = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
          [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
          [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
          const [a, b, c] = pattern;
          if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            highlightWinner(pattern);
            return true;
          }
        }

        return false;
      }

      // Highlight the winning cells
      function highlightWinner(pattern) {
        for (const index of pattern) {
          cells[index].style.backgroundColor = '#66ff66';
        }
      }

      // AI makes a move
      function makeAIMove() {
        const emptyCells = gameBoard.reduce((acc, value, index) => {
          if (value === '') {
            acc.push(index);
          }
          return acc;
        }, []);

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const aiMove = emptyCells[randomIndex];

        handleCellClick(aiMove);
      }

      // Toggle between AI and Human mode
      modeToggle.addEventListener('click', () => {
        isAgainstAI = !isAgainstAI;
        resetGame();
      });

      // Reset the game
      function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameOver = false;
        currentPlayer = 'X';

        cells.forEach(cell => {
          cell.textContent = '';
          cell.style.backgroundColor = '';
        });

        message.textContent = isAgainstAI ? 'Your turn! (Play with AI)' : 'Player 1\'s turn (Play with Opponent)';
      }
    });
