// var questions = require("../data/questions.js")

function displayQuestions() {
    //write code to display the questions
}

function findBestMatch() {
    console.log("TEST");
    var selectedValues = [
        document.getElementById("a1").value,
        document.getElementById("a2").value,
        document.getElementById("a3").value,
        document.getElementById("a4").value,
        document.getElementById("a5").value,
        document.getElementById("a6").value,
        document.getElementById("a7").value,
        document.getElementById("a8").value,
        document.getElementById("a9").value,
        document.getElementById("a10").value,
    ];
    console.log(selectedValues);
}

$(document).ready(function() {
    console.log("test1");
    //displayQuestions();
    $("#submit").on("click", findBestMatch);
});