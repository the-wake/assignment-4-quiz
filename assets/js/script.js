var questionSpot = document.getElementById("questionSpot");
var start = document.getElementById("start");
var timer = document.getElementById("timer");
var instructions = document.getElementById("instructions");
var responseList = document.getElementById("responseList");
var q0 = document.getElementById("q0");
var q1 = document.getElementById("q1");
var q2 = document.getElementById("q2");
var q3 = document.getElementById("q3");
var feedback = document.getElementById("feedback");
var formScreen = document.getElementById("formScreen");
var subButton = document.getElementById("subButton");
var thanks = document.getElementById("thanks");
var trackRight = document.getElementById("trackRight");
var trackWrong = document.getElementById("trackWrong");
var scoreList = document.getElementById("scoreList");

var questionsRegular = [
    // Should these objects have names or nah?
    {
        q: "What is HTML primarily responsible for?",
        options: ["Responsive content", "Setting class attributes", "Layout of page elements", "All of the above"],
        correct: 2
    },
    {
        q: "In coding, what is the DOM?",
        options: ["Differential Object Marketing", "Document Object Model", "Digital Optical Monitoring", "Domain"],
        correct: 1
    },
    {
        q: "Which of these is a commonly-used CDN?",
        options: ["Git Hub", "Wikipedia", "JSON", "jQuery"],
        correct: 3
    },
    {
        q: "Which of these is NOT like the others?",
        options: ["head", "header", "nav", "aside"],
        correct: 0
    },
    {
        q: "What of these is NOT common front-end language?",
        options: ["HTML", "CSS", "Java", "JavaScript"],
        correct: 2
    },
    {
        q: "What is the index number of this question? (Hint: This is the 6th question.)",
        options: ["1", "5", "6", "7"],
        correct: 1
    }
]

var questionsCyber = [
    {
        q: "What is Cyberpunk?",
        options: ["A game franchise", "A genre", "A setting", "All of the above"],
        correct: 3
    },
    {
        q: "Who wrote Ghost in the Shell?",
        options: ["Masamune Shirow", "Mamoru Oshii", "Rene Descartes", "Scarlett Johansson"],
        correct: 0
    },
    {
        q: "Which of these coined the idea of the Matrix as a cyber-reality?",
        options: ["Do Androids Dream of Electric Sheep?", "Blade Runner", "Neuromancer", "The Matrix"],
        correct: 2
    }
]

var questions = questionsRegular;
var qNum = 0;
var currentQ = questions[qNum];
var timeLeft = 75;
var penalty = 10;
var numCorrect = 0;
var numIncorrect = 0;
var highScores = {
    player: [],
    score: []
};
var scoreList = [];

// // Populates question and responses from the currently indexed question.
// function populate() {
//     trackRight.textContent = numCorrect;
//     trackWrong.textContent = numIncorrect;
//     currentQ = questions[qNum];
//     responseList.style.display="block";
//     feedback.style.display="none";
//     // I know there's a way to do this with iteration. However, I can't figure out how to make that work when it comes to replacing textContent across multiple elements. I could instead run an interative create/append command, but I don't know how to iteratively clear all of those after. So for now it just works this way.
//     questionSpot.textContent = currentQ.q;
//     q0.textContent = currentQ.options[0];
//     q1.textContent = currentQ.options[1];
//     q2.textContent = currentQ.options[2];
//     q3.textContent = currentQ.options[3];

// Populates question and responses from the currently indexed question.
function populate(i) {
    trackRight.textContent = numCorrect;
    trackWrong.textContent = numIncorrect;
    currentQ = questions[qNum];
    responseList.style.display="block";
    feedback.style.display="none";
    questionSpot.textContent = currentQ.q;
    responseList.innerHTML="";
    for (var i = 0; i < currentQ.options.length; i++) {
        var option = document.createElement("button");
        option.className="option";
        option.setAttribute("data-n", i);
        option.textContent=currentQ.options[i];
        responseList.appendChild(option);
    }
}

function runTimer() {
    timerInterval = setInterval(function() {
        if (timeLeft > 0) {
            timeLeft--;
            timer.textContent = "Time Remaining: " + timeLeft;
        } else {
            console.log("Countdown finished");
            stopTimer();
            finished();
        }
    }, 1000)
};

