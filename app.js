var qwerty = document.getElementById("qwerty");
var phrase = document.getElementById("phrase");
var missed = 0;

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



const keyboard = document.querySelectorAll(".keyrow button");
keyboard.forEach(item => {
    item.addEventListener("click", event => {
        item.className = "chosen";
        btn = item.textContent;
        checkLetter(btn);
    })
})


function checkLetter(btn) {
    const letters = document.getElementsByClassName("letter");
    for (let i = 0; i < letters.length; i++) {
        if (btn === letters[i].textContent) {
            console.log(btn)
            letters[i].className += " show"
        }
    }

 
}



addPhraseToDisplay(phraseArray);