let keyboard = document.querySelector(".keyboard");
let wordDisplay = document.querySelector(".word-display");
let guessingText = document.querySelector(".guessing-text");
let gameModal = document.querySelector(".game-modal");
let playAgainBtn = document.querySelector(".play-again");
let image = document.querySelector(".image");


let currentWord, correctLetters=[], wrongGuessCount=0;
const maxGuess= 6;

//play again 
const resetGame = () =>{
  correctLetters = [];
  wrongGuessCount = 0;
  wordDisplay.innerHTML = currentWord.split("").map(() => ` <li class="letter"></li>`).join("");
  keyboard.querySelectorAll("button").forEach(btn => btn.disabled = false)
  gameModal.classList.remove("show")
  image.src = `./assets/image0.png`;
  guessingText.innerText = `Incorrect guesses :  ${wrongGuessCount} / ${maxGuess}`;

}
//getRandom Words
const getRandomWords = () =>{
    const {word , hint} = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word,hint);
    currentWord = word;
    document.querySelector(".hint-text").innerHTML = "Hint: " +hint;
    resetGame();
    
}

//result (Victory or lost)
const gameOver = (isVictory) =>{
  setTimeout(() =>{
    const modalText = isVictory ? `You Found the word :`:`The correct word was :`;
    gameModal.querySelector("img").src = `assets/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h3").innerText = `${isVictory ? 'Congrats' : 'Game Over'}`;
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
gameModal.classList.add("show")
  },300)
}

//playing game and updating HTML values
const initGame = (button, clickedLetter ) =>{
  console.log(button , clickedLetter);
  if(currentWord.includes(clickedLetter)){
  [...currentWord].forEach((letter, index) =>{
    if(letter === clickedLetter){
      correctLetters.push(letter)
      wordDisplay.querySelectorAll("li")[index].innerText = letter;
      wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
    }
  })
  }else{
    wrongGuessCount++;
    image.src = `./assets/image${wrongGuessCount}.png`;
  }
  button.disabled = true;
  guessingText.innerText = `Incorrect guesses :  ${wrongGuessCount} / ${maxGuess}`;

  if(wrongGuessCount === maxGuess) return gameOver(false);
  if(correctLetters.length === currentWord.length) return gameOver(true);
}

//Creating keyboard buttons and adding event listener
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboard.appendChild(button);
  button.addEventListener("click", e => initGame(e.target , String.fromCharCode(i)))
}
getRandomWords();
playAgainBtn.addEventListener("click",getRandomWords)