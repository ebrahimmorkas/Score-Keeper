// console.log("Hello this is score keeper");

// Getting the h1
let scoreDisplayer = document.getElementById("scoreDisplayer");

// Getting the player 1 button
let player1Btn = document.getElementById("player1Btn");

// Getting the player 2 button
let player2Btn = document.getElementById("player2Btn");

// Getting the reset button
let resetBtn = document.getElementById("resetBtn");

// Getting the score for player 1 
let score1 = document.getElementById("score1");

// Getting the score for player 2
let score2 = document.getElementById("score2");

// Getting the value of winning score dropdown
let winningScoreDropdown = document.getElementById("winningScoreDropdown");

// Creating the variable that will increase the score 1
let togglePlayerScore1 = 0;

// Creating the variable that will increase the score 2
let togglePlayerScore2 = 0;

// Creating the variable that will hold the winning score value
let winningScoreValue = 0;

// Getting the span which has id finalWinner
let finalWinner = document.getElementById("finalWinner");

// Getting the input that will accept the winning score
let winningScoreInput = document.getElementById("winningScoreInput");

// Getting the button that will set the score
let setScoreBtn = document.getElementById("setScoreBtn");

// Getting the colon which is displayed between two scores
let colon = document.getElementById("colon");

// Initially disablling the set score button
setScoreBtn.disabled = true;

// Getting the player1 name input
let player1NameInput = document.getElementById("player1NameInput");

// Getting the player2 name input
let player2NameInput = document.getElementById("player2NameInput");

// Getting the button that will set the names for players
let setPlayersNamesBtn = document.getElementById("setPlayerNamesBtn");

// Initially disabling the set players name button
setPlayersNamesBtn.disabled = true;

// Creating the variable that will store the players 1 name which will be fetched from the players 1 name textfield
let player1Name = "Player 1";

// Creating the variable that will store the players 2 name which will be fetched from the players 2 name textfield
let player2Name = "Player 2";

// Creating more options for dropdown. These options ranges from 6 to 100 and this options need to be entered manually in the textfield. These options wont be displayed in the DOM.
for (let i = 6; i <= 100; i++) {
    let option = document.createElement("option");
    option.value = `${i}`;
    option.innerText = `${i}`;
    option.classList.add("hidden");
    winningScoreDropdown.appendChild(option);
}

// Creating the variable that will hold the table which is going to display the winners list
let table = document.getElementById("userDefinedTable");

// Creating the variable through which we will iterate the table rows (for accordion winners list)
let toggleTableRow = 0;

// Creating the variable through which we will determine whether the function has been run once or not
let toggleFunction = 1;

// Getting the button that will reset the winners list
let resetWinnersListBtn = document.getElementById("resetWinnersList");

// Initially diabling the resetWinnersListBtn button
resetWinnersListBtn.disabled = true;

// Creating the function that will update the winnerList array and will manipulate the DOM
function winnerListFunction(playerName) {
    if (toggleFunction) {
        // Updating the toggleTableRow variable to insert row on next row when the function is called again
        toggleTableRow++;

        resetWinnersListBtn.disabled = false;
        let row = table.insertRow(toggleTableRow);
        // For match no
        let cell1 = row.insertCell(0);
        cell1.classList.add("text-center");
        // For player 1
        let cell2 = row.insertCell(1);
        cell2.classList.add("text-center");
        // For player 20
        let cell3 = row.insertCell(2);
        cell3.classList.add("text-center");

        cell1.innerHTML = toggleTableRow;
        if (playerName == "player1") {
            cell2.innerHTML = "WON";
            cell3.innerHTML = "LOST";
        }
        else {
            cell2.innerHTML = "LOST";
            cell3.innerHTML = "WON";
        }

        // Updating the toggle function to 0 so that the function can't run in loop
        toggleFunction = 0;
    }
}

// Disabling the buttons if winning score is not set
setInterval(() => {
    if (winningScoreDropdown.options[winningScoreDropdown.selectedIndex].text == "Winning Score") {
        player1Btn.disabled = true;
        player2Btn.disabled = true;
        resetBtn.disabled = true;
    }
    // Checking condition whether winning score has been scored by any player or not
    else if (parseInt(winningScoreDropdown.options[winningScoreDropdown.selectedIndex].text) == togglePlayerScore1 || parseInt(winningScoreDropdown.options[winningScoreDropdown.selectedIndex].text) == togglePlayerScore2) {
        player1Btn.disabled = true;
        player2Btn.disabled = true;
        // Channging the h1 to players name
        if (togglePlayerScore1 > togglePlayerScore2) {
            score1.innerText = "";
            score2.innerText = "";
            colon.innerText = "";
            finalWinner.innerHTML = `<span>${player1Name} won by ${togglePlayerScore1 - togglePlayerScore2} point more than ${player2Name}</span><br>
        <b>Score Dashboard</b><br>
        <span>${player1Name} : ${togglePlayerScore1}</span><br>
        <span>${player2Name} : ${togglePlayerScore2}</span>`;
            winnerListFunction("player1");
        }
        else {
            score1.innerText = "";
            score2.innerText = "";
            colon.innerText = "";
            finalWinner.innerHTML = `<span>${player2Name} won by ${togglePlayerScore2 - togglePlayerScore1} point more than ${player1Name}</span><br>
        <b>Score Dashboard</b><br>
        <span>${player1Name} : ${togglePlayerScore1}</span><br>
        <span>${player2Name} : ${togglePlayerScore2}</span>`;
            winnerListFunction("player2");
        }
    }
    else if (winningScoreValue >= 6) {
        player1Btn.disabled = false;
        player2Btn.disabled = false;
        resetBtn.disabled = false;
        winningScoreInput.disabled = true;
        setScoreBtn.disabled = true;
    }
    else {
        player1Btn.disabled = false;
        player2Btn.disabled = false;
        resetBtn.disabled = false;
        winningScoreValue = parseInt(winningScoreDropdown.options[winningScoreDropdown.selectedIndex].text);
        winningScoreDropdown.disabled = true;
    }
}, 0);

