let tileSize = 32;
let row = 24;
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

const gunPositionMap = {};
gunPositionMap["up"]    = [0, -1];
gunPositionMap["down"]  = [0, 1];
gunPositionMap["left"]  = [-1, 0];
gunPositionMap["right"] = [1, 0];
let gunPos = "right";

let hero = {
    x: heroX,
    y: heroY, 
    w: heroW,
    h: heroH,

    gunPosition: gunPos
}


//bullets
let bulletArray = [];
let bulletVel = 10;


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
    document.addEventListener("keyup", bullet);
}

function update(){
    requestAnimationFrame(update);

    context.clearRect(0, 0, board.width, board.height);
    
    context.drawImage(heroAlienImg, hero.x, hero.y, hero.w, hero.h);

    for(let i = 0; i < bulletArray.length; i++){
        let bullet = bulletArray[i];
        bullet.x += gunPositionMap[bullet.gunPosition][0]*bulletVel;
        bullet.y += gunPositionMap[bullet.gunPosition][1]*bulletVel;

        context.fillStyle="white";
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }
}


function moveHero(e){
    
    if(e.code == "ArrowLeft" && notWallCollision(hero.x, hero.y)){
        hero.x -= heroVelocity;
        hero.gunPosition = "left";
    }
    if(e.code == "ArrowRight" && notWallCollision(hero.x, hero.y)){
        hero.x += heroVelocity;
        hero.gunPosition = "right";
    }
    if(e.code == "ArrowUp" && notWallCollision(hero.x, hero.y)){
        hero.y -= heroVelocity;
        hero.gunPosition = "up";
    }
    if(e.code == "ArrowDown" && notWallCollision(hero.x, hero.y)){
        hero.y += heroVelocity;
        hero.gunPosition = "down";
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


// AABB collision
function collisionDetec(){


}


// implement bullet
function bullet(e){
    if(e.code == "Space"){
        let bx, by, wTileSize, hTileSize;
        let gunPos = hero.gunPosition;

        if(hero.gunPosition == "left" || hero.gunPosition == "right"){
            bx = hero.x;
            by = hero.y + heroH*15/32;
            wTileSize = tileSize/2;
            hTileSize = tileSize/8; 
        }else{
            bx = hero.x + heroW*15/32;
            by = hero.y;
            wTileSize = tileSize/8;
            hTileSize = tileSize/2;
        }

        let bullet = {
            x : bx,
            y : by,
            width : wTileSize,
            height: hTileSize,
            gunPosition: gunPos 
        }
        bulletArray.push(bullet);
    }
}