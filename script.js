
const board = document.querySelector(".board");

let gameEnd = false;
const a = 2,b  = 14;
let score = 0;

let foodPosition  = {
    x:12,
    y:7
}

let snakeArr = [
    {x:9,y:9}
];

let lastPaintTime = 0;
let direction = {
    x:-1,
    y:0
}


function getRandomNumber(){
    return parseInt(a+(b-a)*Math.random());
}

function isOutOfBound(){
    const head = snakeArr[0];
    if(head.x<=0 || head.y<=0 || head.x>18 && head.y>18)
        return true;
    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[i].x === head.x && snakeArr[i].y === head.y)
            return true;
    }
    return false;
}

function runGameEngine(){
    if(isOutOfBound(snakeArr)){
        gameEnd  = true;
        board.innerHTML += `<div class="gameOver">Game Over</div>`;
        return;
    }
    //update snake array movement
    if(snakeArr[0].x === foodPosition.x && snakeArr[0].y === foodPosition.y){
        snakeArr.unshift({x:snakeArr[0].x+direction.x,y:snakeArr[0].y+direction.y});
        //update food position
        foodPosition = {x:getRandomNumber(),y:getRandomNumber()};
        score++;
    }
    snakeArr.unshift({x:snakeArr[0].x+direction.x,y:snakeArr[0].y+direction.y});
    snakeArr.pop();

    //prepare snakeHtml
    const snakeHtml = snakeArr.map((snakeBlock,index)=>{
        const {x,y} = snakeBlock;
        return `<div style="grid-row-start:${x};grid-column-start:${y}" class=${index===0?"head":"snake"}></div>`;
    }).join("");
    //prepare foodHtml
    const foodHtml = `<div style="grid-row-start:${foodPosition.x};grid-column-start:${foodPosition.y}" class="fruit"}></div>`
    const scoreHtml = `<div class="score">Score:${score}</div>`; 
    //inject to board
    board.innerHTML  = snakeHtml+foodHtml+scoreHtml;
}



function start(currentTime){
    if(!gameEnd)
        window.requestAnimationFrame(start);
    if(currentTime-lastPaintTime<200)
        return ;
    lastPaintTime  = currentTime;
    runGameEngine();
}





window.requestAnimationFrame(start);
window.addEventListener("keydown",({key})=>{
    switch(key){
        case "ArrowUp":
            direction = {x:-1,y:0}
            break;
        case "ArrowDown":
            direction = {x:1,y:0}
            break;
        case "ArrowLeft":
            direction = {x:0,y:-1}
            break;
        case "ArrowRight":
            direction = {x:0,y:1}
            break;
    }
})
