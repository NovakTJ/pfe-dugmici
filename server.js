
const express = require('express');
const app = express();
const cors = require("cors");
app.use(cors());
//const path = require('path');
const port = 3000;
const url = "https://goldenrod-verdant-rayon.glitch.me"
let log = [];
const secretpath = '/l'
const cupsfile = '/app/cups.html'
app.use(express.json());

// Endpoint to receive button press logs
app.post('/log', (req, res) => {
  const dugme = req.body
  const newclick = {dugme, timestamp: new Date() };
  log.push(newclick);
  //salji poruku sa newclick svim konekcijama u watchers. oni treba da dodaju dom element na dno
  res.sendStatus(200);
});

// Endpoint to retrieve the log (for demonstration purposes)
app.get(secretpath, (req, res) => {
  //ovde bi mogao da se doda websocket u globalnu promenljivu watchers
  //umesto da se salje odmah log, trb da se salje prazna stranica pa odmah svaki element loga dotad preko websocketa.
  res.json(log);
});
app.get('/',(req,res) =>{
  res.sendFile(cupsfile);
});
app.post('/resetlog',(req,res) =>{
  log=[]
  res.sendStatus(200);
});
app.listen(port, () => {
  console.log(`Server listening at ${url}:${port}`);
});