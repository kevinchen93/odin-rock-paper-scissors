	function computerPlay() {
	   	let computerSelection = Math.floor(Math.random()*3);
	   	let compPlay = ['rock', 'paper', 'scissors'];
		return compPlay[computerSelection];
	}
		
    function playRound(playerSelection, computerSelection) {
		let playerSelectionStr = playerSelection.toLowerCase();

		 /* case of a tie */
		if (playerSelectionStr === computerSelection) {
			return 'tie';
		}

		/* all other cases */
		let outcome;
		if (playerSelectionStr === 'rock') {
			if (computerSelection === 'paper') {
				outcome = 'lose';
			} else {
				outcome = 'win';
			}
		}

		if (playerSelectionStr === 'paper') {
			if (computerSelection === 'scissors') {
				outcome = 'lose';
			} else {
				outcome = 'win';
			}
		}

		if (playerSelectionStr === 'scissors') {
			if (computerSelection === 'rock') {
				outcome = 'lose';
			} else {
				outcome = 'win';
			}
		}
		return outcome;
	}


	function game() {

		const outcomeContainer = document.querySelector('.outcome');

		let playerScore = 0;
		let computerScore = 0;

		const playerScoreContainer = document.querySelector('.playerScore');
		const computerScoreContainer = document.querySelector('.computerScore');
		const allButtons = document.querySelectorAll('button');

		function capitalize(word) {
			return word[0].toUpperCase() + word.slice(1);
		}

		function updateScore() {
				playerSelection = this.dataset.selection;
				computerSelection = computerPlay();
				const outcome = playRound(playerSelection, computerSelection);

				if (outcome === 'win') {
					playerScore++;
					outcomeContainer.textContent = `You win! ${capitalize(playerSelection)} beats ${computerSelection}!`;
				} else if (outcome === 'lose') {
					computerScore++;
					outcomeContainer.textContent = `You lose! ${capitalize(computerSelection)} beats ${playerSelection}!`;
				} else if (outcome === 'tie') {
					outcomeContainer.textContent = 'Draw!';
				};
    
    
				if (playerScore == 5 || computerScore == 5) {
					
					allButtons.forEach(button => {
						button.removeEventListener('click', updateScore);
          			});

					const gameOverContainer = document.createElement('div');
					gameOverContainer.classList.add('GG');
					gameOverContainer.innerHTML = `${playerScore > computerScore ? 
												'<p>You win!</p>' : '<p>You lose!</p>'}`;

					const button = document.createElement('button');
					button.addEventListener('click', restartGame);
					button.textContent = 'Restart Game';
					gameOverContainer.appendChild(button);

					outcomeContainer.textContent = '';
					outcomeContainer.appendChild(gameOverContainer);

				};

				playerScoreContainer.textContent = `Player Score: ${playerScore}`;
				computerScoreContainer.textContent = `Computer Score: ${computerScore}`;
    };
        
        
    allButtons.forEach(button => {
		button.addEventListener('click', updateScore);
			});

		function restartGame() {
			playerScore = 0;
			computerScore = 0;
			outcomeContainer.textContent = '';
			playerScoreContainer.textContent = '';
			computerScoreContainer.textContent = '';

			allButtons.forEach(button => {
				button.addEventListener('click', updateScore);
			});
		}
	}

	game();