start.addEventListener("click", function() {
    start.style.display="none";
    instructions.textContent = "";
    populate();
    runTimer();
});

responseList.addEventListener("click", function(event) {
    var clicked = event.target;
    // Makes sure it's actually an option being clicked and not the parent.
    if (clicked.matches("button")) {
        // Return the index of the selected option and remove options.
        var responseID = clicked.getAttribute("data-n");
        responseList.style.display="none";
        feedback.style.display="block";
    } else {
        return null;
    }
    // Validate if selection is correct.
    if (responseID == currentQ.correct) {
        correct()
    } else {
        incorrect()
    }
});

playAgain.addEventListener("click", function() {
    formScreen.style.display="none";
    thanks.textContent=("");
    numCorrect = 0;
    numIncorrect = 0;
    qNum = 0;
    timeLeft = 75;
    timer.textContent = "Time Remaining: " + timeLeft;
    populate();
    runTimer();
});

subButton.addEventListener("click", function(event) {
    event.preventDefault();
    if (document.getElementById("initials").value.length <2 ) {
        alert("You must enter at least 2 characters.")
    } else {
        subButton.style.display="none";
        // Populates the global object with whatever information is in the local storage. The conditional is necessary to keep from nullifying the global object if there's nothing yet in local storage.
        if (JSON.parse(localStorage.getItem("results"))) {
        highScores = JSON.parse(localStorage.getItem("results"));
        };
        var initEntry = document.getElementById("initials").value;
        var score = timeLeft;
        highScores.player.push(initEntry);
        highScores.score.push(score);
        localStorage.setItem("results", JSON.stringify(highScores));
        console.log (highScores.player);
        console.log (highScores.score);
        thanks.textContent="Thanks! Click here to see the high score page.";
        // thanks.innerHTML="Thanks! " + "<a href="www.google.com/">Click here</a>" + "to see the high score page.";
        // thanks.setAttribute("href", "www.google.com/");

    };

});

function advance () {
    setTimeout(function() {
        // Haven't actually checked that this works yet. The timing window is pretty tight.
        if (timeLeft > 0 && qNum + 1 < questions.length) {
            qNum++;
            populate();
        } else {
            finished();
        }
    }, 750)
};

function correct() {
    feedback.textContent=("Correct!");
    console.log("Correct");
    numCorrect++;
    trackRight.textContent=(numCorrect);
    advance();
};

function incorrect () {
    feedback.textContent=("Incorrect");
    console.log("Nope");
    numIncorrect++;
    trackWrong.textContent=(numIncorrect);
    timeLeft -= penalty;
    advance();
};

function finished() {
    stopTimer();
    // This just sets the timer to 0 if you went under 0 by answering a question wrong.
    if (timeLeft < 0) {
        timeLeft = 0;
        timer.textContent = "Time Remaining: " + 0;
    };
    responseList.style.display="none";
    subButton.style.display="inline";
    feedback.style.display="none";
    formScreen.style.display="block";
    questionSpot.textContent="Thanks for playing! Your score was " + timeLeft + ". Enter your initials below to save your score, or play again!"
}

function stopTimer() {
    // The timer display isn't decrementing properly if the last question is answered incorrectly, so this tries to force it to update.
    timer.textContent = "Time Remaining: " + timeLeft;
    clearInterval(timerInterval);
};







// Click on start button
    // Starts timer
    // Go to first question & options --> create a function with index as an argument
        // Check if index < questions.length
    // Each option is a button with a click event
        // Find a way to make one click event that finds which button was clicked on (event.target matches)

// index++
// Advance to next question after ~500ms
    // Don't use a for loop or it will loop immediately

// Validate right vs. wrong answer
    // Compare options to correct
    // Add time and display message if right
    // Subtract 10 seconds and display message if wrong
    // Calculate score on the fly (but don't display until done with all questions)

// Stop timer if:
    // If timer == 0
    // User finishes quiz

// Once user finishes last question
    // Stop timer
    // Display message and form for user initials
    // Display score
    // Capture information to local storage
    // Form button has href to second html file with scoreboard