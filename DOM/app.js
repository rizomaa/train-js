/* 
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;    

init(); 

document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if (gamePlaying) {
    
        //1. Push random HTMLButton
        var  dice = Math.floor( Math.random() * 6) + 1;
        //2. To display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';  
        diceDOM.src = 'dice-' + dice + '.png';

        //3. Update round scores If the rolled number in not 1.
        if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Change player
           NextPlayer();   
        }
        
    }
   
 
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    
    
    if (gamePlaying) {
    
        // Save round result
        scores[activePlayer] = scores[activePlayer] + roundScore;

        // Update global scores for active player
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

         //Check if a player won a game
        if (scores[activePlayer] >= 50) {

            document.querySelector("#name-" + activePlayer).textContent = 'WINNER!!!';
            document.querySelector(".dice").style.display = 'none';

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;

        }  else {
            NextPlayer();    
        }
    
    }
 
});
 
function NextPlayer() {
    
    activePlayer = (activePlayer === 0 ? 1 : 0);

    roundScore = 0;

    //Refresh data
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('#current-0').textContent = '0';        

    //Change active look
    document.querySelector('.player-0-panel').classList.toggle('active');    
    document.querySelector('.player-1-panel').classList.toggle('active');

  //  document.querySelector('.dice').style.display = 'none';

    
}


document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;   
    gamePlaying = true;
    
    
    document.getElementById('current-0').textContent =  '0';
    document.getElementById('current-1').textContent =  '0';
    
    document.getElementById('score-1').textContent =  '0';
    document.getElementById('score-0').textContent =  '0';
    
    document.getElementById("name-0").textContent = 'Player 1';
    document.getElementById("name-1").textContent = 'Player 2';
        
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    document.querySelector('.dice').style.display = 'none';

}