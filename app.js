var qwerty = document.getElementById("qwerty");
var phrase = document.getElementById("phrase");
var missed = 0;
var hearts = document.querySelectorAll(".tries img");


//start button to hide overlay
overlay = document.getElementById("overlay");
startButton = document.querySelector(".btn__reset");
startButton.addEventListener("click", () => { overlay.style.display = "none" });


//phrases for players to guess
const phrases = ["first", "second", "third", "fourth", "fifth"];

//this function forms an array in "phraseLetters" from the letters of a string randomly
//selected from the array passed in as arr
function getRandomPhraseAsArray(arr) {
    var phraseArray = Array.from(arr[Math.floor(Math.random() * arr.length)]);
    return phraseArray;
}

var phraseArray = getRandomPhraseAsArray(phrases);

//function to add the letters to the game screen
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement("li")
        var letters = document.createTextNode(arr[i]);
        li.className = "letter";
        li.appendChild(letters);
        phrase.appendChild(li);
    }
};

addPhraseToDisplay(phraseArray);



const keyboard = document.querySelectorAll(".keyrow button");
for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].addEventListener("click", function () {
        keyboard[i].className = "chosen";
        keyboard[i].disabled = "true";
        btn = keyboard[i].textContent;
        checkLetter(btn);
        checkWin()
        if (checkLetter(btn) !== btn) {
            missed += 1;
            hearts[missed - 1].src = "images/lostHeart.png";
        }
    });
}


function checkLetter(btn) {
    const letters = document.getElementsByClassName("letter");
    var match = null;
    for (let i = 0; i < letters.length; i++) {
        if (btn === letters[i].textContent) {
            letters[i].className = "letter show";
            match = btn;
        }
    }
    return match;
}

function checkWin() {
    var liLetter = document.getElementsByClassName("letter");
    var liShow = document.getElementsByClassName("show");
    if (liLetter.length === liShow.length) {
        overlay.className = "win";
        overlay.style.display = "flex";
        console.log("Fuck")
    }
}

