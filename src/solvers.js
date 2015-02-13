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

  // places a rook down at the next non-conflict spot
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

  // place rooks
  for(var i = 0; i < numRooks; i++){ placeRook(); }

  // return board if n-Rooks were placed, otherwise return undefined
  if(numRooksPlaced === numRooks){ return board.rows(); }
  return undefined;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  //basecase:
  var findSolution = function( row ){
    //if all rows exhausted
    if ( row === n ){
       //increment solutionCount
      solutionCount++;
      //stop
      return;
    }


     //recursive case
     //iterate over possible decisions
    for ( var i = 0; i < n; i++ ){
      //place a piece
      board.togglePiece(row, i);
        //recurse into remaining board
      if ( !board.hasAnyRooksConflicts() ){
        findSolution( row + 1 );
      }
      //unplace a piece
      board.togglePiece(row,i);
    }

  };

      //initialize the problem by passing in top row (which is index 0)
      findSolution(0);
      return solutionCount;
   };

  //saving this because who knows? I might want to reference the beast we built before which allllmost worked. I think.
  // var board = new Board({'n':n});
  // var numColumns = board.get('n');
  // var numRows = board.get('n');
  // var nRooks = board.get('n');
  // var solutions = 0;

  // var findNextRook = function(b, rooks){
  //   var currentBoard = new Board(deepSlice(b.rows()));
  //   var numRooksPlaced = rooks;

  //   // base case: n-rooks have been placed.
  //   if(numRooksPlaced === nRooks){ solutions++; return; }

  //   // recursive case: iterate over board
  //   for(var i = 0; i < numRows; i++){
  //     for(var j = 0; j < numColumns; j++){

  //       var element = currentBoard.get(i)[j];

  //       // skip when a rook already occupies this space
  //       if(element === 1){ continue; }

  //       // put a rook down and check for conflicts
  //       currentBoard.togglePiece(i, j);
  //       if(currentBoard.hasAnyRooksConflicts()){
  //         currentBoard.togglePiece(i, j);
  //         continue;
  //       }

  //       // we placed a rook!
  //       numRooksPlaced++;

  //       // base case 2: a rook could not be placed,
  //       // and we're at the end of the board
  //       if((i === numRows-1) &&
  //          (j === numColumns-1) &&
  //          (numRooksPlaced !== nRooks)){
  //         return;
  //       }
  //       // send this board back in to find the next rook placement
  //       findNextRook(currentBoard, numRooksPlaced);

  //       // remove the rook, and find the next spot it could go
  //       currentBoard.togglePiece(i, j);

  //     }
  //   }
  //};



//   for(var i = 0; i < numRows; i++){
//     for(var j = 0; j < numColumns; j++){
//       board.togglePiece(i, j);
//       findNextRook(board, 1);
//       board.togglePiece(i, j);
//     }
//   }

//   console.log('solutions', solutions);
//   return solutions;
// };



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //debugger;
  // if ( n < 0 ){ return; };
  var board = new Board({n:n});


  var findSolution = function( row ){
  //base case:
  //if we have reached the bottom of the board
    if ( n === 0 ){

    }

    if ( row === n ){
      return board.rows();
    //return that solution
      //if ( n === 0 )
    }

    //recursive case:
    //iterate over possible decisions.
    for ( var i = 0; i < n; i++ ){
      //place a piece
      board.togglePiece(row, i);
      //if there are no conflicts,
      if ( !board.hasAnyQueenConflictsOn() ){
        //recurse into remaining board
        findSolution( row + 1 );
      }
      //pick up piece!
      board.togglePiece(row, i);
    }

  };

  var solution = findSolution(0);
  if (solution){ return solution; }
  return undefined;
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));

};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.deepSlice = function(arr){
  var newArray = [];

  _.each(arr, function(item, key, collection){
    newArray.push(Array.prototype.slice.call(item));
  });

  return newArray;
}
