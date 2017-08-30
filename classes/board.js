function board(){
	this.width = 745;
	this.height = 650;
	this.stick = {
		width : 25,
		height : 660
	};

	this.holes = [];
	this.sym = ['X','O']; // X:you O:computer

	this.init = function(){
		for(var i=0; i<6; i++){
			this.holes.push([]);
			for(var j=0; j<7; j++)
				this.holes[i].push('-');
		}
	}

	this.full = function(){
		for(var i=0; i<6; i++){
			for(var j=0; j<7; j++)
				if(this.holes[i][j] == '-')
					return false;
		}
		return true;
	}

	this.checkColFull = function(col){
		return this.holes[0][col] != '-';
	}

	this.addInCol = function(col, turn){
			for(var i=5; i>=0; i--) if(this.holes[i][col] == '-'){
				this.holes[i][col] = this.sym[turn];
				//console.log(this.holes[i][col]+" "+i+" "+col+" "+this.sym[turn]);
				break;
			}
			return this.checkWin();
	}

	this.checkWin = function(turn){
		// check rows
		for(var i=0; i<6; i++){
			for(var j=0; j<4; j++){
				if(this.holes[i][j]==this.holes[i][j+1] && this.holes[i][j]==this.holes[i][j+2] &&
					 this.holes[i][j]==this.holes[i][j+3] && this.holes[i][j]!='-')
					 return this.holes[i][j];
			}
		}
		// check cols
		for(var i=0; i<7; i++){
			for(var j=0; j<3; j++){
				if(this.holes[j][i]==this.holes[j+1][i] && this.holes[j][i]==this.holes[j+2][i] &&
					 this.holes[j][i]==this.holes[j+3][i] && this.holes[j][i]!='-')
					 return this.holes[j][i];
			}
		}
		// check right diagonals
		for(var i=0; i<3; i++){
			for(var j=0; j<4; j++){
				if(this.holes[i][j]==this.holes[i+1][j+1] && this.holes[i][j]==this.holes[i+2][j+2] &&
					 this.holes[i][j]==this.holes[i+3][j+3] && this.holes[i][j]!='-')
					 return this.holes[i][j];
			}
		}
		// check left diagonals
		for(var i=0; i<3; i++){
			for(var j=3; j<7; j++){
				if(this.holes[i][j]==this.holes[i+1][j-1] && this.holes[i][j]==this.holes[i+2][j-2] &&
					 this.holes[i][j]==this.holes[i+3][j-3] && this.holes[i][j]!='-')
					 return this.holes[i][j];
			}
		}

		return '-';
	}

	this.draw = function(){
		// right key
		var msg;
		if(turn == 0)
			msg = "Your\nTurn";
		else
			msg = "My\nTurn"; // computer
		strokeWeight(4);
		stroke(240);
		fill(61,56,209);
		textSize(45);
		text(msg,50,height/2);

		// body
		fill(61, 56, 209);
		noStroke();
		rect(shift + this.stick.width, 60, this.width, this.height);

		// sticks
		fill(37, 34, 149);
		stroke(0);
		strokeWeight(2);
		// left stick
		rect(shift, 50, this.stick.width, this.stick.height);
		// right stick
		rect(shift + this.width, 50, this.stick.width, this.stick.height);
		// bottom stick
		noStroke();
		rect(shift - 25, height - 30, this.width + this.stick.width * 2 + 25, 30);

		// holes
		stroke(0);
		strokeWeight(2);
		for(var i=0; i<6; i++) for(var j=0; j<7; j++){

			if(this.holes[i][j] == '-')
				fill(173, 226, 226);
			else if(this.holes[i][j] == 'O')
				fill(255, 10, 10);
			else if(this.holes[i][j] == 'X')
				fill(10, 10, 255);

			ellipse(j * 100 + 250 + this.stick.width + 10, i * 100 + 60 + 60, 90, 90);
		}

	}

}
