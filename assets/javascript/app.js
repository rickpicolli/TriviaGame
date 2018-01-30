$(document).ready(function () {
		
	var count = 30;	
	var numCorrect = 0;
	var numIncorrect = 0;
	var numAnswered = 0;
	var answers = [];
	var currentQuestion = 0;
	hide('#tryAgain');



//create question to the user answer in the trivia game
	var trivia = [
		q1 = {
			question: 'What is the capital of Brazil?',
			correct: 2,
			answerList: ['A. São Paulo','B. Rio de Janeiro','C. Brasilia','D. Manaus'],
			gif: 'assets/images/brasilia.png'
		},
		q2 = {
			question: 'What language is the official language of Brazil?',
			correct: 3,
			answerList: ['A. Spanish','B. Brazilian','C. English', 'D. Portuguese'],
			gif: 'assets/images/brazil.gif'
		},
		q3 = {
			question: 'What is the largest city in Brazil?',
			correct: 0,
			answerList: ['A. São Paulo','B. Rio de Janeiro','C. Brasilia','D. Manaus'],
			gif: 'assets/images/sao-paulo.gif'
		},
		q4 = {
			question: 'which is the biggest festival in Brazil?',
			correct: 1,
			answerList: ['A. Independence Day Parady','B. Carnaval','C. Christimas Day','D. Saint Patrick Day'],
			gif: 'assets/images/carnaval.gif'
		},
		q5 = {
			question: 'which is the largest river in the world?',
			correct: 2,
			answerList: ['A. Nilo River','B. Danube River','C. Amazon River','D. Missouri River'],
			gif: 'assets/images/amazon-river.gif'
		},
		
	];



	
	// function to hide html elements
	function hide (elementId) {
		$(elementId).css("visibility", "hidden");
	};
	// helper function to show html elements
	var show = function (elementId) {
		$(elementId).css("visibility", "visible");
	};
	// helper function for writing html elements
	var write = function (elementId, rightAnswer) {
		$(elementId).html('<h3>' + rightAnswer + "</h3>")
	};

	hide('#answer1');

	// write question function
	function questionWrite() {
		if (currentQuestion <= 4) { 
			$('#question').html('<h2>' + trivia[currentQuestion].question + '</h2>');
			answers = trivia[currentQuestion].answerList;
			show('.answer');
			for (var i = 0; i < answers.length; i++) {
				$('#answer' + i).html('<h3>' + answers[i] + '</h3>');
			}
		}
		else {
			gameOver();
		}
	};

	// clears the html contents of the answers
	function answerClear() {
		// $('#answersDiv').empty();
		for (var i = 0; i < 4; i++) {
			$('#answer' + i).html('');
		}
		hide('.answer');
	};

	// Timer
	// Timer run function
	function start(){
		// starts timer counter
		counter = setInterval(countDown, 1000);

		// clear startTitle
		$('#rules').empty();

		// hide start button
		hide('#start');
		show('#timer');
		hide('#tryAgain');

		//write question & answers
		questionWrite();	
	};

	// clears all content
	function clearScreen() {
		show('#rules');
		$('#question').empty();
		$('#score').empty();
		answerClear();
	}

	// Timer countdown function
	function countDown () {
		// decrement timerNumber
		count --;
		// write timer to html timerDiv
		$('#timer').html('<h2> Time Remaining: </h2>' + count + '<h2>seconds!</h2>');

		// when timer reaches 0
		if (count == 0) {
			gameOver();
		}
	};

	// Timer stop function
	function stop() {
		clearInterval(counter);
	};

	// reset function
	function reset() {
		stop();
		count = 30;
		answers = [];
		currentQuestion = 0;
		clearScreen();
		show('#tryAgain');
		$('#timer').empty();
		show('#start');
		hide('#reset');
	};
	
	function gameOver() {
		// stop the timer
		stop();

		// clear the question and answers
		clearScreen();

		// interact with game over
		// write('#startTitle', '<h3>Game Over!</h3>');
		$('#score').append('<h3>Here are your results</h3>');
		$('#score').append('<h3>Total Questions Answered: ' + numAnswered + '</h3>');
		$('#score').append('<h3>Number of correct answers: ' + numCorrect + '</h3>');
		$('#score').append('<h3>Number of incorrect answers: ' + numIncorrect + '</h3>');
		show('#reset');
		hide('#tryAgain');
		hide('#timer');
	};

	//next question function
	function nextQuestion() {

		clearInterval();
		count = 30;
	}

	//check answer
	$('.answer').click(function () {
		var clicked = $(this);
		var value = clicked.attr('value');
		var correctAnswer = trivia[currentQuestion].correct;

		if (value == correctAnswer) {
			$('#question').empty();
			answerClear();
		
			numAnswered ++;
			numCorrect ++;
			currentQuestion ++;
			questionWrite();
		}
		else {
			numAnswered ++;
			numIncorrect ++;
			currentQuestion ++;
			count = 30;
			$('#question').empty();
			answerClear();
		
			setInterval(nextQuestion, 5 * 1000);
			answerClear();
			questionWrite();
		}
	});

	 // click handlers	
	$('#start').on("click", start);
	$('#reset').on('click', reset);
})