var compIcon = "";
var userIcon = "";
var plays = 0;
var emptyCount = 0;
var gameOver = false;
var cells = [[-1, -1, -1],[-1, -1, -1],[-1, -1, -1]];

// I tried several methods of determining the best move for the computer before
// I finally selected this one.  Each of my earlier methods worked fine to a point,
// but then broke down into too many edge cases to be really workable.  This implimentation
// uses a heuristic method to determine the best play, looking ahead two moves (the
// computer's move and one player's move).  It is based on C code found at:
//
//     https://kartikkukreja.wordpress.com/2013/03/30/heuristic-function-for-tic-tac-toe/
//
// The author claims that this is unbeatable, and it may be.  I was unable to beat it,
// myself, but I was able to play it to a draw more often than I should have.  This
// was due to the fact that the strict heuristics had the computer move in the center
// if it went first, instead of taking a corner.  This left four out of eight moves for the
// human that could then be played to a draw.  By putting in a check for the first move and
// then playing in an of the four corners if so, it reduces the human's moves which allow
// playing to a draw from four to only one, thus incresing the computer's chance of a win
// instead of only a draw.

// Squares representing winning combinations
var win_comb = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
                    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

// Heuristic_Array[i][j] gives the utility value for player 'X' if some
// row, column or diagonal has i 'X' markers and j 'O' markers
// Similarly, it gives the utility value for player 'O' if some
// row, column or diagonal has i 'O' markers and j 'X' markers
var Heuristic_Array = [
    [     0,   -10,  -100, -1000 ],
    [    10,     0,     0,     0 ],
    [   100,     0,     0,     0 ],
    [ 1000,     0,     0,     0 ]];


// Clear the visible board of all moves and reset the cells to -1 (empty)
var clearBoard = function() {
  $("#cell_00").html("");
  $("#cell_01").html("");
  $("#cell_02").html("");
  $("#cell_10").html("");
  $("#cell_11").html("");
  $("#cell_12").html("");
  $("#cell_20").html("");
  $("#cell_21").html("");
  $("#cell_22").html("");
  $("#statusBar").html("");


  cells = [[-1, -1, -1],[-1, -1, -1],[-1, -1, -1]];
  emptyCount = 0;
  plays = 0;
}

// Set a status message and background color then blink the message three times.
var setStatus = function(msg, color) {
  $("#statusBar").css("background-color",color);
  $("#statusBar").html(msg);
  $("#statusBar").show(0).delay(500).hide(0).delay(100).show(0).delay(500).hide(0).delay(100).show(0).delay(500).hide(0);
}

// Set a status message and background color then blink the message three times and clear the board.
var setStatusAndClear = function(msg, color) {
  $("#statusBar").css("background-color",color);
  $("#statusBar").html(msg);
  $("#statusBar").show(0).delay(500).hide(0).delay(100).show(0).delay(500).hide(0).delay(100).show(0).delay(500).hide(0, clearBoard);
}

// Check if a cell is empty before allowing the human to play it.
var chkEmpty = function(cell) {
  if (cell.html() !== "") {
    setStatus("Cell not empty!", "#ff7f7f");
    return false;
  }

  return true;
}

// Set the value of each cell and determine the number of empty cells
// for use in checking for a win by either player.
var updStatus = function() {
  cells = [[-1, -1, -1],[-1, -1, -1],[-1, -1, -1]];
  emptyCount = 0;

  if ($("#cell_00").html() === userIcon) {
    cells[0][0] = 1;
  } else if ($("#cell_00").html() !== "") {
    cells[0][0] = 10;
  } else {
    emptyCount++;
  }

  if ($("#cell_01").html() === userIcon) {
    cells[0][1] = 1;
  } else if ($("#cell_01").html() !== "") {
    cells[0][1] = 10;
  } else {
    emptyCount++;
  }

  if ($("#cell_02").html() === userIcon) {
    cells[0][2] = 1;
  } else if ($("#cell_02").html() !== "") {
    cells[0][2] = 10;
  } else {
    emptyCount++;
  }

  if ($("#cell_10").html() === userIcon) {
    cells[1][0] = 1;
  } else if ($("#cell_10").html() !== "") {
    cells[1][0] = 10;
  } else {
    emptyCount++;
  }

  if ($("#cell_11").html() === userIcon) {
    cells[1][1] = 1;
  } else if ($("#cell_11").html() !== "") {
    cells[1][1] = 10;
  } else {
    emptyCount++;
  }

  if ($("#cell_12").html() === userIcon) {
    cells[1][2] = 1;
  } else if ($("#cell_12").html() !== "") {
    cells[1][2] = 10;
  } else {
    emptyCount++;
  }

  if ($("#cell_20").html() === userIcon) {
    cells[2][0] = 1;
  } else if ($("#cell_20").html() !== "") {
    cells[2][0] = 10;
  } else {
    emptyCount++;
  }

  if ($("#cell_21").html() === userIcon) {
    cells[2][1] = 1;
  } else if ($("#cell_21").html() !== "") {
    cells[2][1] = 10;
  } else {
    emptyCount++;
  }

  if ($("#cell_22").html() === userIcon) {
    cells[2][2] = 1;
  } else if ($("#cell_22").html() !== "") {
    cells[2][2] = 10;
  } else {
    emptyCount++;
  }
}

