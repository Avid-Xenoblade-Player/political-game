const WeatherState = {
  CLEAR: "clear",
  CLOUD: "cloud",
  RAIN: "rain",
  STORM: "storm",
};

// Grid size
const gridSize = 4;

// Create a 2D array to represent the grid
const grid = Array.from({
    length: gridSize
  }, () =>
  Array.from({
    length: gridSize
  }, () => WeatherState.CLEAR)
);

// Function to get a valid index within the grid boundaries
function getValidIndex(index, size) {
  return Math.max(0, Math.min(size - 1, index));
}

// Function to access a specific cell in the grid
function getCell(x, y) {
  const validX = getValidIndex(x, gridSize);
  const validY = getValidIndex(y, gridSize);
  return grid[validY][validX];
}

// Function to set the state of a specific cell in the grid
function setCell(x, y, state) {
  const validX = getValidIndex(x, gridSize);
  const validY = getValidIndex(y, gridSize);
  grid[validY][validX] = state;
}

function initializeGrid() {
  const weatherProbabilities = {
    [WeatherState.CLEAR]: 0.4, // 60% chance
    [WeatherState.CLOUD]: 0.3, // 25% chance
    [WeatherState.RAIN]: 0.25,  // 10% chance
    [WeatherState.STORM]: 0.05, // 5% chance
  };

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      const randomValue = Math.random();
      let cumulativeProbability = 0;

      for (const state in weatherProbabilities) {
        cumulativeProbability += weatherProbabilities[state];
        if (randomValue < cumulativeProbability) {
          setCell(x, y, state);
          break; // Stop iterating after finding the state
        }
      }
    }
  }
}

function updateCell(x, y) {
  const currentState = getCell(x, y);
  let newState = currentState;

  // Count the occurrences of each weather state around the cell
  const stateCounts = {
    [WeatherState.CLEAR]: 0,
    [WeatherState.CLOUD]: 0,
    [WeatherState.RAIN]: 0,
    [WeatherState.STORM]: 0,
  };

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      if (dx === 0 && dy === 0) continue; // Skip the current cell

      const neighborX = x + dx;
      const neighborY = y + dy;
      const neighborState = getCell(neighborX, neighborY);
      stateCounts[neighborState]++;
    }
  }

  // Apply transition rules based on current state and surroundings
  switch (currentState) {
    case WeatherState.CLEAR:
      if (stateCounts[WeatherState.RAIN] > 1 || stateCounts[WeatherState.STORM] > 1) {
        if (stateCounts[WeatherState.RAIN || WeatherState.STORM] > 2) {
          newState = WeatherState.CLOUD;
        } else {
          newState = WeatherState.CLEAR;
        }
      }
      break;
    case WeatherState.CLOUD:
      if (stateCounts[WeatherState.RAIN] > 2) {
        if (stateCounts[WeatherState.CLEAR] > 0) {
          newState = WeatherState.CLOUD;
        } else {
        newState = WeatherState.RAIN;
        }
      } else {
        newState = WeatherState.CLEAR;
      }
      if (stateCounts[WeatherState.CLOUD] > stateCounts[WeatherState.CLEAR]) {
      if (stateCounts[WeatherState.CLOUD] > 1
      ) {
      	if (stateCounts[WeatherState.CLEAR] > 0) {
        	if (stateCounts[WeatherState.CLEAR] > 1) {
          	newState = WeatherState.CLOUD;
          } else {
          	newState = WeatherState.CLOUD;
          }
        } else {
      	newState = WeatherState.RAIN;
       }
      } else {
        newState = WeatherState.CLOUD
      }
     }
      break;
     case WeatherState.RAIN:
       if (stateCounts[WeatherState.CLEAR || WeatherState.CLOUD] > 0){ 
       	newState = WeatherState.CLOUD;
       }
      break;
    case WeatherState.STORM:
      if (stateCounts[WeatherState.STORM] < 5) {
        newState = WeatherState.RAIN;
      } 
      break;
  }

  setCell(x, y, newState);
}


// Initialize the grid with random weather
initializeGrid();

const gridContainer = document.getElementById("grid-container");

function updateDisplay() {
  gridContainer.innerHTML = ""; // Clear the container before adding new cells
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.classList.add(grid[y][x]); // Add class based on weather state
      gridContainer.appendChild(cell);
    }
  }
}
// Function to update the entire grid
function updateGrid() {
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      updateCell(x, y);
    }
  }
}

// Update the grid and display every 2 seconds
setInterval(() => {
  updateGrid();
  updateDisplay();
}, 1000);
