const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
const PeerServer = require("peer").PeerServer;

const Events = require("../constants/events");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });
  server.listen(3000, err => {
    if (err) throw err;
    console.log("> Ready! Listening on http://localhost:3000");
  });
});

var peerServer = new PeerServer({ port: 9000, path: "/chat" });

peerServer.on("connection", function(id) {
  io.emit(Events.USER_CONNECTED, id);
  console.log("User connected with #", id);
});

peerServer.on("disconnect", function(id) {
  io.emit(Events.USER_DISCONNECTED, id);
  console.log("With #", id, "user disconnected.");
});
