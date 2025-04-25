const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const cors = require("cors");
const fs = require('fs');
app.use(cors());
const url = "https://pfe-dugmici.glitch.me";
let log = [];
const secretpath = '/l';
const cupsfile = '/app/cups.html';
const nicePredavac = '/app/predavac novo.html'
app.use(express.json());
const server = http.createServer(app);
const io = socketIO(server);

app.post('/log', (req, res) => {
  const poruka = req.body['message'];
  const newclick = {poruka, timestamp: new Date().toLocaleString('sr-Latn',{ timeZone: "Europe/Belgrade", timeZoneName: "short" }) };
  log.push(newclick);
  //salji poruku sa newclick svim konekcijama u watchers. oni treba da dodaju dom element na dno
  io.emit('newLogMessage', newclick);
  const ping = req.body['ping'];
  if(ping){
    io.emit('ping');
  }
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
app.get('/predavac-m4n2txz7vqp9k6yf3agwb0eulrd8cj1sh5iovnkmzt73xyfdq96pelgwhaqv3z9by01sjmru6otgcpvx4nd78qmwklafyre2ghx0b5cu9vznqrd34tkap6lisdjflisou38fjie93eodjofjef9',(req,res) =>{
  res.sendFile(nicePredavac);
});
app.get('/n',(req,res) =>{
  res.sendFile(nicePredavac);
});
app.get('/warmup', (req, res) => {
  res.sendStatus(200);
});


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.emit('initialLog', log);
    
    socket.on('resetLog', () => {
        
        log = [];
        io.emit('logReset');
    });

    
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
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server listening at ${url}:${port}`);
});