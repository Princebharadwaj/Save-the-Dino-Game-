


console.log("SAVE THE DRAGON !");

//Music Elements
const soundGame = new Audio('game.mp3');
const soundStart = new Audio('start.mp3');
const soundJump = new Audio('jump.mp3');
const soundOver = new Audio('over.mp3');



const start = document.getElementById("start");
const horse = document.querySelector(".horse img");
const witch = document.getElementById("witch");
const tree = document.getElementById("tree");
const restart = document.getElementById("restart");
const home = document.getElementById("home");
const display = document.getElementById("display");
const score = document.getElementById("score");
let currentScore = -1;
let isrunning = true;


//To start the game 
start.addEventListener("click",()=>{
    start.style.display = "none";
    horse.style.display = "none";
    witch.style.opacity = "1";
    display.style.display = "block";
    tree.style.animation = "treeMoving 5s linear  infinite";
    isrunning = true;
    soundStart.play();
    soundGame.play();
})


// To movement in dragon with keys 
window.addEventListener("keydown",(event)=>{
    console.log(event.key);
    if(event.key =="ArrowUp"){
        witch.style.animation = "witchJump 1.5s ease-in-out";
        setTimeout(()=>{
            witch.style.animation = "";
        },1500)
        soundJump.play();

    }else if(event.key =="ArrowRight"){
        let currentRight = parseInt(window.getComputedStyle(witch,null).getPropertyValue("right"));
        witch.style.right = (currentRight - 120) + "px";
        soundJump.play();

    }else if(event.key =="ArrowLeft"){
        let currentRight = parseInt(window.getComputedStyle(witch,null).getPropertyValue("right"));
        witch.style.right = currentRight + 120 + "px";
        soundJump.play();

    }
})

// To restart the Game 
restart.addEventListener("click",()=>{
    currentScore = -1;
    document.getElementById("gameOver").style.display = "none";
    start.style.display = "none";
    horse.style.display = "none";
    witch.style.opacity = "1";
    tree.style.animation = "treeMoving 5s ease-in-out  infinite";
    witch.style.right = "80vw";
    soundStart.play();
    soundGame.play();
})

//To go to home page 
home.addEventListener("click",()=>{
    soundStart.play();
    location.reload();
})


//To check,  Is tree touched the dragon 
setInterval(() => {

    //To get current value of right or left with getComputedStyle() method during animation 
    wx = parseInt(window.getComputedStyle(witch,null).getPropertyValue("right"));
    wy = parseInt(window.getComputedStyle(witch,null).getPropertyValue("top"));
    
    tx = parseInt(window.getComputedStyle(tree,null).getPropertyValue("right"));
    ty = parseInt(window.getComputedStyle(tree,null).getPropertyValue("top"));

    //difference between tree and dragon 
    x = Math.abs(wx - tx);
    y = Math.abs(wy - ty);

    //if differnce between tree and dragon is less than 90px from right and 80px from top,then gameover
    if(x < 90 && y < 80){
        document.getElementById("gameOver").style.display = "block";
        tree.style.animation = "";
        soundOver.play();
        
    }
    //to check the score 
    else if (x<140 && isrunning){
        currentScore+=1;
        updateScore(currentScore);
        isrunning = false;
        setTimeout(()=>{
            isrunning = true;
        },1000);
    }
}, 50);


//To update the value of score in display and score Element .
function updateScore(currentScore){
    display.innerHTML = "Score : " + currentScore;
    score.innerHTML = "Your Score : " + currentScore; 
}

