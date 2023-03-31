//questions for quiz
var quizQuestions = [
  {
    question:
      "_____ are used to enclose the condition used within an if/ else statement.",
    correctAnswer: "parenthesis",
    arrayAnswer: ["square brackets", "curly brackets", "parenthesis", "quotes"],
  },
  {
    question:
      "_______ is the process of finding errors and fixing them within a program.",
    correctAnswer: "Debugging",
    arrayAnswer: ["Compiling", "Debugging", "Executing", "Scanning"],
  },
  {
    question: "A loop that never ends is referred to as a(n)_________.",
    correctAnswer: "Infinite loop",
    arrayAnswer: ["Infinite loop", "While loop", "Recursive loop", "For loop"],
  },
  {
    question: "The 'function' and 'var' are known as:",
    correctAnswer: "Declaration statements",
    arrayAnswer: [
      "Data types",
      "Keywords",
      "Prototypes",
      "Declaration statements",
    ],
  },
  {
    question:
      "Which of the following variables takes precedence over the others if the names are the same?",
    correctAnswer: "The local variable",
    arrayAnswer: [
      "The global variable",
      "The local variable",
      "Neither work",
      "None of the above",
    ],
  },
];

//element variables
var starterDiv = document.querySelector("#startDiv");
var gameDiv = document.querySelector("#questionDiv");
var theEnd = document.querySelector("#endOfQuizDiv");
var highscoreDiv = document.querySelector("#highscoreDiv");
var startButton = document.querySelector("#startButton");
var choiceArrayEl = document.querySelector("#answerChoices");
var resultEl = document.querySelector("#result");
var highscoreEl = document.querySelector("#highscore");
var submitButton = document.querySelector("#submitScore");
var userName = document.querySelector("#name");
var restartButton = document.querySelector("#restart");
var clearButton = document.querySelector("#clear");
var viewScore = document.querySelector("#view");
var time = document.querySelector("#timeClock");
var everyScore = [];
var currentQuestion = 0;
var finalScore = 0;

//timer variables
var remainingTime = 75;
var timeDiv = document.getElementById("timeClock");
var timer;

//timer
function countingDown() {
  timeDiv.classList.remove("disappear");
  if (remainingTime > 0) {
    timeDiv.innerHTML = remainingTime + " seconds remaining";
    remainingTime--;
  } else {
    clearInterval(timer);
    endGame();
  }
}

//start game
function startQuiz() {
  time.classList.remove("disappear");
  timer = setInterval(countingDown, 1000);
  starterDiv.classList.add("disappear");
  gameDiv.classList.remove("disappear");
  viewScore.classList.add("disappear");
  giveQuestions();
}

//shows question once start button pressed
function giveQuestions() {
  var h2El = document.querySelector("#questions");
  var answerArray = quizQuestions[currentQuestion].arrayAnswer;
  choiceArrayEl.innerHTML = "";
  if (currentQuestion < quizQuestions.length) {
    h2El.textContent = quizQuestions[currentQuestion].question;
    for (var i = 0; i < answerArray.length; i++) {
      var choiceButton = document.createElement("button");
      choiceButton.setAttribute("value", answerArray[i]);
      choiceButton.classList.add(i, "btnStyling", "hoverButton");
      choiceButton.textContent = answerArray[i];
      choiceArrayEl.appendChild(choiceButton);
      choiceButton.onclick = checkAnswer;
    }
  }
} //checks if answer chosen is correct or not
function checkAnswer() {
  if (this.value === quizQuestions[currentQuestion].correctAnswer) {
    resultEl.textContent = "Correct! 👍";
    resultEl.style.color = "green";
    resultEl.style.fontSize = "30px";
  } else {
    remainingTime -= 10;
    if (remainingTime < 0) {
      remainingTime = 0;
    }
    resultEl.textContent =
      "Wrong! 👎 The correct answer was " +
      quizQuestions[currentQuestion].correctAnswer;
    resultEl.style.color = "red";
    resultEl.style.fontSize = "30px";
  }
  currentQuestion++;

  //ends game when there is no more questions
  if (currentQuestion === quizQuestions.length) {
    finalScore = remainingTime;
    clearInterval(timer);
    timeDiv.classList.add("disappear");
    endGame();
  } else {
    giveQuestions();
  }
}
// stops game, goes to higscore div
function endGame() {
  gameDiv.classList.add("disappear");
  theEnd.classList.remove("disappear");
  highscoreEl.textContent = "Your highscore is " + finalScore;
}

//logs highscore in local storage
function logHighscore() {
  var name = userName.value.trim();

  if (name != "") {
    var newHighscore = {
      newName: name,
      score: finalScore,
    };

    everyScore.push(newHighscore);
    var newScore = JSON.stringify(everyScore);
    console.log(newScore);
    window.localStorage.setItem("everyScores", newScore);
  }
}

//creates a list for all highscores and sorts them highest-lowest
function showHighscores() {
  var scores = JSON.parse(window.localStorage.getItem("everyScores")) || [];
  scores.sort(function (a, b) {
    return b.score - a.score;
  });
  var highscoreList = document.querySelector("#highscoreList");
  removeChild(highscoreList);
  for (var i = 0; i < scores.length; i++) {
    var newLiEl = document.createElement("li");
    newLiEl.classList.add("highscore-list-style");
    var highscoreList = document.querySelector("#highscoreList");
    newLiEl.textContent = scores[i].newName + ": " + scores[i].score;
    highscoreList.appendChild(newLiEl);
  }
}

function removeChild(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//gets name of user and pushes it to the higscore list
submitButton.onclick = function () {
  theEnd.classList.add("disappear");
  highscoreDiv.classList.remove("disappear");
  logHighscore();
  showHighscores();
};

//restarts the quiz
restartButton.onclick = function () {
  highscoreDiv.classList.add("disappear");
  starterDiv.classList.remove("disappear");
  currentQuestion = 0;
  resultEl.textContent = "";
  remainingTime = 75;
  viewScore.classList.remove("disappear");
};

//goes to the highscore page
viewScore.onclick = function () {
  starterDiv.classList.add("disappear");
  highscoreDiv.classList.remove("disappear");
  viewScore.classList.add("disappear");
};

startButton.onclick = startQuiz;
