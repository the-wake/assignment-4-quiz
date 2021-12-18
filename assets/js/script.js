// TODO: Set up style in CSS.

// TODO: Populate questions.

// TODO: Find out what is up with the scoring.

// TODO: Add score and initials to local storage.

// TODO: Make scoreboard page and create link to it from index.html.

var questionSpot = document.getElementById("questionSpot");
var content = document.getElementById("content");
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
var playAgain = document.getElementById("playAgain");
var trackRight = document.getElementById("trackRight");
var trackWrong = document.getElementById("trackWrong");

var questions = [
    // Should these objects have names or nah?
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

var qNum = 0;
var currentQ = questions[qNum];
var timeLeft = 75;
var penalty = 10;
var numCorrect = 0;
var numIncorrect = 0;

// Populates question and responses from the currently indexed question.
// I could rewrite this as a function of i, and increment that instead of querying a global variable. However, so far I've only been able to get it to iterate on its own and haven't figured out how to have it happen only when called, and it also results in some local variables that complicate other functions. May be able to get around it by returning certain valuse, but it seems like the code would be messier and less efficient in the ways I can come up with.
function populate() {
    trackRight.textContent = numCorrect;
    trackWrong.textContent = numIncorrect;
    currentQ = questions[qNum];
    responseList.style.display="block";
    feedback.style.display="none";
    questionSpot.textContent = currentQ.q;
    q0.textContent = currentQ.options[0];
    q1.textContent = currentQ.options[1];
    q2.textContent = currentQ.options[2];
    q3.textContent = currentQ.options[3];
}
    
start.addEventListener("click", function() {
    start.style.display="none";
    instructions.textContent = "";
    populate();
    runTimer();
});

function runTimer() {
    timerInterval = setInterval(function() {
        if (timeLeft > 0) {
            timeLeft--;
            timer.textContent = timeLeft;
        } else {
            console.log("Countdown finished");
            stopTimer();
        }
    }, 1000)
};

responseList.addEventListener("click", function(event) {
    var clicked = event.target;
    // Makes sure it's actually an option being clicked and not the parent.
    if (clicked.matches("p")) {
        // Return the index of the selected response and remove responses.
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
    numCorrect = 0;
    numIncorrect = 0;
    qNum = 0;
    timeLeft = 75;
    timer.textContent = 75;    
    populate();
    runTimer();
});

function advance () {
    setTimeout(function() {
        if (qNum + 1 < questions.length) {
            qNum++;
            populate();
        } else {
            finished();
        }
    }, 750)
};

function correct() {
    feedback.textContent=("Correct!");
    console.log=("Correct");
    numCorrect++;
    trackRight.textContent=(numCorrect);
    advance();
};

function incorrect () {
    feedback.textContent=("Incorrect");
    console.log=("Nope");
    numIncorrect++;
    trackWrong.textContent=(numIncorrect);
    // I tried doing this as decrement, but couldn't find a way of decrementing by a variable so just did it with an extra operator.
    timeLeft = timeLeft - penalty;
    advance();
};

function finished() {
    stopTimer();
    feedback.style.display="none";
    formScreen.style.display="block";
    questionSpot.textContent="Thanks for playing! Your score was " + 0 + ". Enter your initials below to save your score, or play again!"
}

function stopTimer() {
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