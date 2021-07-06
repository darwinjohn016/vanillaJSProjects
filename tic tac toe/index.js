const tictactoeBx = document.querySelectorAll('.tictactoe-bx');
const playerXScoreboard = document.querySelector('.player-X-score');
const playerOScoreboard = document.querySelector('.player-O-score');
const playerNotif = document.querySelector('.player-notif');

tictactoeBx.forEach(bx => bx.addEventListener('click',getValue));

function playerTurns(currentRound)
{
    let playerTurn = "";
    currentRound % 2 === 0 ? playerTurn = "Player X" : playerTurn = "Player O";
    return playerTurn;
}

const currentRounds = (()=>
{
    let round = 0;
    return ()=> round++;
})();


function getValue(e)
{
    if(e.target.textContent !== "") return;

    let currentRound = currentRounds();

    let playerTurn = playerTurns(currentRound);
    
    if(playerTurn === "Player X")
    {
        e.target.textContent = "X"; 
        playerNotif.textContent = "Player O's Turn";     
    }
    else
    {
        e.target.textContent = "O";
        playerNotif.textContent = "Player X's Turn";
    }
    
    let playerValue = parseInt(e.target.dataset.value);

    tallyValues(playerTurn,playerValue);

}

const tallyValues = (()=>
{
    let playerXSum = [];
    let playerOSum = [];

    return (playerTurn,playerValue)=>
    {
        playerTurn === "Player X" ? playerXSum.push(playerValue) : playerOSum.push(playerValue);

        for(let i=0; i<9; i++)
        {
            for(let j=i+1; j<9; j++)
            {
                for(let k=j+1; k<9; k++)
                {
                    if(playerXSum[i] + playerXSum[j] + playerXSum[k] === 15) 
                    {
                        addPlayerScore(playerTurn);
                        playerXSum = [];
                        playerOSum = [];
                    }
                    else if(playerOSum[i] + playerOSum[j] + playerOSum[k] === 15)
                    { 
                        addPlayerScore(playerTurn);
                        playerXSum = [];
                        playerOSum = [];
                    }
                }
            }
        }
        
        if(playerXSum.length === 5 || playerOSum.length === 5)
        {
            alert("Its A Tie!");
            resetGame();
            playerXSum = [];
            playerOSum = [];
        }
    }
})();


const addPlayerScore = (() =>
{
    let playerXScore = 0;
    let playerOScore = 0;

    return (playerTurn) =>
    {
        if(playerTurn === "Player X")
        {
            playerXScore++;
            playerXScoreboard.textContent = playerXScore;
            alert(playerTurn + " wins!");
            resetGame();
        }
        else
        {
            playerOScore++;
            playerOScoreboard.textContent = playerOScore;
            alert(playerTurn + " wins!");
            resetGame();
        }
    }
})();

const resetGame = ()=> tictactoeBx.forEach(bx=> bx.textContent = "");


   








