function getNewCow(){
    request = new XMLHttpRequest();
    request.open('GET', '/cow', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400){
            // Success!
            resp = JSON.parse(request.responseText);
            speak(resp.cowText, resp.textOnly);
        } else {
            // We reached our target server, but it returned an error
            speak('Squaaaaak. There was an error', 'Squaaaaak. There was an error');
        }
    };

    request.onerror = function() {
        speak('Squaaaaak. There was an error', 'Squaaaaak. There was an error');
    };

    request.send();
}

function speak(cow, text){
    var elemn = document.getElementById('cow');
    elemn.innerHTML = cow;

    speechSynthesis.cancel();

    var voices = speechSynthesis.getVoices();
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;

    var r = Math.floor((Math.random() * voices.length) + 1);
    msg.voice = voices[r]; 

    speechSynthesis.speak(msg);
    
    // onend events for speechsynthesis don't work
    // Like at all. This is a hacky fix
    var i = setInterval(function(){
        if(!speechSynthesis.speaking){
            clearInterval(i);
            getNewCow();
        }
    }, 50);
}

(function(){
    // Getting the voices
    var voices = window.speechSynthesis.getVoices();

    // Chrome has issues here
    // Voices will be empty sometimes so we 
    // have to wait for the vent onvoiceschanged before talking
    // if that is the case
    if(voices.length === 0){
        window.speechSynthesis.onvoiceschanged = function() {
            getNewCow();
        };
    }else{
        getNewCow();
    }
}());
