var myBoard,
    myArrow,
    shift,
    turn, // 0:you 1:computer
    end,
    winner,
    myComputer;

function setup(){
  //createCanvas(1050,700);
  var cnv = createCanvas(1050,700);
  cnv.parent('sketch-holder');
  shift = 200;
  myBoard = new board();
  myBoard.init();
  myArrow = new arrow();
  myComputer = new computer();
  turn = 0; // initially, it's your turn
  end = false;
}

function draw(){
	background(173, 226, 226);
  myBoard.draw();
  myArrow.draw();
  myArrow.update();

  if(myBoard.full()){
    end = true;
    winner = '-';
  }

  if(end){
    background(0,0,0,200);
    textSize(64);
    noStroke();
    if(winner == 'X'){
      fill(10, 10, 255);
      var msg = "YOU WON!\n";
    }
    else if(winner == 'O'){
      fill(255, 10, 10);
      var msg = "I WON!\n";
    }
    else if(winner == '-'){
      fill(255);
      var msg = "DRAW!\n";
    }
    text(msg,width/2-100,height/2);
    noLoop();
  }

  if(turn == 1){
    var state = myComputer.play();
    if(state != '-' && state != false){
      end = true;
      winner = state;
    }
    turn = 1 - turn;
  }
}

function mousePressed(){
  if(turn == 1) return;
  var begin = shift + myBoard.stick.width;
  var newCol = floor(map(mouseX , begin, width - 80, 0, 7));
  if(myBoard.checkColFull(newCol)) return;
  var state = myBoard.addInCol(newCol, turn);
  if(state != '-'){
    end = true;
    winner = state;
    console.log(state);
  }
  turn = 1 - turn;
}
