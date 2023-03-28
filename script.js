//Retrieve and make some global constants
const gameContainer = document.getElementById("game");
const resetButton = document.getElementById("resetButton");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

//This boolean will tell whether the user has clicked their first card or their second card
let secondClick = false;
//This is a storage variable for the first clicked card
let firstCard;
//This boolean indicates whether the user can click on a card at all
let canClick = true;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    //Sets the boolean of whether the card has been matched
    newDiv.setAttribute('data-matched', "false");
    //Sets the boolean of whether the card has already been clicked, so the player cannot match it with itself
    newDiv.setAttribute('data-clicked', "false");


    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
  //Creates a listener for the reset button
  resetButton.addEventListener("click", resetGame);

}

function resetGame(event){
  //Prevents the page from refreshing
  //I could let it refresh to reset but I feel that would cause problems if I want to add more features
  event.preventDefault();
  //Reshuffles the colors
  shuffledColors = shuffle(COLORS);
  //Removes all the children (divs) of the game
  while (gameContainer.firstChild){
    gameContainer.removeChild(gameContainer.lastChild);
  }
  //Recreates the game board with reshuffled colors
  createDivsForColors(shuffledColors);
  console.log("Game reset!");
}


function handleCardClick(event) {
  
  //Checks if the user can even click
  if(canClick == false){
    //If they can't click, then nothing happens
    console.log("You can't click right now!");
    return
  }
  
  let clickedCard = event.target;
  
  //If the card has already been matched nothing happens
  if (clickedCard.dataset.matched == "true"){
    console.log('You already matched this card.');
    return;
  }
  
  //If the card has not already been matched
  if (clickedCard.dataset.matched == "false"){
    
    //But the card has already been clicked
    if (clickedCard.dataset.clicked == "true"){
      //Nothing happens
      information.innerText = 'You already clicked this card.';
      console.log('You already clicked this card.');
      return
    }
    
    //If the card has not been clicked yet and the user is able to click 
    if (clickedCard.dataset.clicked == "false" && canClick){
      console.log("This card has not been clicked yet.");
      //Sets that is had been clicked
      clickedCard.dataset.clicked = "true";
      //Sets the background color of the card
      clickedCard.style.backgroundColor = clickedCard.classList[0];
      
      //If it is the first card that has been clicked and the user can click
      if (secondClick == false && canClick){
        console.log("This is the first clicked card.");
        //Sets secondClick to true
        secondClick = true;
        //Saves the clicked card as the first card that has been clicked
        firstCard = clickedCard;
        return;
      }
      
      //If it is the second card that has been clicked and the user can  click
      if (secondClick == true && canClick){
        //Sets secondClick to false
        secondClick = false;
        
        //Compares the colors of the cards to see if they're equal
        if(firstCard.classList[0] == clickedCard.classList[0]){
          //If the are equal, sets that they have been matched
          firstCard.dataset.matched = "true";
          clickedCard.dataset.matched = "true";
          console.log("It's a match! :)");
          //Clears the firstCard
          firstCard = null;
          return;
        }
        
        //If the colors of the card do not match
        else{
          console.log("Not a match! :(");
          //Sets it so the user cannot click
          canClick = false;
          //Sets a timer of one second
          setTimeout(function(){
            //Sets that the cards have not been clicked
            firstCard.dataset.clicked = "false";
            clickedCard.dataset.clicked = "false";
            //Sets the background colors to white
            firstCard.style.backgroundColor = "white";
            clickedCard.style.backgroundColor = "white";
            //Clears the first card from storage
            firstCard = null;
            //Sets second click back to false
            secondClick = false;
            //Sets it so the user can click again
            canClick = true;
          },1000)

        }
      }
    }

  }


}

// when the DOM loads
createDivsForColors(shuffledColors);