// Check for a win by either player.
var chkWin = function() {
  updStatus();
  
  for (let i = 0; i < 3; i++) {
    var testWin = 0;
    for (let j = 0; j < 3; j++) {
      testWin += cells[i][j];
    }

    if (testWin === 3) {
      setStatusAndClear("You win!", "#7fff7f");
      gameOver = true;
      return;
    }

    if (testWin === 30) {
      setStatusAndClear("I win!", "#cfcf00");
      gameOver = true;
      return;
    }
  }

  for (let j = 0; j < 3; j++) {
    var testWin = 0;
    for (let i = 0; i < 3; i++) {
      testWin += cells[i][j];
    }

    if (testWin === 3) {
      setStatusAndClear("You win!", "#7fff7f");
      gameOver = true;
      return;
    }

    if (testWin === 30) {
      setStatusAndClear("I win!", "#cfcf00");
      gameOver = true;
      return;
    }
  }

  if (cells[0][0] + cells[1][1] + cells[2][2] === 3) {
    setStatusAndClear("You win!", "#7fff7f");
    gameOver = true;
    return;
  }

  if (cells[0][0] + cells[1][1] + cells[2][2] === 30) {
    setStatusAndClear("I win!", "#cfcf00");
    gameOver = true;
    return;
  }

  if (cells[2][0] + cells[1][1] + cells[0][2] === 3) {
    setStatusAndClear("You win!", "#7fff7f");
    gameOver = true;
    return;
  }

  if (cells[2][0] + cells[1][1] + cells[0][2] === 30) {
    setStatusAndClear("I win!", "#cfcf00");
    gameOver = true;
    return;
  }

  if (emptyCount === 0){
    setStatusAndClear("The game is a draw.", "#7f7fff");
    gameOver = true;  
    return; 
  }
}

// Check if the human wants to play again
var chkAgain = function() {
  $("#playAgain").delay(2000).fadeIn(500);
  $("#board").delay(2000).fadeOut(500);

  $("#No").on("click", function() {
    $("#msg").html("OK.  Thank you for playing.  Come again another time.");
    $("#playAgain").fadeOut(500);
  });    

  $("#Yes").on("click", function() {
    $("#playerChoice").fadeIn(500);
    $("#playAgain").fadeOut(500);
  });

  gameOver = false;
}

// Returns the utility value of the given position for the given player
var evaluatePosition = function(board, p)    {
    var player, opponent, sum = 0, i, j, piece;

    for (i = 0; i < 8; i++)  {
        player = opponent = 0;
        for (j = 0; j < 3; j++)  {
            piece = board[win_comb[i][j]];
            if ((piece === 3 && p === 'X') || (piece === 5 && p === 'O'))
                player++;
            else if (piece != 2)
                opponent++;
        }
        sum += Heuristic_Array[player][opponent];
    }
    return sum;
}

// Let the computer determine its next move.  This is the heart of the program
var myMove = function() {
  var turn = plays + 1;
  var i, k, heuristic = -10000, utility, best = 0, worst, tmp;
  var player = (turn & 1) ? 'X' : 'O';
  var opponent = (turn & 1) ? 'O' : 'X';
  var board = [];


  if (!gameOver) {
    // Fill linear array "board" from displayed board to use for calculating best move
    for (i=0; i<9; i++) board[i] = 2;

    if ($("#cell_00").html() === '<img src="resources/X.png">') board[0] = 3;
    if ($("#cell_01").html() === '<img src="resources/X.png">') board[1] = 3;
    if ($("#cell_02").html() === '<img src="resources/X.png">') board[2] = 3;
    if ($("#cell_10").html() === '<img src="resources/X.png">') board[3] = 3;
    if ($("#cell_11").html() === '<img src="resources/X.png">') board[4] = 3;
    if ($("#cell_12").html() === '<img src="resources/X.png">') board[5] = 3;
    if ($("#cell_20").html() === '<img src="resources/X.png">') board[6] = 3;
    if ($("#cell_21").html() === '<img src="resources/X.png">') board[7] = 3;
    if ($("#cell_22").html() === '<img src="resources/X.png">') board[8] = 3;

    if ($("#cell_00").html() === '<img src="resources/O.png">') board[0] = 5;
    if ($("#cell_01").html() === '<img src="resources/O.png">') board[1] = 5;
    if ($("#cell_02").html() === '<img src="resources/O.png">') board[2] = 5;
    if ($("#cell_10").html() === '<img src="resources/O.png">') board[3] = 5;
    if ($("#cell_11").html() === '<img src="resources/O.png">') board[4] = 5;
    if ($("#cell_12").html() === '<img src="resources/O.png">') board[5] = 5;
    if ($("#cell_20").html() === '<img src="resources/O.png">') board[6] = 5;
    if ($("#cell_21").html() === '<img src="resources/O.png">') board[7] = 5;
    if ($("#cell_22").html() === '<img src="resources/O.png">') board[8] = 5;

    if (turn === 1) {
      // If moving first, ignore the heuristics and take a corner.  I pick a
      // corner randomly to mix it up a bit.

      var temp = Math.trunc((Math.random() * 4));

      switch(temp) {
        case 0: best = 0;break;
        case 1: best = 2;break;
        case 2: best = 6;break;
        case 3: best = 8;break;
      }

    } else {
      for(k = 0; k < 9; k++)  {
        if(board[k] === 2) { // found a blank square
          board[k] = (turn & 1) ? 3 : 5;  // try playing this move
          utility = evaluatePosition(board, player);

          worst = -10000;     // find the worst your opponent could do
          for (i = 0; i < 9; i++)  {
            if(board[i] === 2) { // simulate a move by opponent
              board[i] = (turn & 1) ? 5 : 3;
              tmp = evaluatePosition(board, opponent);
              if(tmp > worst)
                worst = tmp;
              board[i] = 2;
            }
          }

          // opponent had no legal move
          if(worst === -10000)
            worst = 0;

          utility -= worst;
          if(utility > heuristic) {
            heuristic = utility;
            best = k;
          }

          board[k] = 2;
        }
      }
    }

    plays++;

    // Place the selected play on the board and then check for a win.

    switch (best) {
      case 0: $("#cell_00").html(compIcon);break;
      case 1: $("#cell_01").html(compIcon);break;
      case 2: $("#cell_02").html(compIcon);break;
      case 3: $("#cell_10").html(compIcon);break;
      case 4: $("#cell_11").html(compIcon);break;
      case 5: $("#cell_12").html(compIcon);break;
      case 6: $("#cell_20").html(compIcon);break;
      case 7: $("#cell_21").html(compIcon);break;
      case 8: $("#cell_22").html(compIcon);break;
    }

    chkWin();
    if (gameOver) chkAgain();
  }

  return;
}

