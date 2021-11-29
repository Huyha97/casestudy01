
// back-ground music
window.addEventListener('click',musicplay);
function musicplay(){
    document.getElementById("audio").play();
    window.removeEventListener('click',musicplay);
}

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
// create the unit
const box = 32;


// load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const specialImg = new Image();
specialImg.src = "img/gold.png";

const beerImg = new Image();
beerImg.src = "img/beer.png";

const hotdogImg = new Image();
hotdogImg.src = "img/hotdog.png";

const bananaImg = new Image();
bananaImg.src = "img/banana.png";

const noodleImg = new Image();
noodleImg.src = "img/noodle.png";


// game over function + win


document.addEventListener("change",win);
function win() {
    document.getElementById("win").innerHTML = " YOU WIN!!!"
}

document.addEventListener("change", gameOver);
function gameOver() {
    document.getElementById("demo").innerHTML = "GAME OVER!!!";
}
//

    function appearLater() {
        special = {
            x: Math.floor(Math.random() * 13 + 1) * box,
            y: Math.floor(Math.random() * 10 + 3) * box
        }
    }


// // load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};


// create the food

  let food = {
       x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 10 + 3) * box
     }


let special = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 10 + 6) * box
    }
let banana = {
    x: Math.floor(Math.random() * 10 + 1) * box,
    y: Math.floor(Math.random() * 11 + 5) * box
}
let beer = {
    x: Math.floor(Math.random() * 5 + 9) * box,
    y: Math.floor(Math.random() * 5 + 4) * box
}
let hotdog = {
    x: Math.floor(Math.random() * 12 + 1) * box,
    y: Math.floor(Math.random() * 10 + 3) * box
}

// create the score var

let score = 0;

//control the snake

let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key === 37 && d !== "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key === 38 && d !== "DOWN"){
        d = "UP";
        up.play();
    }else if(key === 39 && d !== "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key === 40 && d !== "UP"){
        d = "DOWN";
        down.play();
    }
}

// cheack va cham
function tuDie(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x === array[i].x && head.y === array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas

function draw() {

    function getRandomHex() {

        return Math.floor(Math.random() * 255);
    }

    function getRandomColor() {
        var red = getRandomHex();
        var green = getRandomHex();
        var blue = getRandomHex();
        return "rgb(" + red + "," + blue + "," + green + ")";
    }

    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "black" : ((i % 2 === 0) ? getRandomColor() : "white");
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = getRandomColor();
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    // draw food image

    ctx.drawImage(foodImg, food.x, food.y);
    ctx.drawImage(specialImg, special.x, special.y);
    ctx.drawImage(bananaImg, banana.x, banana.y);
    ctx.drawImage(hotdogImg, hotdog.x, hotdog.y);
    ctx.drawImage(beerImg, beer.x, beer.y);


    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // which direction
    if (d === "LEFT") snakeX -= box;
    if (d === "UP") snakeY -= box;
    if (d === "RIGHT") snakeX += box;
    if (d === "DOWN") snakeY += box;


    // if the snake eats the food

    if (snakeX === food.x && snakeY === food.y|| snakeX === beer.x && snakeY === beer.y|| snakeX === banana.x && snakeY === banana.y|| snakeX === hotdog.x && snakeY === hotdog.y) {
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 3 +9) * box,
            y: Math.floor(Math.random() * 2 + 10) * box
        };
        hotdog = {
            x: Math.floor(Math.random() * 16 + 1) * box,
            y: Math.floor(Math.random() * 14 + 3) * box
        };
        beer = {
            x: Math.floor(Math.random() * 10 + 2) * box,
            y: Math.floor(Math.random() * 15+ 3) * box
        };
        banana = {
            x: Math.floor(Math.random() * 6 + 10) * box,
            y: Math.floor(Math.random() * 2 + 9) * box
        };
    }
    else if (snakeX === special.x && snakeY === special.y ) {
        score += 10;
        eat.play();
        setInterval(appearLater,5000);
        // special = {
        //     x: Math.floor(Math.random() * 13 + 1) * box,
        //     y: Math.floor(Math.random() * 10 + 3) * box
        // }
    }
        // we don't remove the tail
    else
        {
            // remove the tail
            snake.pop();
        }


    let newHead = {
        x : snakeX,
        y : snakeY
    }

    // game over
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || tuDie(newHead,snake)) {
        clearInterval(game);
        dead.play();
        document.getElementById("audio").pause();
        gameOver();
    }
    if (score >= 100) {
        clearInterval(game);
        win();
    }
    snake.unshift(newHead);
    // score display area!!!
    ctx.fillStyle = "black";
    ctx.font = "60px Changa one";
    ctx.fillText(score,2*box,1.5*box);


}


// call draw function every 100 ms

let game = setInterval(draw,100);


















