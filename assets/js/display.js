var generate = document.getElementById("generate");
var userObject = JSON.parse(localStorage.getItem("results"));

function initialize(i) {
    // First, reset the list so a new list isn't generated and appended after.
    // scoreList.innerHTML = "";
    for (var i = 0; i < userObject.player.length; i++) {
        var li = document.createElement("li");
        var entryPl = userObject.player[i];
        var entrySc = userObject.score[i];
        var population = document.createElement("p");
        population.textContent=(entryPl + ": " + entrySc + " point(s)");
        population.setAttribute("data-index", i);
        li.appendChild(population);
        scoreList.appendChild(li);
    }
};

initialize();
