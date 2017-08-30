function computer(){ // O: computer
  var board;
  this.play = function(){
    board = myBoard.holes;
    var state = false;
    // check rows
		for(var i=0; i<6; i++){
			for(var j=0; j<4; j++){
        var curr = [board[i][j],board[i][j+1],board[i][j+2],board[i][j+3]];
        state = this.checkCurr(curr, i, j, 1);
        if(state != false)
          return state;
			}
		}
		// check cols
		for(var i=0; i<7; i++){
			for(var j=0; j<3; j++){
        var curr = [board[j][i],board[j+1][i],board[j+2][i],board[j+3][i]];
        state = this.checkCurr(curr, i, j, 2);
        if(state != false)
          return state;
			}
		}
		// check right diagonals
		for(var i=0; i<3; i++){
			for(var j=0; j<4; j++){
        var curr = [board[i][j],board[i+1][j+1],board[i+2][j+2],board[i+3][j+3]];
        state = this.checkCurr(curr, i, j, 3);
        if(state != false)
          return state;
			}
		}
		// check left diagonals
		for(var i=0; i<3; i++){
			for(var j=3; j<7; j++){
       var curr = [board[i][j],board[i+1][j-1],board[i+2][j-2],board[i+3][j-3]];
       state = this.checkCurr(curr, i, j, 4);
       if(state != false)
         return state;
			}
		}

    // if reaches here, then play a random move
    var ok = true;
    while(ok){
      var c = floor(random(0,7));
      if(!myBoard.checkColFull(c)){
        myBoard.addInCol(c, turn);
        state = myBoard.checkWin();
        ok = false;
        return state;
      }
    }

      return false; // all the board is full !
  }

  this.checkCurr = function(curr, i, j, cs){
    var xCnt = 0, oCnt = 0;
    for(var k=0; k<4; k++){
     if(curr[k] == 'X') xCnt++;
     else if(curr[k] == 'O') oCnt++;
    }
    //console.log(i+" "+j+" "+cs+" "+oCnt +" "+ xCnt);

    // attack
    if(oCnt == 3 && xCnt != 1){
      for(var k=0; k<4; k++){
        if(curr[k] == '-'){
          console.log("okkkk2");
          /*if(cs == 1)
            myBoard.holes[i][j+k] = 'O';*/
          if(cs == 1){
            //if(myBoard.checkColFull(j+k)) break;
            myBoard.addInCol(j+k, turn);
            //myBoard.holes[i+k][j+k] = 'O';
          }
          if(cs == 2)
            myBoard.holes[j+k][i] = 'O';
          if(cs == 3){
            //if(myBoard.checkColFull(j+k)) break;
            myBoard.addInCol(j+k, turn);
            //myBoard.holes[i+k][j+k] = 'O';
          }
          if(cs == 4){
            //if(myBoard.checkColFull(j+k)) break;
            myBoard.addInCol(j-k, turn);
            //myBoard.holes[i+k][j-k] = 'O';
          }

          return myBoard.checkWin();
        }
      }
    }

    // defend
     if(xCnt == 3 && oCnt != 1){
       for(var k=0; k<4; k++){
          if(curr[k] == '-'){
            console.log("okkkk");
            /*if(cs == 1)
              myBoard.holes[i][j+k] = 'O';*/
            if(cs == 1){
              //if(myBoard.checkColFull(j+k)) break;
              myBoard.addInCol(j+k, turn);
              //myBoard.holes[i+k][j+k] = 'O';
            }
            if(cs == 2)
              myBoard.holes[j+k][i] = 'O';
            if(cs == 3){
              //if(myBoard.checkColFull(j+k)) break;
              myBoard.addInCol(j+k, turn);
              //myBoard.holes[i+k][j+k] = 'O';
            }
            if(cs == 4){
              //if(myBoard.checkColFull(j+k)) break;
              myBoard.addInCol(j-k, turn);
              //myBoard.holes[i+k][j-k] = 'O';
            }

          return myBoard.checkWin();
         }
       }
     }

    return false;
  }
}
