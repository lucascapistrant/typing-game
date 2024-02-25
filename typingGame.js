const words = ["elephant","computer","umbrella","triangle","bicycle","tomorrow","sunshine","backpack","freedom","calendar","whisper","colorful","mountain","symphony","birthday","delicious","landscape","happiness","favorite","knowledge","wonderful","beautiful","community","direction","challenge","important","celebrate","potential","discovery","education","fantastic","victory","sparkle","mysterious","captivate","excitement","reflection","experience","adventure","together","marvelous","delightful","curiosity","invisible","innovation","serenity","creative","efficiency","different","incredible","adjective","chocolate","celestial","wholesome","meditate","invention","potential","challenge","perfection","happiness","efficiency","knowledge","celebrate","curiosity","beautiful","experience","adventure","creativity","favorite","wonderful","community","discovery","reflection","victorious","fantastic","adjective","invisible","innovation","serenity","delightful","efficiency","different","incredible","celestial","together","captivate","whisper","umbrella","triangle","bicycle","tomorrow","sunshine","backpack","freedom","calendar","symphony"];
let health = 100;
let healthDecrease = .05;
let gameIsGoing = false;

let preivousWord;
function randomWord() {
    return words[Math.floor(Math.random() * (words.length))];
}

const wordbox = document.getElementById('wordbox');
let letters;
function stringToSpan() {
    letters = randomWord().split('');
    letters.forEach(l => {
        const span = document.createElement('span');
        span.classList.add('letter');
        span.innerHTML = l;
        wordbox.appendChild(span);
    })
    return letters;
}

function letterUpdate(l) {
    const firstChild = wordbox.children[l];
    firstChild.classList.add('letter-completed')
}

let lettersCompeted = -1;
document.addEventListener('keydown', e => {
    if(gameIsGoing) {
        let nextLetter = letters[0];
        if(e.key === nextLetter) {
            lettersCompeted++
            letterUpdate(lettersCompeted);
            letters.shift();
            nextLetter = letters[0];
        }
        if(letters.length <= 0) wordComplete();
    }
})

function wordComplete() {
    health += 10;
    if(health > 100) health = 100;
    lettersCompeted = -1;
    wordbox.innerHTML = '';
    stringToSpan();
}

// timer

const timeBar = document.getElementById('timeRemaining');

function healthUpdate() {
    console.log('is going')
    if(health <= 0) endGame();
    health -= healthDecrease;
    timeBar.style.width = `${health}%`
}

// dropdown menu

const options = document.querySelectorAll('.dropdown-option');

options.forEach(option => {
    option.addEventListener('click', () => {
        health = 100;
        options.forEach((option) => {option.style.backgroundColor = '#fff'});
        if(option.value == 'easy') {
            healthDecrease = .025;
        } else if(option.value == 'medium') {
            healthDecrease = .05;
        } else if(option.value == 'hard') {
            healthDecrease = .1;
        }
        option.style.backgroundColor = 'red';
    })
})

// ui

const startBtn = document.getElementById('start');
const endPopup = document.getElementById('endGame');
let healthInterval;

startBtn.addEventListener('click', () => {startGame();})

function startGame() {
    if(!gameIsGoing) {
        endPopup.style.display = 'none';
        wordbox.innerHTML = '';
        gameIsGoing = true;
        stringToSpan();
        healthInterval = setInterval(healthUpdate, 10);
        health = 100;
    }
}

function endGame() {
    endPopup.style.display = 'block';
    gameIsGoing = false;
    clearInterval(healthInterval);
}