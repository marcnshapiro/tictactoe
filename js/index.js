var compIcon = "";
var userIcon = "";
var player = "";
var plays = 0;
var emptyCount = 0;
var gameOver = false;
var cells = [[-1, -1, -1],[-1, -1, -1],[-1, -1, -1]];


var clearBoard = function() {
  $("#cell_11").html("")
  $("#cell_12").html("")
  $("#cell_13").html("")
  $("#cell_21").html("")
  $("#cell_22").html("")
  $("#cell_23").html("")
  $("#cell_31").html("")
  $("#cell_32").html("")
  $("#cell_33").html("")

  cells = [[-1, -1, -1],[-1, -1, -1],[-1, -1, -1]];
  gameOver = false;
  emptyCount = 0;
  plays = -1;
}

var myMove = function() {
  var i = 0;
  var j = 0;
  var done = false;

  if (!gameOver) {
    if (plays === 0) $("#cell_11").html(compIcon);

    if (plays === 1) {
      if (cells[0][0] + cells[0][2] + cells[2][0] + cells[2][2] === -2) $("#cell_22").html(compIcon);
      if (cells[1][1] === 1) $("#cell_11").html(compIcon);
      if (cells[1][0] + cells[0][1] === 0) $("#cell_11").html(compIcon);
      if (cells[2][1] + cells[1][2] === 0) $("#cell_33").html(compIcon);
    }

    if (plays === 2) {
      if (cells[2][0] + cells[1][1] + cells[0][2] === -1) $("#cell_33").html(compIcon);
      if (cells[2][2] === 1) $("#cell_31").html(compIcon);
      if (cells[1][0] === 1) $("#cell_13").html(compIcon);
      if (cells[0][1] === 1) $("#cell_31").html(compIcon);
      if (cells[1][2] === 1) $("#cell_31").html(compIcon);
      if (cells[2][1] === 1) $("#cell_13").html(compIcon);
    }

    if (plays >= 3) {
      var cell = chkImminentWin();

      if (cell != null) {
        cell.html(compIcon);
        done = true;
      }
    }

    if ((plays === 3) && (!done)) {
      if (cells[0][0] + cells[1][0] + cells[2][0] === 12) {
        $("#cell_13").html(compIcon);
        done = true;
      }
      if (cells[0][0] + cells[0][1] + cells[0][2] === 12) {
        $("#cell_31").html(compIcon);
        done = true;
      }
      if (cells[0][2] + cells[1][2] + cells[2][2] === 12) {
        $("#cell_31").html(compIcon);
        done = true;
      }
      if (cells[2][0] + cells[2][1] + cells[2][2] === 12) {
        $("#cell_13").html(compIcon);
        done = true;
      }
      if (cells[0][0] + cells[1][1] + cells[2][2] === 12) {
        $("#cell_12").html(compIcon);
        done = true;
      }
      if (cells[2][0] + cells[1][1] + cells[0][2] === 12) {
        $("#cell_12").html(compIcon);
        done = true;
      }
    }

    if ((plays >= 3) && (!done)) {
      for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
          if (cells[i][j] === -1) {
            getCell(i, j).html(compIcon);
            done = true;
            break;
          }
        }
        if (done) break;
      }
    }

    plays++;
    chkWin();
  } else {
    gameOver = false;
  }
}

var chkEmpty = function(cell) {
  if (cell.html() !== "") {
    alert("Cell not empty!");
    return false;
  }

  return true;
}

var getCell = function(i, j) {
  if ((i === 0) && (j === 0)) return $("#cell_11");
  if ((i === 0) && (j === 1)) return $("#cell_12");
  if ((i === 0) && (j === 2)) return $("#cell_13");
  if ((i === 1) && (j === 0)) return $("#cell_21");
  if ((i === 1) && (j === 1)) return $("#cell_22");
  if ((i === 1) && (j === 2)) return $("#cell_23");
  if ((i === 2) && (j === 0)) return $("#cell_31");
  if ((i === 2) && (j === 1)) return $("#cell_32");
  if ((i === 2) && (j === 2)) return $("#cell_33");
}

var updStatus = function() {
  cells = [[-1, -1, -1],[-1, -1, -1],[-1, -1, -1]];
  emptyCount = 0;

  if ($("#cell_11").html() === userIcon) {
    cells[0][0] = 1;
  } else if ($("#cell_11").html() !== "") {
    cells[0][0] = 10;
  } else {
    emptyCount++;
  }

  if ($("#cell_12").html() === userIcon) {
    cells[0][1] = 1;
  } else if ($("#cell_12").html() !== "") {
    cells[0][1] = 10;
  } else {
    emptyCount++;
  }

  if ($("#cell_13").html() === userIcon) {
    cells[0][2] = 1;
  } else if ($("#cell_13").html() !== "") {
    cells[0][2] = 10;
  } else {
    emptyCount++;
  }

  if ($("#cell_21").html() === userIcon) {
    cells[1][0] = 1;
  } else if ($("#cell_21").html() !== "") {
    cells[1][0] = 10;
  } else {
    emptyCount++;
  }

  if ($("#cell_22").html() === userIcon) {
    cells[1][1] = 1;
  } else if ($("#cell_22").html() !== "") {
    cells[1][1] = 10;
  } else {
    emptyCount++;
  }

  if ($("#cell_23").html() === userIcon) {
    cells[1][2] = 1;
  } else if ($("#cell_23").html() !== "") {
    cells[1][2] = 10;
  } else {
    emptyCount++;
  }

  if ($("#cell_31").html() === userIcon) {
    cells[2][0] = 1;
  } else if ($("#cell_31").html() !== "") {
    cells[2][0] = 10;
  } else {
    emptyCount++;
  }

  if ($("#cell_32").html() === userIcon) {
    cells[2][1] = 1;
  } else if ($("#cell_32").html() !== "") {
    cells[2][1] = 10;
  } else {
    emptyCount++;
  }

  if ($("#cell_33").html() === userIcon) {
    cells[2][2] = 1;
  } else if ($("#cell_33").html() !== "") {
    cells[2][2] = 10;
  } else {
    emptyCount++;
  }
}

