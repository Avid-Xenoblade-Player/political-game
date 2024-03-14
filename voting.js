const turnNumberElement = document.getElementById('turn-number');
const partyLeadersElement = document.getElementById('party-leaders');
const currentVoteElement = document.getElementById('current-vote');
const actionsElement = document.getElementById('actions');
const messagesElement = document.getElementById('messages');

// Game logic goes here (placeholder for now)
function updateTurn() {
  turnNumberElement.textContent = parseInt(turnNumberElement.textContent) + 1;
  // Update game state based on turn
}

function displayPartyLeaders(partyLeaders) {
  partyLeadersElement.innerHTML = "";
  partyLeaders.forEach(leader => {
    const leaderElement = document.createElement('div');
    leaderElement.textContent = leader.name;
    partyLeadersElement.appendChild(leaderElement);
  });
}

function displayCurrentVote(vote) {
  currentVoteElement.innerHTML = `<h3>${vote.title}</h3>`;
  // Display vote details (options, votes)
}

function displayActions(actions) {
  actionsElement.innerHTML = "";
  actions.forEach(action => {
    const button = document.createElement('button');
    button.textContent = action.text;

    // Attach event listener to the button
    button.addEventListener('click', () => {
      if (action.text === "Vote") {
        // Hide the "Vote" button and display the two vote buttons
        actionsElement.removeChild(button);
        displayVoteOptions();
      } else if (action.handleClick) {
        action.handleClick(); // Call the provided function for other actions
      } else {
        console.error("Action has no handleClick function");
      }
    });

    actionsElement.appendChild(button);
  });
}

function displayVoteOptions() {
  // Simulate retrieving available vote options
  const options = ["Option 1", "Option 2"];

  actionsElement.innerHTML = "";
  options.forEach(option => {
    const voteButton = document.createElement('button');
    voteButton.textContent = option;
    voteButton.addEventListener('click', () => {
      // Handle vote selection logic here
      displayMessage(`Voted for: ${option}`);
      // Implement logic to hide vote buttons and potentially revert to "Vote" button
    });
    actionsElement.appendChild(voteButton);
  });
}

function displayMessage(message) {
  messagesElement.textContent = message;
}

// Simulate initial game state
const partyLeaders = [
  { name: "Leader 1", party: "Party A" },
  { name: "Leader 2", party: "Party B" },
];

displayPartyLeaders(partyLeaders);
updateTurn();

// Example actions
displayActions([
  { text: "Vote" },
  { text: "End Turn", handleClick: () => updateTurn() },
]);
