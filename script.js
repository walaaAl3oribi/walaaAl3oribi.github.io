var width = $(window).width();
var height = $(window).height();

if (height > width) {
    alert('Please flip your phone');
}


$(document).ready(function() {

    $(document).resize(function() {
        if (height > width) {
            alert('Please flip your phone');
        }
    });

    document.getElementById("display").style.display = "BLOCK";
    document.getElementById("eyes").style.display = "NONE";
    document.getElementById("mouth").style.display = "NONE";


    document.getElementById("smile").style.display = "none";
    document.getElementById("letters-sound").style.display = "none";
    document.getElementById("e-sound").style.display = "none";
    document.getElementById("o-sound").style.display = "none";

    document.getElementById("L-eye-happy").style.display = "none";
    document.getElementById("R-eye-happy").style.display = "none";
    document.getElementById("L-eye-closed").style.display = "none";
    document.getElementById("R-eye-closed").style.display = "none";


    function talk(msg) {
        const arr = msg.split('');
        console.log(arr);

        for (var i = 0; i < arr.length; i++) {
            console.log(arr[i]);
            if (arr[i].includes("o")) {
                document.getElementById("o-sound").style.display = "block";
                document.getElementById("smile").style.display = "none";
            }
        }
    }


    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    var speech = new SpeechSynthesisUtterance();






    $('body').bind('keypress', function(e) {
        if (e.which == 32) { //space bar
            recognition.start();
            console.log('start recording...');
        }
    });


    $("#display").click(function() {
        //start speaking
        read('Hello, My name is Beto. And I am a robot. what is your name? Click anywhere to start talking to me.');
        console.log('Hello, My name is Beto. And I am a robot. what is your name?');

        $("#display").hide();
    });



    recognition.onstart = function() {
        console.log('You can speak now!!!');
    }

    recognition.onresult = function(event) {
        var text = event.results[0][0].transcript;
        text = text.slice(0, -1).toLowerCase();
        console.log(text);
        speak(text);
    }

    recognition.onend = function() {
        startTalkingAnimation();
    }

    function read(text) {

        speech.text = text;
        speech.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == "Microsoft Zira - English (United States)" })[0];
        speech.lang = 'en-US';
        speech.pitch = 1.8;

        console.log(speech.voice);
        window.speechSynthesis.speak(speech);

        speech.onstart = function() {
            console.log("s");
            startTalkingAnimation();
        };


        speech.onend = function() {
            console.log("e");
            stopTalkingAnimation();

            $(document).click(function() {
                recognition.start();
                console.log('start recording...');
            });
        };

    }

    function speak(text) {

        speech.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == "Microsoft Zira - English (United States)" })[0];
        speech.lang = 'en-US';
        speech.pitch = 1.8;

        if (text.includes('time')) {
            speech.text = 'It is ' + new Date().getHours() + " " + new Date().getMinutes() + " right now";
        } else if (text.includes('name')) {
            var newText = text.replace('my name is', '');
            speech.text = 'Nice to meet you ' + newText;
        } else if (text.includes('love me')) {
            speech.text = 'Of course, not! You piece of junk!';
        } else {
            speech.text = text;
        }
        window.speechSynthesis.speak(speech);


    }


    function startTalkingAnimation() {
        $(".light-shadow").show();
        $("#eyes").show();
        $("#mouth").show();
        $("#everything").css("animation", " head-rotation 7s infinite");
        $("#dots").hide();
    }

    function stopTalkingAnimation() {
        $("#eyes").hide();
        $("#mouth").hide();
        $("#everything").css("animation", "head-rotation 7s 1");

        $("#dots").show();
    }






});