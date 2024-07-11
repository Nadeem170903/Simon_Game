let gameSqu = [];
let userSqu = [];

let btns = ["red","green", "yellow","blue"];

let level = 0;

let start = false;
let h2 = document.querySelector("h2");




document.addEventListener("keypress",gameStart);


function gameStart(){
   
    if(start == false){
        start = true;
        levelUp();   
    }

      
    
};


function flashbtn(btn){
    btn.classList.add("flash"); 
    

    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userbtn(btn){
    btn.classList.add("user-flash"); 

    setTimeout(function(){
        btn.classList.remove("user-flash");
    },250);
}

function levelUp(){
    userSqu=[];
    level++;
    h2.innerText = `level ${level}`;
let randIdx = Math.floor(Math.random()*3);
let randColor = btns[randIdx];
let randbtn = document.querySelector(`.${randColor}`);
console.log(randIdx);
console.log(randColor);
console.log(randbtn);
    flashbtn(randbtn);

    gameSqu.push(randColor);

    console.log(gameSqu);
   


};

function matchAns(idx){
   
   if(userSqu[idx]==gameSqu[idx]){
    if(userSqu.length == gameSqu.length){
        levelUp();
    }
   } else{
    h2.innerHTML = `Game is over. your score is <b>${level}</b> start the game press any key`;
gameover();
   reset();

   }

}

function btnpress(){
    let btn = this;
    flashbtn(btn);
    userbtn(btn);

    let userColor = btn.getAttribute("id");
    userSqu.push(userColor);
    console.log(userSqu);

    matchAns(userSqu.length-1);


}


let allbtn = document.querySelectorAll(".btn");

for(let i = 0 ; i<allbtn.length; i++){
    allbtn[i].addEventListener("click",btnpress);
}


function reset(){
    level = 0;
    userSqu=[];
    gameSqu=[];
    start = false;
}



function gameover(){
  document.querySelector("body").style.backgroundColor = "red";
  setTimeout(function(){
    document.querySelector("body").style.backgroundColor = "white";
  },250);
}