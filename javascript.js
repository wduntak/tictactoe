$(document).ready(function() {
	
	var game = { 
		turn: "X",
		instruct: function(str) {
			$('caption').text(str);
		},
		begin: function() {
			//reset settings to clear previous game
			$('body').off('click');//remove new game event handler
			$('td')
				.text('')
				.removeClass('taken')
				.removeClass('win')
			// set up event handler for taking a turn
			$('td').click(function(){
				$(this)
					.text(game.turn) //put an X or O in a cell
					.addClass('taken') //display as taken
					.off('click') //disable click on td
					.effect("highlight", {}, 1200);
				//check for winner
				var winner = false;
				if($('td.taken').length > 4) { //no one can win until the 5th round
					if(game.win_on_turn($(this).parent().index(), $(this).index())) {
						game.instruct("Game over, " + game.turn + " won. Click to play again.");
						winner = true;
					}
					else if ($('td.taken').length == 9) {
						game.instruct("Game over: tie game. Click to play again.");
						winner = true;
					}

				}
				if (winner) {
					$('body').removeClass('game-on');
					$('td').off('click'); // shouldn't be able to take turn
					setTimeout(function(){$('body').click(game.begin)}, 1); //wait 1 millisecond, otherwise trigger by click
				}
				else {
					game.turn = game.turn == "X" ? "O" : "X"; //change whose turn it is
				}
			});
			//begin
			$('body').addClass('game-on');
			game.turn_begin();
		},
		turn_begin: function() {
			game.instruct('Your turn, ' + game.turn);
		},
		cell: function(row, col) {
			return $('tr:eq(' + row + ') td:eq(' + col + ')');
		},
		check_n_show_win: function(a,b,c) {
			a = game.cell(a[0], a[1]);
			b = game.cell(b[0], b[1]);
			c = game.cell(c[0], c[1]);
			if (a.text() && a.text()==b.text() && b.text()==c.text()) {
				a.addClass('win');
				b.addClass('win');
				c.addClass('win');
				return true;
			}
			return false;
		},
		win_on_turn: function(row, col) { // check if there is a win after a new turn at [row, col]
			if (game.check_n_show_win([row, 0], [row, 1], [row, 2])) { // check row
				return true;
			}
			if (game.check_n_show_win([0, col], [1, col], [2, col])) { // check column
				return true;
			}
			if (game.check_n_show_win([2,0], [1,1], [0,2])){ // check / diagonal
				return true;
			}
			return game.check_n_show_win([0,0], [1,1], [2,2]); //check \ diagonal
		}
	};
	$(function() {
		game.begin();
	});
});

		
		// //puts 'x' and 'o' onto the table
		// $('td').on("click", function() {
		// 	if (turn % 2 === 0) {
		// 		$(this).text("O");
		// 		$("caption").text("Player X's turn")
		// 	} else {
		// 		$(this).text("X");	
		// 		$("caption").text("Player O's turn")
		// 	}
		// 	//adds highlight effect on clicks
		// 	$(this).effect("highlight", {}, 1200);

		// 	//increment turns 
		// 	turn ++;
		// 	//disables clicks on td that have been clicked
		// 	$(this).off("click");
		// });

		// //begin

