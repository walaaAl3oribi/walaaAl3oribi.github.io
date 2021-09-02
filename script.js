var allAnimals = ["elephant", "fish", "goat", "horse", "jellyfish", "ladybug", "sheep", "lion", "mouse", "owl", "pig", "rabbit", "tiger", "whale", "worm", "zebra", "rhinoceros", "kangaroo", "giraffe", "snail", "fox"];
var animalsArr = [];
var score = 0;
var ans;

var randomT;
var randomAnimal;


for (i = 0; i < allAnimals.length; i++) {
    animalsArr.push(allAnimals[i]);
}


$(document).ready(function() {

    var btnSound = new Audio('sounds/buttonsound.mp3');
    var wrongSound = new Audio('sounds/wrongsound.mp3');
    var correctSound = new Audio('sounds/correctsound.mp3');
    var losesound = new Audio('sounds/losesound.mp3');
    var winsound = new Audio('sounds/winsound.mp3');

    //timer

    var timer;
    var time = 30;
    var timeLeft = time; // seconds


    $("#start").click(function() {
        btnSound.play();

        setTimeout(
            function() {
                $("#homepage").addClass("hide");
                $("#control").removeClass("hide");
                $("#gamepage").removeClass("hide");

                setTimeout(
                    function() {

                        changeAnimal();

                        setTimeout(
                            function() {

                                // setInterval is a built-in function that will call the given function
                                // every N milliseconds (1 second = 1000 ms)
                                timer = window.setInterval(updateTimer, 1000);

                                // It will be a whole second before the time changes, so we'll call the update
                                // once ourselves
                                updateTimer();

                                // We don't want the to be able to restart the timer while it is running,
                                // so hide the button.
                            }, 1000);

                    }, 1000);

            }, 1000);




    });

    function updateTimer() {
        timeLeft = timeLeft - 1;
        if (timeLeft >= 0) {
            //$('#timer').html(timeLeft);
            console.log(timeLeft);

            var num = timeLeft / time;
            var per = num * 100;
            var perleft = 100 - per;

            $("#timer").css('width', perleft + '%');

        } else {
            gameOver();
        }
    }

    // What to do when the timer runs out
    function gameOver() {
        // This cancels the setInterval, so the updateTimer stops getting called
        clearInterval(timer);

        // re-show the button, so they can start it again
        animalsArr.length = 0;
        changeAnimal();
    }


    $("#replay").click(function() {
        btnSound.play();
        location.reload();
    });

    // must have 2 randoms: one that picks the right answer and image - other picks a wrong answer

    function changeAnimal() {

        if (animalsArr.length === 0) {


            if (score > 0) {
                winsound.play();
            } else {
                losesound.play();
            }
            $('#scorepage>h1').text("score = " + score);
            //alert("score = " + score);

            $("#scorepage").removeClass("hide");
            $("#homepage").addClass("hide");
            $("#control").addClass("hide");
            $("#gamepage").addClass("hide");

        } else {
            randomT = Math.floor(Math.random() * animalsArr.length) + 0;
            var animal = animalsArr[randomT];

            console.log(animalsArr);

            var randomR = Math.floor(Math.random() * allAnimals.length) + 0;
            randomAnimal = allAnimals[randomR];

            read(randomAnimal);
            $("#image").attr("src", "img/animals/" + animal + ".png");

            if (animal == randomAnimal) {
                ans = true;
            } else {
                ans = false;
            }
        }




    }


    $("#wrong").click(function() {

        if (ans) {
            wrongSound.play();
            $("#shadowRed").show();
            $("#shadowRed").animate({
                opacity: 0.5,
                opacity: 0,
                opacity: 0.5,
            }, 1000, function() {
                $("#shadowRed").hide();
                score--;
                $("#score > h1").text(score);

                changeAnimal();
            });
        } else {
            correctSound.play();
            $("#shadowGreen").show();
            $("#shadowGreen").animate({
                opacity: 0.5,
                opacity: 0,
                opacity: 0.5,
            }, 1000, function() {
                $("#shadowGreen").hide();
                score++;

                $("#score > h1").text(score);

                animalsArr.splice(randomT, 1);
                changeAnimal();
            });
        }


    });

    $("#true").click(function() {

        if (ans) {
            correctSound.play();
            $("#shadowGreen").show();
            $("#shadowGreen").animate({
                opacity: 0.5,
                opacity: 0,
                opacity: 0.5,
            }, 1000, function() {
                $("#shadowGreen").hide();
                score++;
                $("#score > h1").text(score);
                animalsArr.splice(randomT, 1);

                changeAnimal();
            });

        } else {
            wrongSound.play();
            $("#shadowRed").show();
            $("#shadowRed").animate({
                opacity: 0.5,
                opacity: 0,
                opacity: 0.5,
            }, 1000, function() {
                $("#shadowRed").hide();
                score--;
                $("#score > h1").text(score);

                changeAnimal();
            });
        }


    });

    $("#image").click(function() {
        read(randomAnimal);
    });





    //This is read part

    function read(text) {
        var speech = new SpeechSynthesisUtterance();
        speech.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == "Microsoft Zira - English (United States)" })[0];
        speech.lang = 'en-US';
        speech.pitch = 1.8;
        speech.text = text;

        window.speechSynthesis.speak(speech);

        speech.onstart = function() {
            console.log("s");
        };

        speech.onend = function() {
            console.log("e");
        };

    }


});