// Handling the input event on textfield that will accept the winning score
winningScoreInput.addEventListener("input", e => {
    if (parseInt(winningScoreInput.value) >= 6) {
        setScoreBtn.disabled = false;
    }
    else {
        setScoreBtn.disabled = true;
    }
})

// Handling the event on setScoreBtn
setScoreBtn.addEventListener("click", e => {
    // console.log("Set Score Button clicked");
    e.preventDefault();
    winningScoreValue = parseInt(winningScoreInput.value);
    winningScoreDropdown.selectedIndex = winningScoreInput.value;
})

// Adding the event listener on player1Btn
player1Btn.addEventListener("click", (e) => {
    // console.log("Button 1 clicked");
    e.preventDefault();
    togglePlayerScore1 += 1;
    score1.innerText = togglePlayerScore1;
    // console.log(winningScoreDropdown.options[winningScoreDropdown.selectedIndex].text);
})

// Adding the event listener on player2Btn
player2Btn.addEventListener("click", (e) => {
    // console.log("Button 2 clicked");
    e.preventDefault();
    togglePlayerScore2 += 1;
    score2.innerText = togglePlayerScore2;
})

// Adding the event listener on reset button
resetBtn.addEventListener("click", e => {
    // console.log("Reset button clicked");
    e.preventDefault();
    winningScoreDropdown.disabled = false;
    winningScoreDropdown.value = '0';
    player1Btn.disabled = false;
    player2Btn.disabled = true;
    score1.innerText = 0;
    score2.innerText = 0;
    colon.innerText = ":";
    togglePlayerScore1 = 0;
    togglePlayerScore2 = 0;
    finalWinner.innerHTML = "";
    winningScoreInput.disabled = false;
    winningScoreInput.value = '';
    player1NameInput.value = "";
    player2NameInput.value = "";
    player1NameInput.disabled = false;
    player2NameInput.disabled = false;
    player1Btn.innerText = "Player 1";
    player2Btn.innerText = "Player 2";
    // Updating the toggleFunction variable to run the function next time
    toggleFunction = 1;
    // scoreDisplayer.innerText=`${score1.innerText}:${score2.innerText}`;
})

// Adding the event listener on player1 name input
player1NameInput.addEventListener("input", e => {
    // Checking whether user has entered the name in players 2 name field
    if (player2NameInput.value == "") {
        setPlayersNamesBtn.disabled = true;
    }
    // Checking whether user backspaced the name entered in player 1 names field
    else if (player1NameInput.value == "") {
        setPlayersNamesBtn.disabled = true;
    }
    else {
        setPlayersNamesBtn.disabled = false;
    }
})

// Adding the event listener on player2 name input
player2NameInput.addEventListener("input", e => {
    // Checking whether user has entered the name in players 1 name field
    if (player1NameInput.value == "") {
        setPlayersNamesBtn.disabled = true;
    }
    // Checking whether user backspaced the name entered in player 2 names field
    else if (player2NameInput.value == "") {
        setPlayersNamesBtn.disabled = true;
    }
    else {
        setPlayersNamesBtn.disabled = false;
    }
})

// Adding the event listener on setPlayersNameBtn
setPlayersNamesBtn.addEventListener("click", e => {
    // console.log("Players name button clicked");
    e.preventDefault();
    player1Name = player1NameInput.value;
    player2Name = player2NameInput.value;
    setPlayersNamesBtn.disabled = true;
    player1NameInput.disabled = true;
    player2NameInput.disabled = true;
    // Setting the buttons to players name
    player1Btn.innerText = player1Name;
    player2Btn.innerText = player2Name;
})

// Adding the event listener on resetWinnersListBtn button
resetWinnersListBtn.addEventListener("click", e => {
    // console.log("Reset button for winners list has been clicked");
    e.preventDefault();
    // Creating loop to delete all the rows present in table and will be starting from 1 to avoid the deletion of table headers
    for (let i = 1; i <= toggleTableRow; i++) {
        table.deleteRow(1);
    }
    // Resetting the toggleTableRow to 1 for insertion of rows from first row
    toggleTableRow = 1;

    // Closing the accordion which is open
    document.getElementById("accordionBtn").click();

    // Again disabling the reset button
    resetWinnersListBtn.disabled = true;
})