$(document).ready( function() {
  "use strict";

  // Let the player select "X", or "O"
  $("#playerChoice").fadeIn(500);

  $("#X").on("click", function() {
    userIcon = '<img src="resources/X.png">';
    compIcon = '<img src="resources/O.png">';
    $("#playerChoice").fadeOut(500);
    $("#board").fadeIn(500);
  });    

  $("#O").on("click", function() {
    userIcon = '<img src="resources/O.png">';
    compIcon = '<img src="resources/X.png">';
    $("#playerChoice").fadeOut(500);
    $("#board").fadeIn(500, myMove());
  });  

  // Wait for the human player to select a move.
  // Verifiy that the move is legal and check for a win if it is.
  // If the move is not legal (the cell is not empty), inform the player
  // and wait for another move.

  $("#cell_00").on("click", function() {
    if (chkEmpty($("#cell_00"))) {
      $("#cell_00").html(userIcon);
      chkWin();
      if (!gameOver) plays++;
      myMove();
      if (gameOver) chkAgain();
    }
  });

  $("#cell_01").on("click", function() {
    if (chkEmpty($("#cell_01"))) {
      $("#cell_01").html(userIcon);
      chkWin();
      if (!gameOver) plays++;
      myMove();
      if (gameOver) chkAgain();
    }
  });

  $("#cell_02").on("click", function() {
    if (chkEmpty($("#cell_02"))) {
      $("#cell_02").html(userIcon);
      chkWin();
      if (!gameOver) plays++;
      myMove();
      if (gameOver) chkAgain();
    }
  });

  $("#cell_10").on("click", function() {
    if (chkEmpty($("#cell_10"))) {
      $("#cell_10").html(userIcon);
      chkWin();
      if (!gameOver) plays++;
      myMove();
      if (gameOver) chkAgain();
    }
  });

  $("#cell_11").on("click", function() {
    if (chkEmpty($("#cell_11"))) {
      $("#cell_11").html(userIcon);
      chkWin();
      if (!gameOver) plays++;
      myMove();
      if (gameOver) chkAgain();
    }
  });

  $("#cell_12").on("click", function() {
    if (chkEmpty($("#cell_12"))) {
      $("#cell_12").html(userIcon);
      chkWin();
      if (!gameOver) plays++;
      myMove();
      if (gameOver) chkAgain();
    }
  });

  $("#cell_20").on("click", function() {
    if (chkEmpty($("#cell_20"))) {
      $("#cell_20").html(userIcon);
      chkWin();
      if (!gameOver) plays++;
      myMove();
      if (gameOver) chkAgain();
    }
  });

  $("#cell_21").on("click", function() {
    if (chkEmpty($("#cell_21"))) {
      $("#cell_21").html(userIcon);
      chkWin();
      if (!gameOver) plays++;
      myMove();
      if (gameOver) chkAgain();
    }
  });

  $("#cell_22").on("click", function() {
    if (chkEmpty($("#cell_22"))) {
      $("#cell_22").html(userIcon);
      chkWin();
      if (!gameOver) plays++;
      myMove();
      if (gameOver) chkAgain();
    }
  });
});