var chkWin = function() {
  updStatus();
  
  for (let i = 0; i < 3; i++) {
    var testWin = 0;
    for (let j = 0; j < 3; j++) {
      testWin += cells[i][j];
    }

    if (testWin === 3) {
      alert("You win!");
      clearBoard();
      gameOver = true;
      return;
    }

    if (testWin === 30) {
      alert("I win!");
      clearBoard();
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
      alert("You win!");
      clearBoard();
      gameOver = true;
      return;
    }

    if (testWin === 30) {
      alert("I win!");
      clearBoard();
      gameOver = true;
      return;
    }
  }

  if (cells[0][0] + cells[1][1] + cells[2][2] === 3) {
    alert("You win!");
    clearBoard();
    gameOver = true;
    return;
  }

  if (cells[0][0] + cells[1][1] + cells[2][2] === 30) {
    alert("I win!");
    clearBoard();
    gameOver = true;
    return;
  }

  if (cells[2][0] + cells[1][1] + cells[0][2] === 3) {
    alert("You win!");
    clearBoard();
    gameOver = true;
    return;
  }

  if (cells[2][0] + cells[1][1] + cells[0][2] === 30) {
    alert("I win!");
    clearBoard();
    gameOver = true;
    return;
  }

  if (emptyCount === 0){
    alert("The game is a draw.");
    clearBoard();
    gameOver = true;   
  }
}

var chkImminentWin = function() {
  for (let i = 0; i < 3; i++) {
    var testWin = 0;
    for (let j = 0; j < 3; j++) {
      testWin += cells[i][j];
    }

    if (testWin === 19) {
      for (let j = 0; j < 3; j++) {
        if (cells[i][j] == -1) {
          return getCell(i, j);
        }
      }
    }

    if (testWin === 1) {
      for (let j = 0; j < 3; j++) {
        if (cells[i][j] == -1) {
          return getCell(i, j);
        }
      }
    }
  }

  for (let j = 0; j < 3; j++) {
    var testWin = 0;
    for (let i = 0; i < 3; i++) {
      testWin += cells[i][j];
    }

    if (testWin === 19) {
      for (let i = 0; i < 3; i++) {
        if (cells[i][j] == -1) {
          return getCell(i, j);
        }
      }
    }

    if (testWin === 1) {
      for (let i = 0; i < 3; i++) {
        if (cells[i][j] == -1) {
          return getCell(i, j);
        }
      }
    }
  }

  if (cells[0][0] + cells[1][1] + cells[2][2] === 19) {
    for (let i = 0; i < 3; i++) {
      if (cells[i][i] == -1) {
        return getCell(i, i);
      }    
    }
  }

  if (cells[0][0] + cells[1][1] + cells[2][2] === 1) {
    for (let i = 0; i < 3; i++) {
      if (cells[i][i] == -1) {
        return getCell(i, i);
      }    
    }
  }

  if (cells[2][0] + cells[1][1] + cells[0][2] === 19) {
    for (let i = 0; i < 3; i++) {
      if (cells[2-i][i] == -1) {
        return getCell(2 - i, i);
      }    
    }
  }

  if (cells[2][0] + cells[1][1] + cells[0][2] === 1) {
    for (let i = 0; i < 3; i++) {
      if (cells[2-i][i] == -1) {
        return getCell(2 - i, i);
      }    
    }
  }

  return null;
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

  $("#board").on("click", function(evt) {
    var mouse_x = evt.pageX - $('#board').offset().left;
    var mouse_y = evt.pageY - $('#board').offset().top;
  });  

  $("#cell_11").on("click", function() {
    if (chkEmpty($("#cell_11"))) {
      $("#cell_11").html(userIcon);
      chkWin();
      plays++;
      myMove();
    }
  });

  $("#cell_12").on("click", function() {
    if (chkEmpty($("#cell_12"))) {
      $("#cell_12").html(userIcon);
      chkWin();
      plays++;
      myMove();
    }
  });

  $("#cell_13").on("click", function() {
    if (chkEmpty($("#cell_13"))) {
      $("#cell_13").html(userIcon);
      chkWin();
      plays++;
      myMove();
    }
  });

  $("#cell_21").on("click", function() {
    if (chkEmpty($("#cell_21"))) {
      $("#cell_21").html(userIcon);
      chkWin();
      plays++;
      myMove();
    }
  });

  $("#cell_22").on("click", function() {
    if (chkEmpty($("#cell_22"))) {
      $("#cell_22").html(userIcon);
      chkWin();
      plays++;
      myMove();
    }
  });

  $("#cell_23").on("click", function() {
    if (chkEmpty($("#cell_23"))) {
      $("#cell_23").html(userIcon);
      chkWin();
      plays++;
      myMove();
    }
  });

  $("#cell_31").on("click", function() {
    if (chkEmpty($("#cell_31"))) {
      $("#cell_31").html(userIcon);
      chkWin();
      plays++;
      myMove();
    }
  });

  $("#cell_32").on("click", function() {
    if (chkEmpty($("#cell_32"))) {
      $("#cell_32").html(userIcon);
      chkWin();
      plays++;
      myMove();
    }
  });

  $("#cell_33").on("click", function() {
    if (chkEmpty($("#cell_33"))) {
      $("#cell_33").html(userIcon);
      chkWin();
      plays++;
      myMove();
    }
  });
});

