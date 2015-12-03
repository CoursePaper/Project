describe('TicTacToe test', function() {
  describe('#checkExist()', function() {
    it("should return false when cell isn't exist", function() {
      var tictac = new TicTacToe();

      tictac.move(0, 0);
      tictac.move(1, 2);
      tictac.move(2, 2);

      expect(tictac.checkExist(2, 4)).toEqual(false);
      expect(tictac.checkExist(-1, 2)).toEqual(false);
      expect(tictac.checkExist(1, 2)).toEqual(true);
      expect(tictac.checkExist(2, 3)).toEqual(false);
      expect(tictac.checkExist(2, 2)).toEqual(true);
    });
  });

  describe('#checkFree', function() {
    it("should return false when cell is busy", function() {
      var tictac = new TicTacToe();

      tictac.move(0, 0);
      tictac.move(1, 2);
      tictac.move(2, 2);

      expect(tictac.checkFree(0, 0)).toEqual(false);
      expect(tictac.checkFree(1, 2)).toEqual(false);
      expect(tictac.checkFree(1, 0)).toEqual(true);
    });
  });

  describe('#check()', function() {
    it("should return true if checkFree() and checkExist() are true", function() {
      var tictac = new TicTacToe();

      expect(tictac.check(-2, 1)).toEqual(false);
      expect(tictac.check(2, 0)).toEqual(true);
      expect(tictac.check(2, 2)).toEqual(true);

      tictac.move(0, 0);
      tictac.move(2, 1);

      expect(tictac.check(0, 0)).toEqual(false);
      expect(tictac.check(2, 1)).toEqual(false);
      expect(tictac.check(2, 2)).toEqual(true);

      tictac.move(2, 2);

      expect(tictac.check(2, 2)).toEqual(false);
   });
  });

  describe('check _next value', function() {
   it("should check what is next: X or Y", function() {
    var tictac = new TicTacToe();

    tictac.move(0, 0);
    tictac.move(1, 2);

    expect(tictac._next).toEqual('x');

    tictac.move(3, 1);

    expect(tictac._next).toEqual('x');

    tictac.move(1, 1);

    expect(tictac._next).toEqual('y');
   });
  });

  describe('#move()', function() {
   it("check move", function() {
     var tictac = new TicTacToe();

     tictac.move(0, 0);
     tictac.move(1, 2);

     expect(tictac.array[0][0]).toEqual('x');
     expect(tictac.array[1][2]).toEqual('y');
   });
  });

  describe('check on win result', function() {
    var tictac;

    beforeEach(function() {
      tictac = new TicTacToe();
    });

    it("X wins on the middle row", function() {
      tictac.move(1, 1); //x
      tictac.move(2, 0); //y
      tictac.move(1, 2); //x
      tictac.move(2, 1);

      expect(tictac.checkWin()).toEqual(false);

      tictac.move(1, 0);

      expect(tictac.checkWin()).toEqual(true);
    });

    it("X wins on the main diagonal", function() {
      expect(tictac.checkWin()).toEqual(false);

      tictac.move(1, 1); //x
      tictac.move(2, 0); //y
      tictac.move(2, 2); //x
      tictac.move(1, 0);

      expect(tictac.checkWin()).toEqual(false);

      tictac.move(0, 0);

      expect(tictac.checkWin()).toEqual(true);
    });

    it("Y wins on the last row", function() {
      tictac.move(1, 1); //x
      tictac.move(2, 0); //y
      tictac.move(0, 0); //x

      expect(tictac.checkWin()).toEqual(false);

      tictac.move(2, 1);

      expect(tictac.checkWin()).toEqual(false);

      tictac.move(1, 2);

      expect(tictac.checkWin()).toEqual(false);

      tictac.move(2, 2);

      expect(tictac.checkWin()).toEqual(true);

    });

    it("Y wins on the supplementary diagonal", function() {
      tictac.move(0, 1); //x
      tictac.move(2, 0); //y

      expect(tictac.checkWin()).toEqual(false);

      tictac.move(0, 0); //x
      tictac.move(0, 2); //y

      expect(tictac.checkWin()).toEqual(false);

      tictac.move(2, 2); //x

      expect(tictac.checkWin()).toEqual(false);

      tictac.move(1, 1); //y

      expect(tictac.checkWin()).toEqual(true);

    });

    it("X wins on the first column", function() {
      tictac.move(0, 0); //x

      expect(tictac.checkWin()).toEqual(false);

      tictac.move(2, 2); //y
      tictac.move(1, 0); //x
      tictac.move(2, 1);

      expect(tictac.checkWin()).toEqual(false);

      tictac.move(2, 0);

      expect(tictac.checkWin()).toEqual(true);

    });

    it("Y wins on the last column", function() {
      tictac.move(0, 1); //x
      tictac.move(0, 2); //y

      expect(tictac.checkWin()).toEqual(false);

      tictac.move(0, 0); //x
      tictac.move(2, 2);

      expect(tictac.checkWin()).toEqual(false);

      tictac.move(2, 0);

      expect(tictac.checkWin()).toEqual(false);

      tictac.move(1, 2);

      expect(tictac.checkWin()).toEqual(true);

    });

    it("Y wins on the first row", function() {
      tictac.move(2, 1); //x
      tictac.move(0, 0); //y

      expect(tictac.checkWin()).toEqual(false);

      tictac.move(2, 0); //x
      tictac.move(0, 1);

      expect(tictac.checkWin()).toEqual(false);

      tictac.move(1, 0);

      expect(tictac.checkWin()).toEqual(false);

      tictac.move(0, 2);

      expect(tictac.checkWin()).toEqual(true);
    });

    it("X wins on the middle column", function() {
      tictac.move(1, 1); //x
      tictac.move(2, 0); //y
      tictac.move(1, 2); //x
      tictac.move(2, 1);

      expect(tictac.checkWin()).toEqual(false);

      tictac.move(1, 0);

      expect(tictac.checkWin()).toEqual(true);
    });
  });
});
