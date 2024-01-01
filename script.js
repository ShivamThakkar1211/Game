let random = Math.floor(Math.random() * 10 + 1);

const userInput = document.getElementById('user');
const button = document.getElementById('submit');
const pGusses = document.getElementById('gusses');
const remaining = document.getElementById('remain');
const LoH = document.getElementById('loh');
const result = document.getElementById('result');
const guessSlot = document.getElementById('guessSlot'); // Define guessSlot

let prevGuess = [];
let gameActive = true;
let numGuess = 1;
let p;

const btn = document.querySelector('button');

if (gameActive) {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = userInput.value;
        validateNum(guess);
    });
}

function validateNum(guess) {
    if (isNaN(guess) || guess < 1 || guess > 10) {
        alert(`Please enter a valid number between 1 and 10`);
    } else {
        prevGuess.push(guess);
        if (numGuess >= 10) {
            displayGuess(guess);
            displayMessages(`Game Over. The number was ${random}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function displayGuess(guess) {
    userInput.value = '';
    pGusses.innerHTML += `${guess} `;
    numGuess++;
    remaining.innerHTML = `${10 - numGuess + 1}`;
}

function checkGuess(guess) {
    if (guess == random) {
        displayMessages('Congratulations, you guessed it right');
        endGame(); // Call endGame() to stop the game after correct guess
    } else if (guess > random) {
        displayMessages('Number is smaller');
    } else {
        displayMessages('Number is larger');
    }
}

function displayMessages(message) {
    LoH.innerHTML = `<h2>${message}</h2>`;
}

function newGame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function (e) {
        random = Math.floor(Math.random() * 10) + 1;
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - numGuess}`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        gameActive = true; // Reset the gameActive state
    });
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p = document.createElement('p');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
    startOver.appendChild(p);
    newGame();
    gameActive = false; // Set gameActive to false to stop the game
}
