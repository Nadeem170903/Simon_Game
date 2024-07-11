// Initialize game variables
let gameSqu = []; // Stores the sequence of colors generated by the game
let userSqu = []; // Stores the sequence of colors clicked by the user

// Array of button colors available in the game
let btns = ["red", "green", "yellow", "blue"];

let level = 0; // Current level of the game
let start = false; // Flag to indicate if the game has started
let h2 = document.querySelector("h2"); // Reference to the <h2> element for displaying game status

// Event listener to start the game when any key is pressed
document.addEventListener("keypress" , gameStart);
document.addEventListener("click", gameStart);

function gameStart() {
    if (!start) { // If the game hasn't started yet
        start = true; // Set start flag to true
        levelUp(); // Start the first level of the game
    }
}

// Function to animate button flash effect
function flashbtn(btn) {
    btn.classList.add("flash"); // Add flash class to the button

    // Remove flash class after 250ms
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

// Function to animate user button click effect
function userbtn(btn) {
    btn.classList.add("user-flash"); // Add user-flash class to the button

    // Remove user-flash class after 250ms
    setTimeout(function() {
        btn.classList.remove("user-flash");
    }, 250);
}

// Function to move to the next level of the game
function levelUp() {
    userSqu = []; // Clear user's sequence for the new level
    level++; // Increment the game level
    h2.innerText = `Level ${level}`; // Update the <h2> text to show current level

    // Generate a random index to select a button color
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx]; // Randomly select a color from btns array
    let randbtn = document.querySelector(`.${randColor}`); // Select the button element with the corresponding color
    flashbtn(randbtn); // Flash the selected button
    gameSqu.push(randColor); // Add the selected color to the game sequence
}

// Function to check if the user's sequence matches the game's sequence
function matchAns(idx) {
    if (userSqu[idx] === gameSqu[idx]) { // If the current user input matches the game sequence
        if (userSqu.length === gameSqu.length) { // If the user's sequence length matches the game's sequence length
            levelUp(); // Move to the next level
        }
    } else { // If there's a mismatch between user input and game sequence
        h2.innerHTML = `Game over. Your score is <b>${level}</b>. Press any key to start the game.`; // Display game over message
        gameover(); // Flash the background to indicate game over
        reset(); // Reset the game state
    }
}

// Function to handle button click events
function btnpress() {
    let btn = this; // Reference to the clicked button
    flashbtn(btn); // Flash the clicked button
    userbtn(btn); // Add user-click effect to the clicked button
    let userColor = btn.getAttribute("id"); // Get the color of the clicked button
    userSqu.push(userColor); // Add the clicked color to the user's sequence
    matchAns(userSqu.length - 1); // Check if the current user sequence matches the game sequence
}

// Add event listeners to all buttons with .btn class
let allbtn = document.querySelectorAll(".btn");
for (let i = 0; i < allbtn.length; i++) {
    allbtn[i].addEventListener("click", btnpress);
}

// Function to reset the game state
function reset() {
    level = 0; // Reset game level to 0
    userSqu = []; // Clear user's sequence
    gameSqu = []; // Clear game's sequence
    start = false; // Reset start flag to false
}

// Function to flash the background to indicate game over
function gameover() {
    document.querySelector(".main").style.backgroundColor = "red";
    document.querySelector("body").style.backgroundColor = "red"; // Change background color to red
    setTimeout(function() {
        document.querySelector(".main").style.backgroundColor = "white";
        document.querySelector("body").style.backgroundColor = "white"; // Restore background color to white after 250ms
    }, 250);
}
