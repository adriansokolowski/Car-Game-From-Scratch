const startScreen = document.querySelector('#startScreen');
const score = document.querySelector('#score');
const play = document.querySelector('#play');
const gameArea = document.querySelector('#gameArea');
const finalScore = document.querySelector('#finalScore');
const scoreLabel = document.querySelector('#scoreLabel');
const livesLabel = document.querySelector('#livesLabel');

var audio = new Audio('assets/music.mp3');


let player = {
    speed: 0.5, score: 0, lives: 333
};

let keys = {
    ArrowUp: false
    , ArrowDown: false
    , ArrowRight: false
    , ArrowLeft: false
};

document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

startScreen.addEventListener("click", start);

function pressOn(e) {
    e.preventDefault();
    keys[e.key] = true;
}

function pressOff(e) {
    e.preventDefault();
    keys[e.key] = false;
}

function start() {
    audio.play();
    startScreen.classList.add("hide");
    gameArea.classList.remove("hide");
    player.start = true;
    player.score = 0;
    for (let x = 0; x < 12; x++) {
        let div = document.createElement("div");
        div.classList.add("line");
        div.y = x * 10;
        div.style.top = (x * 10) + "vh";
        play.appendChild(div);
    }

    window.requestAnimationFrame(playGame);

    let car = document.createElement("div");
    car.setAttribute("class", "car");
    play.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    player.x = 15;
    player.y = 82;

    // funkcja tworząca pojazdy na ekranie
    for (let x = 0; x < 3; x++) {
        let enemy = document.createElement("div");
        enemy.classList.add("enemy");
        enemy.y = ((x + 1) * 100) * -1;
        enemy.style.top = enemy.y + "vh";
        enemy.style.left = Math.floor(Math.random() * 30) + "vh";
        enemy.style.backgroundColor = "vh";
        play.appendChild(enemy);
    }
}

function moveLines() {
    let lines = document.querySelectorAll(".line");
    lines.forEach(function (item) {
        if (item.y >= 110) {
            item.y -= 120;
        }
        item.y += player.speed;
        item.style.top = item.y + "vh";
    })
}

function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
        (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function moveEnemy(car) {
    let ele = document.querySelectorAll(".enemy");
    ele.forEach(function (item) {
        if (isCollide(car, item)) {
            endGame();
        }
        if (item.y >= 100) {
            item.y = -140;
            item.style.left = Math.floor(Math.random() * 30) + "vh";
        }
        item.y += player.speed / 2;
        item.style.top = item.y + "vh";
    })
}

function playGame() {
    let car = document.querySelector(".car");
    moveLines();
    moveEnemy(car);

    if (player.start) {
        if (keys.ArrowUp && player.speed >= 0) {
            player.speed = 1;
        }
        if (keys.ArrowLeft && player.x > 2) {
            player.x -= 1;
        }
        if (keys.ArrowRight && player.x < 28) {
            player.x += 1;
        }
        car.style.left = player.x + 'vh';
        car.style.top = player.y + 'vh';
        window.requestAnimationFrame(playGame);
        player.score++;
        scoreLabel.innerText = player.score;
        livesLabel.innerText = player.lives;
    }
}

function endGame() {
    if (player.lives > 0) {
        player.lives--;
    } else {
        player.start = false;
        // gameArea.classList.add("hide");
        // finalScore.classList.remove("hide");
        audio.pause();
    }
}
