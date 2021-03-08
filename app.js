var qwerty = document.getElementById("qwerty");
var phrase = document.getElementById("phrase");
var missed = 0;
var hearts = document.querySelectorAll(".tries img");
var keyboard = document.querySelectorAll(".keyrow button");
var ul = document.querySelector("#phrase ul")
var winN = null

   const resetbtn = document.createElement("button");
    resetbtn.className = "reset";
    resetbtn.textContent = "Reset"
//start button to hide overlay and reset gameboard
overlay = document.getElementById("overlay");
startButton = document.querySelector(".btn__reset");
startButton.addEventListener("click", function () {
    overlay.style.display = "none"
    reset()
    listen()
});


//phrases for players to guess
const phrases = ["first", "second", "third", "fourth", "fifth one"];

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
        if (arr[i] === " ") {
            li.className = "space";
        } else {
            li.className = "letter";
        }
        li.appendChild(letters);
        phrase.firstElementChild.appendChild(li);
    }
};

addPhraseToDisplay(phraseArray);


function listen() {
    for (let i = 0; i < keyboard.length; i++) {
        keyboard[i].addEventListener("click", function () {
            keyboard[i].className = "chosen";
            keyboard[i].disabled = true;
            btn = keyboard[i].textContent;
            checkLetter(btn);
            if (checkLetter(btn) !== btn) {
                missed += 1;
                hearts[missed - 1].src = "images/lostHeart.png";
            }
            checkWin()
        });
        if (winN) {
            return 
        } else if (winN === false) {
            return 
        }
    }

}


function checkLetter(btn) {
    const letters = document.getElementsByClassName("letter");
    var match = null;
    for (let i = 0; i < letters.length; i++) {
        if (btn === letters[i].textContent) {
            letters[i].classList.add("show");
            match = btn;
        }
    }
    return match;
}

function checkWin() {
    var liLetter = document.getElementsByClassName("letter");
    var liShow = document.getElementsByClassName("show");
    if (liLetter.length === liShow.length) {
        win()

    }
    if (missed === 5) {
        lose()

    }
}

function win() {
    overlay.className = "win";
    overlay.style.display = "flex";
    startButton.textContent = "Reset";
    winN = true;
}

function lose() {
    overlay.className = "lose";
    overlay.style.display = "flex";
    overlay.appendChild(resetbtn)
    winN = false;
    console.log("hello??");
}

function reset() {
    missed = 0;
    for (let i = 0; i < hearts.length; i++) {
        hearts[i].src = "images/liveHeart.png"
    }
    for (let i = 0; i < keyboard.length; i++) {
        keyboard[i].classList.remove("chosen");
        keyboard[i].disabled = false;
    }
 
}

resetbtn.addEventListener("click", function() {
    while (ul.firstChild) {
		ul.removeChild(ul.firstChild);
	}
    overlay.style.display = "none"
})
  


