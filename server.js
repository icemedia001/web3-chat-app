const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/821ecaf93c8d4d21bb3625cf415fea2c'));
const path = require("path");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

io.on("connection", (socket)=>{
  console.log("A user is connected!");
  socket.on("chatMessage", (message)=>{
    io.emit("chatMessage", message); //Broadcast message to all clients
  });
});

// Check if connected to Ethereum
web3.eth.net.isListening()
.then(() => console.log("Connected to Ethereum"))
.catch((err) => console.error("Error connecting to Ethereum:", err)); // Fix here, remove ":", and "err" should be defined.
app.use(express.static(path.join(__dirname, 'public'))); // Assuming your static files are in the 'public' directory
app.get('/', (req, res) => {
  res.sendFile(__dirname + 'public/index.html');
});

server.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
});
