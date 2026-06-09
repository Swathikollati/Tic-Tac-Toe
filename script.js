const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

const xScoreEl = document.getElementById("xScore");
const oScoreEl = document.getElementById("oScore");
const drawScoreEl = document.getElementById("drawScore");

let currentPlayer = "X";
let gameActive = true;

let board = ["","","","","","","","",""];

let xScore = 0;
let oScore = 0;
let drawScore = 0;

const winningConditions = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

cells.forEach(cell=>{
cell.addEventListener("click",handleCellClick);
});

function handleCellClick(){

const index = this.dataset.index;

if(board[index]!=="" || !gameActive){
return;
}

board[index]=currentPlayer;
this.textContent=currentPlayer;

checkWinner();
}

function checkWinner(){

for(let condition of winningConditions){

const [a,b,c]=condition;

if(
board[a] &&
board[a]===board[b] &&
board[a]===board[c]
){

cells[a].classList.add("winner");
cells[b].classList.add("winner");
cells[c].classList.add("winner");

statusText.textContent=`Player ${currentPlayer} Wins!`;

if(currentPlayer==="X"){
xScore++;
xScoreEl.textContent=xScore;
}
else{
oScore++;
oScoreEl.textContent=oScore;
}

gameActive=false;
return;
}
}

if(!board.includes("")){

statusText.textContent="Match Draw!";

drawScore++;
drawScoreEl.textContent=drawScore;

gameActive=false;
return;
}

currentPlayer=currentPlayer==="X"?"O":"X";

statusText.textContent=`Player ${currentPlayer}'s Turn`;
}

restartBtn.addEventListener("click",restartGame);

function restartGame(){

board=["","","","","","","","",""];

currentPlayer="X";
gameActive=true;

statusText.textContent="Player X's Turn";

cells.forEach(cell=>{
cell.textContent="";
cell.classList.remove("winner");
});
}