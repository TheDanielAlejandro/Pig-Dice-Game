/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game.
- The players can set the score.

*/


//Creating the variables.

var scores, roundScore, activePlayer, gamePlay, maxScore;


init();

var lastDice;
var lastDice1;

document.querySelector('.btn-roll').addEventListener('click', function(){  //selecting the button class "roll" an add a 'Anonymous function' (a function that doesn't have a name so can't be reused) when there is the action 'click'.
 
//Output of the event 'click'

if(gamePlay){  //Untill the value of the var gamePlay is true the game is still on, the only way to become false is to reach the maxScore.

  //1.  2 Random Numbers for the dices.

  var dice = Math.floor(Math.random() * 6) + 1;     //calculate a random number between 1/6 and store it in the var 'dice'
  var dice1 = Math.floor(Math.random() * 6) + 1;    //calculate a random number between 1/6 and store it in the var 'dice1'


  
  //2. Display the results.

  var diceDOM =  document.querySelector('.dice');   // Store in the var 'diceDOM' the  selector for the class dice (image).
  diceDOM.style.display = 'block';                  // remove the hide attribute given before, to make the img visible.
  diceDOM.src = 'Images/dice-' + dice + '.png';            // select the right image in base of the Output of 'dice'.

  var diceDOM1 =  document.querySelector('.dice1'); // The same operation, only for the second dice.
  diceDOM1.style.display = 'block'; 
  diceDOM1.src = 'Images/dice-' + dice1 + '.png';
  console.log(dice);

  //3. Update the round score IF the rolled number was NOT a '1'

  if(dice !== 1 && dice1 !== 1){
    roundScore += (dice + dice1);
    document.getElementById('current-' + activePlayer).textContent = roundScore;
  }else{
    nextPlayer();
  }

  // Extra feature: document.querySelector('.dice').style.display='none';  Makes the dice dissapear when there is a change of player.

  lastDice = dice;
  lastDice1 = dice1;
  }
  
});



document.querySelector('.btn-hold').addEventListener('click', function(){ //adding a function to the button hold.

  //Output of the event click

   if(gamePlay){   //Untill the value of the var gamePlay is true the game is still on, the only way to become false is to reach the maxScore.

    scores[activePlayer] += roundScore; // Setting the value obtained from the 'roundScore'(UI current box) into the array (selecting the active player) for the score of both players.
    
    //1. Save the value selected by the player in the respective 'player score'.
    
    document.getElementById('score-'+ activePlayer).textContent = scores[activePlayer]; // set the number in the html file.
    
    //2. Check if the player won
    
    if(scores[activePlayer] >= maxScore){  //What happens when one player reachs the final score.
      document.getElementById('name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice1').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlay = false; // finishing the game.
    }else{
      nextPlayer();
    }
   }

});


document.querySelector('.btn-new').addEventListener('click', init); //Using the function init to restart the game from 0 for the button 'new'.


document.querySelector('.submitBtn').addEventListener('click', function(){ //Using a function to set the max score for the button 'Maximum score'.
 
  //output click
  
  //1.get the value of the input number
  //2. store it in a variable
  //3. replace it in the game

   maxScore = document.querySelector('.scoreSelector').value;

})




function nextPlayer(){  // Function for changing the player.
  roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScore;
    activePlayer === 0 ?  activePlayer = 1 : activePlayer = 0;  // Ternary operator that setting the index for the array changing each time there is a 1 .
    document.querySelector('.player-0-panel').classList.toggle('active');  // The toggle method, toggles a boolean attribute. removes it if present, adds it if absent.
    document.querySelector('.player-1-panel').classList.toggle('active');
}



function init(){        // Function to reset the game.

//Adding a value to the variables.
scores = [0, 0];   // the array for the both scores.
roundScore = 0;   // A variable for keeping track of the additions
activePlayer = 0; //the index for chosing the element in the array, so between 0 and 1.
gamePlay = true; //state variable to end the game when there is a winner.

counterSix = 0;
maxScore = 100;

document.getElementById('score-0').textContent = '0';  //Setting all the values of the game to '0',
document.getElementById('score-1').textContent = '0';  // Since all 4 are id's we use getElementById('id') because it's faster. and there is no need for the #
document.getElementById('current-0').textContent = '0';// but we could have used the querySeletor. Instead here the # was required
document.getElementById('current-1').textContent = '0';
document.querySelector('.dice').style.display = 'none';  // hiding the img of the dice, setting it's css value to 'none'.

document.querySelector('.dice1').style.display = 'none';  // hiding the second img for the 2 dice.

document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';

document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');

document.querySelector('.player-0-panel').classList.add('active');

}






//_____________________________________
//Extra code

/* Alternative line 23.

We could have use this if we wanted to use the function 'roll' in another query.
var roll = function(){
  //do something.
}

document.querySeletor('.btn-roll').addEventListener('click', roll);

*/

/* Alternative line 45.
if(activePlayer === 0){
  activePlayer = 1;
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.add('active');
}else{
  activePlayer = 0;
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

*/

/* Alternative line 45 in case we would like to add the feature: when you roll 2 '6' consecutive. 
if(dice === 6 && lastDice === 6){
    scores[activePlayer] = 0;
    nextPlayer();
    if(dice1 === 6 && lastDice1 === 6){
      scores[activePlayer] = 0;
      nextPlayer();

    } 
  } else 
 
  */
