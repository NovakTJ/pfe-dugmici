
const express = require('express');
const app = express();
const cors = require("cors");
app.use(cors());
const fs = require('fs');
//const path = require('path');
const port = 3000;
const url = "https://goldenrod-verdant-rayon.glitch.me";
let log = [];
const secretpath = '/l';
const cupsfile = '/app/cups.html';
const nice_predavac = '/app/predavac bez ista.html'
app.use(express.json());

var server = app.listen(port, () => {
  console.log(`Server listening at ${url}:${port}`);
});

var io = require('socket.io').listen(server);

io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Send initial log to client
    socket.emit('initialLog', log);
    
    // Listen for new log messages from clients
    
    
    // Handle reset log request
    socket.on('resetLog', () => {
        // Here you should implement a confirmation dialog
        // For simplicity, we will reset the log immediately
        log = [];
        io.emit('logReset');
    });

    // Handle save log request
    socket.on('saveLog', () => {
        const logText = log.map(entry => `${entry.timestamp}: ${entry.button}`).join('\n');
        fs.writeFile('log.txt', logText, (err) => {
            if (err) throw err;
            console.log('Log saved to log.txt');
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.post('/log', (req, res) => {
  const poruka = req.body['message'];
  const newmessage = {poruka, timestamp: new Date().toLocaleString('sr-Latn',{ timeZone: "Europe/Belgrade", timeZoneName: "short" }) };
  log.push(newmessage);
  io.emit('newLogMessage', newmessage);
  //salji poruku sa newclick svim konekcijama u watchers. oni treba da dodaju dom element na dno
  res.sendStatus(200);
});


app.get(secretpath, (req, res) => {
  //ovde bi mogao da se doda websocket u globalnu promenljivu watchers
  //umesto da se salje odmah log, trb da se salje prazna stranica pa odmah svaki element loga dotad preko websocketa.
  res.json(log);
});
app.get('/',(req,res) =>{
  res.sendFile(cupsfile);
});
app.get('/n',(req,res) =>{
  res.sendFile(nice_predavac);
});
app.post('/resetlog',(req,res) =>{
  //ovo jos nije implementirano u cups.html
  log=[];
  res.sendStatus(200);
});



