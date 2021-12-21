# Homework 04: Code Quiz

## Overview
Welcome to Homework 4: Code Quiz! Here you'll find a brief quiz that will test your knowledge of coding basics like HTML, CSS, and JavaScript. Once you're done, you can save your score and compare it against... your previous scores!

## Functionality
When begun, the quiz's JavaScript will start a 75-second countdown timer and pose a number of questions to the user. User will then be given a number of options and tasked to select the correct one. Once an answer is selected, the user will be told whether they are correct, and if they are incorrect, 10 seconds will be deducted from the timer. Then after a short interval, the script will move on to the next question.

Once all questions have been answered, or the timer reaches 0, the user is taken to a score screen. The user may enter their initials to log their score in local storage, and may then click a link to view the leaderboard.

## Data Storage & Results
Initials and final time are stored in a global variable which is stringified and placed in local storage. The Scoreboard page runs a script on initialize that parses the stored string and returns them, sorted by index number.