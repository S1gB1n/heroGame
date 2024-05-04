let tileSize = 32;
let row = 26;
let col = 56;

let board;
let boardW = tileSize * col;
let boardH = tileSize * row;
let context;

//hero
let heroW = tileSize*2;
let heroH = tileSize;
let heroX = (boardW/2) - (boardW/4);
let heroY = (boardH/2) - (boardH/4);

let hero = {
    x: heroX,
    y: heroY, 
    w: heroW,
    h: heroH
}

let heroVelocity = tileSize/2;
let heroAlienImg;

window.onload = function(){
    board = document.getElementById("board");
    board.width = boardW;
    board.height = boardH;
    context = board.getContext("2d");

    heroAlienImg = new Image();
    heroAlienImg.src = "./sprite/alien.png";
    heroAlienImg.onload = function(){
        context.drawImage(heroAlienImg, hero.x, hero.y, hero.w, hero.h);
    }

    requestAnimationFrame(update);
    document.addEventListener("keydown", moveHero);
}

function update(){
    requestAnimationFrame(update);

    context.clearRect(0, 0, board.width, board.height);
    
    context.drawImage(heroAlienImg, hero.x, hero.y, hero.w, hero.h);


}


function moveHero(e){
    
    if(e.code == "ArrowLeft" && notWallCollision(hero.x, hero.y)){
        hero.x -= heroVelocity;
    }
    if(e.code == "ArrowRight" && notWallCollision(hero.x, hero.y)){
        hero.x += heroVelocity;
    }
    if(e.code == "ArrowUp" && notWallCollision(hero.x, hero.y)){
        hero.y -= heroVelocity;
    }
    if(e.code == "ArrowDown" && notWallCollision(hero.x, hero.y)){
        hero.y += heroVelocity;
    }
}

// implement wall collision: 2024-04-26
function notWallCollision(x, y){
    if((x >= 1 && x <= (boardW-tileSize*2)-1) && y >= 1 && y <= (boardH-tileSize)){
        return true;
    }else{
        if(hero.x < 1){
            hero.x = 1;
        }else if(hero.x > (boardW-tileSize*2)-1){
            hero.x = (boardW-tileSize*2)-1;
        }  

        if(hero.y < 1){
            hero.y = 1;
        }else if(hero.y > (boardH-tileSize)){
            hero.y = (boardH-tileSize)-1;
        }
    }
    
    return false;
}

// implement bullet
