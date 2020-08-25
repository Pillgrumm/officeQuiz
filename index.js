const quizArray = [
    {qNum:  1,
    question: 'Which bear is best?',
    answerOptions: ['Gummy Bear', 'Black Bear, Beets, Battlestar Galactica', 'Brown Bear, Beats, Galaxy Quest', 'Panda Bear'],
    correctAnswer: 'Black Bear, Beets, Battlestar Galactica'

  },
    {qNum: 2,
    question: 'In which state is Dunder Mifflin Scranton Located?',
    answerOptions:['New York', 'North Carolina', 'Pennsylvania', 'Texas'],
    correctAnswer: 'Pennsylvania'
  },

    {qNum: 3,
    question: `What is the name of Meredith's son?`,
    answerOptions: ['Jake', 'John', 'Miles', 'Nathan'],
    correctAnswer: 'Jake'        
  },

    {qNum: 4,
    question:'What band did Creed play for in the 1970s?',
    answerOptions:['The Jefferson Airplane', 'The Doors', 'The Grass Roots', 'Creed'],
    correctAnswer: 'The Grass Roots'
  },

    {qNum: 5,
    question:'What is Michaels middle name?',
    answerOptions: ['David', 'Larry', 'Gary', 'Jerry'],
    correctAnswer: 'Gary'
  },

    {qNum: 6,
    question:'Where did Dwight get his suit in "Casino Night"?',
    answerOptions: ['Nordstrom Rack', 'His Grandfathers Grave', 'A Dumpster', 'eBay'],
    correctAnswer: 'His Grandfathers Grave'
  },
  
    {qNum: 7,
    question: 'What was the name of Angelas late cat?',
    answerOptions: ['Todd', 'Fluffy', 'Mrs. Whiskers', 'Sprinkles'],
    correctAnswer: 'Sprinkles'
    
  },

    {qNum: 8,
    question: 'What is Andys acapella group called?',
    answerOptions: ['The Andinellas', 'Here Comes Treble', 'Fragrant Andylions', 'Silent Lullabies'],
    correctAnswer: 'Here Comes Treble'
  },

    {qNum: 9,
    question: 'According to Prison Mike, what is the worst thing about prison?',
    answerOptions: ['Dropping The Soap', 'The Showers', 'The Dementors', 'Golem'],
    correctAnswer:'The Dementors'
    
  },

    {qNum: 10,
    question: "Which member of the office is part of a 'The Police' cover band?",
    answerOptions:['Andy', 'Daryl', 'Kevin', 'Creed'],
    correctAnswer: 'Kevin'

    }
];

let currentQ = 0;

function startQuiz() {
$('#start-page').on('click', '.button', event =>{
  $('#start-page').addClass('hidden');
  $('#question-page').removeClass('hidden');
  $('#submit-answer').removeClass('hidden');
  });
}

function renderQuestions() {
  const answer1 = `${quizArray[currentQ].answerOptions[0]}`;
  const answer2 = `${quizArray[currentQ].answerOptions[1]}`;
  const answer3 = `${quizArray[currentQ].answerOptions[2]}`;
  const answer4 = `${quizArray[currentQ].answerOptions[3]}`;
  const questionText = `<legend>${currentQ+1}/10: ${quizArray[currentQ].question}<legend>`;
  const answersText = 
  `<input type='radio' name='option' class='radio-buttons' id='answer1' value='${answer1}'><label for='answer1'>${answer1}</label><br>
  <input type='radio' name='option' class='radio-buttons' id='answer2' value='${answer2}'><label for='answer2'>${answer2}</label><br>
  <input type='radio' name='option' class='radio-buttons' id='answer3' value='${answer3}'><label for='answer3'>${answer3}</label><br>
  <input type='radio' name='option' class='radio-buttons' id='answer4' value='${answer4}'><label for='answer4'>${answer4}</label><br>`;
  $('.office-question').html(questionText);
  $('.office-answers').html(answersText);
  enableSubmitButton();

}
  
function enableSubmitButton() {
  $('input[name=option]').on('click', function(event) {
    $('#submit-answer').removeClass('disabled').removeAttr('disabled');
  });
}
  function submitQuizAnswer() {
    $('#submit-answer').on('click', function(event){
      event.preventDefault();
      evaluateAnswers();
      $('#submit-answer').addClass('hidden');
      $('#next-question').removeClass('hidden');
      $('input[type=radio]').attr('disabled', true);
      
    });
  }

  let userScore = {
    correct: 0,
    incorrect: 0,

  };

  function evaluateAnswers() {
    let radioValue = $('input[name=option]:checked').val();
    if (radioValue == quizArray[currentQ].correctAnswer) {
      userScore.correct++;
      $('#feedbackcorrect').removeClass('hidden');
    }
    else {
      userScore.incorrect++;
      getCorrectAnswer();
      $('#feedbackincorrect').removeClass('hidden');
      $('.wrong-answer').removeClass('hidden');
    }
    $('.results-counter').html(`<p>Correct: ${userScore.correct} | Incorrect: ${userScore.incorrect}</p>`);
  }

  function getCorrectAnswer() {
    let popupAnswerText = `<h3> Nope! The answer is: <br>${quizArray[currentQ].correctAnswer}</h3><br>`;

    $('#feedbackincorrect').html(popupAnswerText);
  }

  function advanceToNextQuestion() {
  $('#next-question').on('click', function(event) {
    if (currentQ < quizArray.length-1) {
      currentQ++;
      renderQuestions();
      resetQuestion();
    } else {
      showFinalScore();
    } 
  });
}


  function resetQuestion() {
    $('input[type=radio').attr('disabled', false);
    $('#next-question').addClass('hidden');
    $('#submit-answer').removeClass('hidden');
    $('#feedbackcorrect').addClass('hidden');
    $('#feedbackincorrect').addClass('hidden');
    $('.wrong-answer').addClass('hidden');
    $('#submit-answer').addClass('disabled');
    $('#submit-answer').attr('disabled', 'disabled');
  }

  function showFinalScore() {
    $('#submit-answer').addClass('hidden');
    $('#final-page').removeClass('hidden');
    $('#question-page').addClass('hidden');
    let finalScoreText = `<h3>You got ${userScore.correct} out of 10 correct!</h3>`
    $('#final-correct').append(finalScoreText);

  }

  function restartQuiz() {
    $('#retake').on('click',function() {
      location.reload();
    });
  }

  function handleQuizFunctions() {
    startQuiz();
    renderQuestions();
    submitQuizAnswer();
    advanceToNextQuestion();
    restartQuiz();
    enableSubmitButton();
  }

  $('handleQuizFunctions');
