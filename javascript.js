	$(document).ready(function() {
		var turn = 1;
		$('td').on("click", function() {
			if (turn % 2 === 0) {
				$(this).text("O");
			} else {
				$(this).text("X");	
			}
			turn ++;
			$(this).off("click");
		});

	});