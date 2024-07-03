
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
  const dugme = req.body
  log.push({dugme, timestamp: new Date() });
  //salji poruku for x in wslist. oni treba da dodaju dom element na dno
  res.sendStatus(200);
});

// Endpoint to retrieve the log (for demonstration purposes)
app.get('/log', (req, res) => {
  //ovde bi mogao da se doda websocket u globalnu promenljivu wslist
  res.json(log);
});
app.get('/',(req,res) =>{
  res.sendFile('/app/cups.html');
});
app.listen(port, () => {
  console.log(`Server listening at ${url}:${port}`);
});