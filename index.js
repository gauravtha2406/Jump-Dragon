gamestart=true;
score = 0;
cross = true,
audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');

setTimeout(() => {
    audio.play();
},1000);

document.onkeydown = (e) => {
    
    
    
   
    // console.log("key code is:-", e.keyCode);

    //for dragon jumping
    if (e.keyCode == 38) {
        dino = document.querySelector(".dino");
        dino.classList.add("animatedino");

        setTimeout(() => {
            dino.classList.remove("animatedino");
        }, 700)
    }

    //for forwaord arrow key
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        console.log(dinoX);
        dino.style.left = (dinoX + 112) + "px";
        
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }


}



setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.game-over');
    obstacle = document.querySelector('.obstacle');

    // to calculate distance between dragon and obstactle
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    // console.log("the value of x-axis of dino", dx);
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    // console.log("the value of y-axis of dino", dy);
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    // console.log("the value of x-axis of obstactle", ox);
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)


    //if collision happen then gameover
    if (offsetX < 70 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleani');
        dino.classList.add("dragonjump");
      
        
        audiogo.play();
        
       

        setTimeout(() => {
            audiogo.pause();
            audio.pause();
            dino.classList.remove("dragonjump");
        }, 1000);
         dino.addEventListener("animationend",()=>{
            dino.style.display="none";
         })
    }

    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }




}, 10);

function updateScore(score) {
    gamepoints = document.querySelector(".gamepoints");
    stage=document.querySelector(".stage");
    gamecont=document.querySelector(".game-container")
    gamepoints.innerHTML = "Your points: " + score;
    
   if(score==10){
   stage.innerHTML="STAGE 1 CLEARED";

   }
}
