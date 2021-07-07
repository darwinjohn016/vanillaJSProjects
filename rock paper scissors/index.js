const playerHand = document.querySelector('.player-hand');
const computerHand = document.querySelector('.computer-hand');
const playerScore = document.querySelector('.player-score');
const computerScore = document.querySelector('.computer-score');
const buttons = document.querySelector('.buttons');
const winnerNotif = document.querySelector('.winner-notif');

Array.from(buttons.children).forEach(btn => btn.addEventListener('click',displayPlayerHand));

const shuffleComputerHand = (() =>
{
    let count = 0;
    return () =>
    {
        Array.from(computerHand.children).forEach((sign,index) => count === index ? sign.style.display="block" : sign.style.display = "none")
        count++;
        if(count === Array.from(computerHand.children).length) count = 0;  
    }
})();

let interval = null;

const runShuffleHands = ()=> interval = setInterval(shuffleComputerHand,500);
runShuffleHands();

const stopShuffleHands = ()=> 
{
    clearInterval(interval);   
    Array.from(computerHand.children).forEach(sign => sign.style.display = "none");
}

function displayPlayerHand(e)
{
    let playerHandSign = "";
    Array.from(playerHand.children).forEach(sign=>
    {
        if (e.target.dataset.value === sign.dataset.value)
        {
            sign.style.display = "block";
            playerHandSign = sign.dataset.value;
        }
        else sign.style.display = "none";
    })
    stopShuffleHands();
    displayComputerHand(playerHandSign);
}

function displayComputerHand(playerHandSign)
{
    let computerHandSign = "";
    let randomNum = Math.floor(Math.random()* Array.from(computerHand.children).length);
    Array.from(computerHand.children).forEach((sign,index) => 
    {
        if(randomNum === index) 
        {
            sign.style.display = "block";
            computerHandSign = sign.dataset.value;
            handSignValidation(playerHandSign,computerHandSign);
        }
        else sign.style.display = "none";
    })
}

function handSignValidation(playerHandSign,computerHandSign)
{
    let player = "Player";
    let computer = "Computer";
    if(playerHandSign === computerHandSign) winnerNotif.textContent = "It's A Tie!";

    else if(playerHandSign === "rock") computerHandSign === "scissors" ?  addScore(player) :  addScore(computer);
    
    else if(playerHandSign === "scissors") (computerHandSign === "paper") ?  addScore(player) :  addScore(computer);
   
    else if(playerHandSign === "paper") (computerHandSign === "rock") ?  addScore(player) :   addScore(computer); 
}

const addScore = (()=>
{
    let playerScores = 0;
    let computerScores = 0;

    return (name) =>
    {
        if(name === "Player")
        {
            winnerNotif.textContent = "Player Wins This Round!";
            playerScores++;
            playerScore.textContent = playerScores;
        }
        else
        {   
            winnerNotif.textContent = "Computer Wins This Round!";
            computerScores++;
            computerScore.textContent = computerScores;
        }
    }
})();










