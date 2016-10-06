var compIcon = "";
var userIcon = "";
var plays = 0;
var emptyCount = 0;
var gameOver = false;
var cells = [[-1, -1, -1],[-1, -1, -1],[-1, -1, -1]];

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

var chkEmpty = function(cell) {
  if (cell.html() !== "") {
    setStatus("Cell not empty!", "#ff7f7f");
    return false;
  }

  return true;
}

var getCell = function(i, j) {
  if ((i === 0) && (j === 0)) return $("#cell_00");
  if ((i === 0) && (j === 1)) return $("#cell_01");
  if ((i === 0) && (j === 2)) return $("#cell_02");
  if ((i === 1) && (j === 0)) return $("#cell_10");
  if ((i === 1) && (j === 1)) return $("#cell_11");
  if ((i === 1) && (j === 2)) return $("#cell_12");
  if ((i === 2) && (j === 0)) return $("#cell_20");
  if ((i === 2) && (j === 1)) return $("#cell_21");
  if ((i === 2) && (j === 2)) return $("#cell_22");
}

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

var setStatus = function(msg, color) {
  $("#statusBar").css("background-color",color);
  $("#statusBar").html(msg);
  $("#statusBar").show(0).delay(500).hide(0).delay(100).show(0).delay(500).hide(0).delay(100).show(0).delay(500).hide(0);
}

var setStatusAndClear = function(msg, color) {
  $("#statusBar").css("background-color",color);
  $("#statusBar").html(msg);
  $("#statusBar").show(0).delay(500).hide(0).delay(100).show(0).delay(500).hide(0).delay(100).show(0).delay(500).hide(0, clearBoard);
}

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

var chkAgain = function() {
  $("#playAgain").delay(2000).fadeIn(500);
  $("#board").delay(2000).fadeOut(500);

  $("#No").on("click", function() {
    $("#msg").html("OK.  Come again another time.");
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

var myMove = function() {
  var turn = plays + 1;
  var i, k, heuristic = -10000, utility, best = 0, worst, tmp;
  var player = (turn & 1) ? 'X' : 'O';
  var opponent = (turn & 1) ? 'O' : 'X';
  var board = [];

  console.log("player: " + player)
  console.log("opponent: " + opponent)

  if (!gameOver) {
    // Fill linear array "board" from displayed board to use for calculating best move
    if (turn === 1) {
      best = 0;
    } else {
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

