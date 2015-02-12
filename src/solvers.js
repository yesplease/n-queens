/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {

  // declare a chessboard of size n
  var board = new Board({'n': n});
  var numRooks = n;
  var numRows = board.get('n');
  var numColumns = numRows;
  var numRooksPlaced = 0;

  var placeRook = function(){
    for(var i = 0; i < numRows; i++){
      for(var j = 0; j < numColumns; j++){

        if(board.get(i)[j] === 1){ continue; }
        board.togglePiece(i, j);

        if(board.hasAnyRooksConflicts()){
          board.togglePiece(i, j);
        } else {
          numRooksPlaced++;
          return;}
      }
    }
  };

  for(var i = 0; i < numRooks; i++){
    placeRook();
  }

  if(numRooksPlaced === numRooks){ return board.rows(); }
  return undefined;
  //for n number of rooks,
    //call a function that finds a conflict-free spot.

  //sub-function that finds a conflict-free spot
  // iterate over the rows
    // for each row, iterate over columns
      // toggle piece at current coordinates
      // has rook conflict? if so, toggle again to remove it, and continue
      // otherwise, sub-routine is finished
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
