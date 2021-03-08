var qwerty = document.getElementById("qwerty");
var phrase = document.getElementById("phrase");
var missed = 0;
var hearts = document.querySelectorAll(".tries img");
var keyboard = document.querySelectorAll(".keyrow button");
var ul = document.querySelector("#phrase ul")
var winN = null

//start button to hide overlay and reset gameboard 
overlay = document.getElementById("overlay");
startButton = document.querySelector(".btn__reset");
startButton.addEventListener("click", function () {
    overlay.style.display = "none"
    removePhrase()
    reset()
    listen()
});


//phrases for players to guess
const phrases = ["first", "se co nd", "third", "fourth", "fifth one"];

//this function forms an array in "phraseLetters" from the letters of a string randomly selected from the array passed in as arr
function getRandomPhraseAsArray(arr) {
    var phraseArray = Array.from(arr[Math.floor(Math.random() * arr.length)]);
    return phraseArray;
}


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


//adds the random phrase to the page and begins listening for clicks on all keyboard buttons
//checks the textcontent of the button againsts the value returned by checkletter
//checks if the game has been won or lost by calling the checkwin function, if eithher condition is met it returns to close the fucntion
function listen() {
    var phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
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

//takes the textvalue of the selected button and compares it to the phrase. If it matches it adds the .show class to the matching letter.
//always returns the value of the selected button
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
//function that compares the length of shown letters to all letters
//also checks if the game has been lost if the missed counter reaches 5
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
    startButton.textContent = "Reset game";
    winN = true;
}
function lose() {
    overlay.className = "lose";
    overlay.style.display = "flex";
    startButton.textContent = "Reset game";
    winN = false;
}

//resets the game by changing the src of all hearts to the liveheart.png
//removes the chosen class from the keyboard buttons and re-enables them
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


//a function that loops to remove all the children of the ul containing the letters
function removePhrase() {
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}



