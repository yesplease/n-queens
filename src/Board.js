// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      var sum = _.reduce(row, function(sum, value){
        return sum + value;
      });

      return sum > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {

      for ( var i = 0; i < this.get('n'); i++ ) {
        if (this.hasRowConflictAt(i)){
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var sum = 0;
      for (var i = 0; i < this.get('n'); i++){
        var row = this.get(i);
        sum += row[colIndex];
      }
      return sum > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for (var i = 0; i < this.get('n'); i++){
        if(this.hasColConflictAt(i)){
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(initialColumnIndex) {
      var board = this;
      var numRows = board.get('n');

      var crawlAndCheck = function(row, column, accumulator){
        var sum = accumulator;
        var currentRow = board.get(row);

        // base case!
        //does our row exist?
        if (!currentRow){ return sum > 1; }
        var element = currentRow[column];
        //does our element exist?
        if (element === undefined) { return sum > 1; }

        // recursive case!
        // add the element value to sum,
        // call crawlAndCheck() on the next value
        sum += element;
        if(crawlAndCheck(row + 1, column + 1, sum)) { return true; }
      };

      for(var i = 0; i < numRows; i++){
        if(crawlAndCheck(i, initialColumnIndex, 0)){ return true; }
      }

      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var numberOfColumns = this.get('n');
      for (var i = 0; i < numberOfColumns; i++){
        if(this.hasMajorDiagonalConflictAt(i)) { return true; };
      }

      return false;

    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(initialColumnIndex) {
      var board = this;
      var numRows = board.get('n');

      //subroutine crawlAndCheck
      var crawlAndCheck = function(row, column, accumulator){
        var sum = accumulator;
        var currentRow = board.get(row);

        // base case
        if(!currentRow){ return sum > 1; }
        var element = currentRow[column];
        if(element === undefined){ return sum > 1; }

        // recursive case
        sum += element;
        if(crawlAndCheck(row + 1, column - 1, sum)){ return true; }

      };

      //for all our rows
      for (var i = 0; i < numRows; i++){
        if(crawlAndCheck(i, initialColumnIndex, 0)) { return true; }
      }
      return false;

    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //debugger;
      //get number of columns
      var numColumns = this.get('n');
      //iterate over all those columns from right to left.
      for (var i = numColumns -1; i >= 0; i-- ){
        if(this.hasMinorDiagonalConflictAt(i)) { return true; };
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());





      // var checkSubRows = function(topRowIndex){
      //   //sum is initialized to first element
      //   var sum = 0;
      //   //var numSubRows = totalRows - (topRowIndex + 1);

      //   //Checking all rows under neath
      //   for (var j = topRowIndex; j <= numSubRows; j++){
      //     var row = thisBoard.get(j);
      //     console.log("This is current j: ", j);
      //     var element = row[j + columnIndex];
      //     if (element){
      //       sum += element;
      //     } else {
      //       break;
      //     }
      //   }
      //   return sum > 1;
      // };
