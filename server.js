const express = require('express');
const path = require('path');
const app = express();

// Store the state of multiple LEDs in memory
let ledStates = {
  red: "OFF",
  green: "OFF",
  blue: "OFF"
};

// Serve static frontend files (like our HTML/CSS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint: Used by the website buttons to change an LED state
// Example usage: /set?color=red&state=ON
app.get('/set', (req, res) => {
  const { color, state } = req.query;
  
  // Verify the requested color exists and the state is valid
  if (ledStates[color] !== undefined && (state === "ON" || state === "OFF")) {
    ledStates[color] = state;
  }
  // Return the updated states back to the website
  res.json(ledStates); 
});

// API Endpoint: Used by the ESP32 to read all states at once
app.get('/api/state', (req, res) => {
  res.json(ledStates);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));