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
            answerSelected.attr("your-answer", questionAnswers[index].answers[i]);
            answerSelected.html(questionAnswers[index].answers[i] + "<br><br>");
            $("#showPossibleAnswers").append(answerSelected);
        }

        $(".clicked-text").on("click", function () {
            var yourAnswer = $(this).attr("your-answer");
            if (yourAnswer === questionAnswers[index].rightAnswer) {
                $("#showPossibleAnswers").empty();
                $("#showQuestion").append("<br>Yes, " + yourAnswer + " is correct !");
                var shows = $("<iframe>");
                correctAnswers++;
                shows.attr("src", questionAnswers[index].animate);
                shows.attr("width", "480");
                shows.attr("height", "280");
                $("#showPossibleAnswers").append(shows);
            }
            else {
                inCorrectAnswers++;
                $("#showPossibleAnswers").empty();
                $("#showQuestion").append("<br>No, the correct answer is   " + questionAnswers[index].rightAnswer);
                var ding = $("<iframe>");
                ding.attr("src", unCorrectImg);
                ding.attr("width", "380");
                ding.attr("height", "280");
                $("#showPossibleAnswers").append(ding);
            }

            setTimeout(markedAnswer, 3000);

        });
    }

    function markedAnswer() {
        isAnswered = true;
    }

    function moveToNext() {
        index++;
        clearInterval(intervalId);
        $("#display").empty();
        $("#showQuestion").empty();
        $("#showPossibleAnswers").empty();
        if (index === totalOfQuestions) {
            $("#display").html("Time Remaining: " + timer);
            $("#display").append("<br>Correct Answers:  " + correctAnswers);
            $("#display").append("<br>Incorrect Answers:  " + inCorrectAnswers);
            $("#display").append("<br>UnAnswered Questions:  " + unAnswers + "<br>");
            startGame("Start Over");
        }
        else {
            runTimer();
            showTrivia();
        }
    }

    function countdown() {
        timer--;
        $("#display").html("Time Remaining: " + timer);

        if (isAnswered) {
            isAnswered = false;
            moveToNext();
            return;
        }
        if (timer <= 0) {
            unAnswers++;
            moveToNext();
            return;
        }
    }

    function runTimer() {
        timer = 30;
        $("#display").html("Time Remaining: " + timer);
        intervalId = setInterval(countdown, 1000);
    }

    function resetGame() {
        $("#display").empty();
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
        $("#display").append(btn);
        btn.on("click", function () {
            resetGame();
        })

    }

    startGame("Start");

});

