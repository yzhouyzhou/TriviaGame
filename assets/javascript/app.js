var questionAnswers = [
    {
        question: "who won the world series in 2016?",
        answers: ["Blackhawks", "Cubs", "Bears", "White Soxs"],
        rightAnswer: "Cubs",
        animate: "./assets/images/giphy_cubs.mp4"
    },
    {
        question: "Second who won the world series in 2016?",
        answers: ["Blackhawks", "Cubs", "Bears", "White Soxs"],
        rightAnswer: "Cubs",
        animate: "./assets/images/giphy_cubs.mp4"
    },
    {
        question: "Third who won the world series in 2016?",
        answers: ["Blackhawks", "Cubs", "Bears", "White Soxs"],
        rightAnswer: "Cubs",
        animate: "./assets/images/giphy_cubs.mp4"
    }

]

var unCorrectImg = "./assets/images/giphy_wrong_answer.mp4";
var correctAnswers = 0;
var inCorrectAnswers = 0;
var unAnswers = 0;
var index = 0;
var totalOfQuestions = 3;
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
            answerSelected.attr("onmouseout", "style.color='black'");
            answerSelected.attr("your-answer", questionAnswers[index].answers[i]);
            answerSelected.html(questionAnswers[index].answers[i] + "<br><br>");
            $("#showPossibleAnswers").append(answerSelected);
        }

        $(".clicked-text").on("click", function () {
            var yourAnswer = $(this).attr("your-answer");
            if (yourAnswer === questionAnswers[index].rightAnswer) {
                correctAnswers++;
                handleCorrect("<br>Yes, " + yourAnswer + " is correct !");
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
        var shows = $("<iframe>");
        shows.attr("src", questionAnswers[index].animate);
        shows.attr("width", "380");
        shows.attr("height", "220");
        $("#showPossibleAnswers").append(shows);
    }

    function handleIncorrect(showStr) {
        $("#showPossibleAnswers").empty();
        $("#showQuestion").append(showStr + " the correct answer is   " + questionAnswers[index].rightAnswer);
        var ding = $("<iframe>");
        ding.attr("src", unCorrectImg);
        ding.attr("width", "380");
        ding.attr("height", "220");
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
        if (index === totalOfQuestions) {
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

