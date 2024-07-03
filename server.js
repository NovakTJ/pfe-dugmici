
const express = require('express');
const app = express();
const cors = require("cors");
app.use(cors());
//const path = require('path');
const port = 3000;
const url = "https://goldenrod-verdant-rayon.glitch.me"
let log = [];

app.use(express.json());

// Endpoint to receive button press logs
app.post('/log', (req, res) => {
  const { buttonNumber } = req.body;
  log.push({ buttonNumber, timestamp: new Date() });
  console.log('Button press logged:', { buttonNumber, timestamp: new Date() });
  res.sendStatus(200);
});

// Endpoint to retrieve the log (for demonstration purposes)
app.get('/log', (req, res) => {
  res.json(log);
});
app.get('/',(req,res) =>{
  res.sendFile('/app/src/pages/cups.html');
});
app.listen(port, () => {
  console.log(`Server listening at ${url}:${port}`);
});