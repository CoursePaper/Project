function TicTacToe() {
  this.array = [[], [], []];
  this._next = 'x';
}

TicTacToe.prototype.readFromInput = function(event) {
  console.log(event);
  if (event.target.localName === 'input') {
    var value = event.target.value,
        coord = event.target.id.slice(0, 3).split('x');

    if ((value === 'x' || value === 'X') && this._next === 'x') {
      that.move(coord[0], coord[1]);
      event.target.value = 'X';
      event.target.readOnly = true;
    } else if ((value === 'o' || value === 'O' || value === '0' || value === 'y' || value === 'Y') && this._next === 'y') {
      that.move(coord[0], coord[1]);
      event.target.value = 'O';
      event.target.readOnly = true;
    } else {
      console.log('test');
      event.target.value = '';
    }
  }
}

TicTacToe.prototype.checkExist = function(x, y) {
  if (x > 2 || y > 2 || x < 0 || y < 0) {
    return false;
  } else {
    return true;
  }
}

TicTacToe.prototype.checkFree = function(x, y) {
  if (this.array[x][y] === undefined) {
    return true;
  } else {
    return false;
  }
}

TicTacToe.prototype.move = function(x, y) {
  var winner = this._next == 'x' ? 'X' : 'O';

  if (this.check(x, y)) {
    this.array[x][y] = this._next;
    if (this._next === 'x') {
      this._next = 'y';
    } else {
      this._next = 'x';
    }

    if(this.checkWin())  {
      console.log(winner + ' wins');
      this.endGame();
    }
  }
}

TicTacToe.prototype.check = function(x, y) {
  if (this.checkExist(x, y) && this.checkFree(x, y)) {
    return true;
  } else {
    return false;
  }
}

TicTacToe.prototype.checkWin = function() {
  for (var i = 0; i < 3; i++) {   // row
    if (this.array[i][0] == this.array[i][1] && this.array[i][1] == this.array[i][2] && this.array[i][2] != undefined) {
      return true;
    }

    if (this.array[0][i] == this.array[1][i] && this.array[1][i] == this.array[2][i] && this.array[2][i] != undefined) {
      return true;
    }
  }

  if (this.array[0][0] == this.array[1][1] && this.array[1][1] == this.array[2][2] && this.array[2][2] != undefined) {
    return true;
  }

  if (this.array[0][2] == this.array[1][1] && this.array[1][1] == this.array[2][0] && this.array[2][0] != undefined) {
    return true;
  }

  return false;
}

TicTacToe.prototype.endGame = function() {
  var input = document.getElementsByTagName('input');
  
  for (var i = 0; i < input.length; i++) {
    input[i].readOnly = true;
  }
}

TicTacToe.prototype.addEventChange = function() {
  var inputsArray = document.getElementsByTagName('input'),
      that = this;

  [].forEach.call(inputsArray, function(inputEl) {
    inputEl.addEventListener('change', that.readFromInput);
  });
}

var ticTacToe = new TicTacToe();
ticTacToe.addEventChange();
