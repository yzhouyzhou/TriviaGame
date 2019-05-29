var questionAnswers = [
    {
        question: "1- Who won the world series in 2016?",
        answers: ["Blackhawks", "Cubs", "Bears", "White Soxs"],
        rightAnswer: "Cubs",
        animate: "./assets/images/giphy-cubs-gif.webp"
        // animate: "./assets/images/giphy_cubs.mp4"
    },
    {
        question: "2- Name the world's largest ocean.",
        answers: ["Altlantic", "Indian", "Pacific", "Arctic"],
        rightAnswer: "Pacific",
        animate: "./assets/images/giphy-pacific-gif.webp"
        // animate: "./assets/images/giphy_pacific.mp4"
    },
    {
        question: "3- Name the world's longest river.",
        answers: ["Amazon", "Yangtze", "Mississippi", "Yenisei"],
        rightAnswer: "Amazon",
        animate: "./assets/images/giphy-river-gif.webp"
        // animate: "./assets/images/giphy_amazon.mp4"
    },
    {
        question: "4- Name the world's largest city.",
        answers: ["Tokyo", "Beijing", "London", "New York City"],
        rightAnswer: "New York City",
        animate: "./assets/images/giphy-newyork-gif.webp"
        // animate: "./assets/images/giphy_newyork.mp4"
    },
    {
        question: "5- Who won the World Cup in 2018?",
        answers: ["America", "France", "Italy", "Germany"],
        rightAnswer: "France",
        animate: "./assets/images/giphy-soccer-gif.webp"
        // animate: "./assets/images/giphy_soccer.mp4"
    }
]
var unCorrectImg = "./assets/images/giphy-wrong-gif.webp";
var altAnimate = "./assets/images/cubs_new.gif";
var altUnCorrectImg = "./assets/images/wrong_answer_new.gif";
// var unCorrectImg = "./assets/images/giphy_wrong_answer.mp4";
var index = 0;
var correctAnswers = 0;
var inCorrectAnswers = 0;
var unAnswers = 0;
var timer = 30;
var intervalId;
var isAnswered = false;

$(document).ready(function () {
    function showTrivia() {
        $("#showQuestion").html(questionAnswers[index].question);
        for (var i = 0; i < questionAnswers[index].answers.length; i++) {
            var answerSelected = $("<div>");
            answerSelected.addClass("clicked-text");
            answerSelected.attr("onmouseover", "style.color='gray'");
            answerSelected.attr("onmouseout", "style.color='darkgreen'");
            answerSelected.attr("your-answer", questionAnswers[index].answers[i]);
            answerSelected.html(questionAnswers[index].answers[i] + "<br><br>");
            $("#showPossibleAnswers").append(answerSelected);
        }

        $(".clicked-text").on("click", function () {
            var yourAnswer = $(this).attr("your-answer");
            if (yourAnswer === questionAnswers[index].rightAnswer) {
                correctAnswers++;
                handleCorrect("<br>Yes, " + yourAnswer + " is correct answer !");
            }
            else {
                inCorrectAnswers++;
                handleIncorrect("<br>Incorrect, ");
            }

            setTimeout(markedAnswer, 5000);

        });
    }

    function handleCorrect(showStr) {
        $("#showPossibleAnswers").empty();
        $("#showQuestion").append(showStr);
        var shows = $("<img>");
        shows.attr("src", questionAnswers[index].animate);
        shows.attr("alt", altAnimate);
        $("#showPossibleAnswers").append(shows);
    }

    function handleIncorrect(showStr) {
        $("#showPossibleAnswers").empty();
        $("#showQuestion").append(showStr + " the correct answer is   " + questionAnswers[index].rightAnswer);
        var ding = $("<img>");
        ding.attr("src", unCorrectImg);
        ding.attr("alt", altUnCorrectImg);
        $("#showPossibleAnswers").append(ding);
    }

    function markedAnswer() {
        isAnswered = true;
    }

    function moveToNext() {
        index++;
        clearInterval(intervalId);
        $("#displayBoard").empty();
        $("#showQuestion").empty();
        $("#showPossibleAnswers").empty();

        if (index === questionAnswers.length) {
            $("#displayBoard").html("Time Remaining: " + timer);
            $("#displayBoard").append("<br>Correct Answers:  " + correctAnswers);
            $("#displayBoard").append("<br>Incorrect Answers:  " + inCorrectAnswers);
            $("#displayBoard").append("<br>UnAnswered Questions:  " + unAnswers + "<br>");
            startGame("Start Over");
        }
        else {
            runTimer();
            showTrivia();
        }
    }

    function countdown() {
        timer--;
        $("#displayBoard").html("Time Remaining: " + timer);

        if (isAnswered) {
            isAnswered = false;
            moveToNext();
            return;
        }
        if (timer <= 0) {
            unAnswers++;
            handleIncorrect("<br>Timed out, ");
            clearInterval(intervalId);
            setTimeout(moveToNext, 5000);
            return;
        }
    }

    function runTimer() {
        timer = 30;
        $("#displayBoard").html("Time Remaining: " + timer);
        intervalId = setInterval(countdown, 1000);
    }

    function resetGame() {
        $("#displayBoard").empty();
        correctAnswers = 0;
        inCorrectAnswers = 0;
        unAnswers = 0;
        index = 0;
        runTimer();
        showTrivia();
    }

    function startGame(buttonName) {
        var btn = $("<button>");
        btn.html(buttonName);
        $("#displayBoard").append(btn);
        btn.on("click", function () {
            resetGame();
        })
    }

    startGame("Start");

});

