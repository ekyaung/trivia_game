$(document).ready(function() {

	var questions = [
		{
			question: 'Who is Homer Simpson\'s wife?',
			answers: [
				'Delilah',
				'Marge',
				'Tulip',
				'Merge'
			],
			correctAnswer: 1,
			gifSource: "https://media.giphy.com/media/11mTYesz11OGxW/giphy.gif"
		},
		{
			question: 'Who is bart simpson\'s dad?',
			answers: [
				'Peter Griffin',
				'Homer Simpson',
				'Garfield',
				'Eileen'
			],
			correctAnswer: 1,
			gifSource: "http://www.hilariousgifs.com/i/tZOS8.gif"
		},
		{
			question: 'What is the name of the clown on the show?',
			answers: [
				'Rusty',
				'Rick',
				'Krusty',
				'Krispy'
			],
			correctAnswer: 2,
			gifSource: "https://media.giphy.com/media/l0G18RV0eml3kyRFK/giphy.gif"
		},
		{
			question: 'How many people are in their family?',
			answers: [
				'5',
				'4',
				'6',
				'1'
			],
			correctAnswer: 0,
			gifSource: "https://media.giphy.com/media/3o6MbbEk9CaoQSbA3K/giphy.gif"
		}
	];
	var finalQuestionCount = questions.length - 1; // 0-indexed
	var questionCount = 0;
	var score = {
		correct: 0,
		incorrect: 0,
		unanswered: 0,
	};

	var timer;
	// check if selected answer choice is correct
	var checkAnswer = function(index) {
		// 1. check if answer is correct
		var currentQuestion = questions[questionCount];
		clearInterval(timer);
		if (index === currentQuestion.correctAnswer) {
			showResults('correct');
		} else {
			showResults('incorrect');
		}
		// 2. if correct, show user that answer is correct (with gif or whatever)
		// 3. keep track of correct and incorrect answers
		// 4. move onto next question
	}

	$("#one").click(function() {
		var index = 0;
		checkAnswer(index);
	});
	$("#two").click(function() {
		var index = 1;
		checkAnswer(index);
	});
	$("#three").click(function() {
		var index = 2;
		checkAnswer(index);
	});
	$("#four").click(function() {
		var index = 3;
		checkAnswer(index);
	});

	var timerSeconds = 30;
	var startQuestion = function() {
		// get current question and update fields
		showQuestionContainer();
		// start timer
		$('.time .seconds').text(timerSeconds);
		timer = setInterval(function() {
			timerSeconds--;
			$('.time .seconds').text(timerSeconds);
			if (timerSeconds <= 0) {
				showResults('unanswered');
				clearInterval(timer);
			}
		}, 2500);
	}

	// result is either `correct`, `incorrect`, or `unanswered`
	var showResults = function(result) {
		$('.start, .question-container').hide();
		$('.show-result').show();
		var gifSource = questions[questionCount].gifSource;
		$('.show-result .gif-holder').empty();
		$('.show-result .gif-holder').append('<img src="'+gifSource+'" />');
		// reset timer
		timerSeconds = 30;
		$('.question-container').hide();
		if (result === 'unanswered') {
			score.unanswered++;
			$('.show-result .title').text('You ran out of time!');
		} else if (result === 'correct') {
			score.correct++;
			$('.show-result .title').text('Correct!');
		} else if (result === 'incorrect') {
			score.incorrect++;
			$('.show-result .title').text('Incorrect!');
		}
		// automatically move to next question in 3s
		setTimeout(function() {
			// if finished, show final results
			if (questionCount === finalQuestionCount) {
				showFinalResults();
				return;
			}
			questionCount++;
			startQuestion();
		}, 2500);
	}

	var showFinalResults = function() {
		$('.start, .show-result, .question-container').hide();
		$('.show-final-results').show();
		$('.final-counter .correct .score').text(score.correct);
		$('.final-counter .incorrect .score').text(score.incorrect);
		$('.final-counter .unanswered .score').text(score.unanswered);
	}

	var showQuestionContainer = function() {
		$('.start, .show-result, .show-final-results').hide();
		$('.question-container').show();
		var currentQuestion = questions[questionCount];
		$('.question').text(currentQuestion.question);
		$('#one').text(currentQuestion.answers[0]);
		$('#two').text(currentQuestion.answers[1]);
		$('#three').text(currentQuestion.answers[2]);
		$('#four').text(currentQuestion.answers[3]);
	}

	$(".start-button span").click(function() {
		startQuestion();
	});

	$(".start-over").click(function() {
		questionCount = 0;
		score.correct = 0;
		score.incorrect = 0;
		score.unanswered = 0;
		startQuestion();
	});

});

