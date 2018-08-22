import EventEmitter from "events";
import io from "socket.io-client";

import Events from "../constants/events";

export default class ChatProxy extends EventEmitter {
  constructor() {
    super();
    this._peers = {};
  }

  getUsername = () => {
    return this._username;
  };

  setUsername = username => {
    this._username = username;
  };

  onMessage = cb => {
    this.addListener(Events.USER_MESSAGE, cb);
  };

  onUserConnected = cb => {
    this.addListener(Events.USER_CONNECTED, cb);
  };

  onUserDisconnected = cb => {
    this.addListener(Events.USER_DISCONNECTED, cb);
  };

  send = (user, message) => {
    this._peers[user].send(message);
  };

  broadcast = msg => {
    Object.keys(this._peers).forEach(p => this.send(p, msg));
  };

  _connectTo = username => {
    const conn = this.peer.connect(username);
    conn.on(
      "open",
      function() {
        this._registerPeer(username, conn);
      }.bind(this)
    );
  };

  _registerPeer = (username, conn) => {
    console.log("registering", username);
    this._peers[username] = conn;
    conn.on(
      "data",
      function(msg) {
        console.log("Message received", msg);
        this.emit(Events.USER_MESSAGE, { content: msg, author: username });
      }.bind(this)
    );
  };

  _disconnectFrom = username => {
    delete this._peers[username];
  };

  connect = username => {
    console.log("Chatproxy.connect with username: ", username);
    const self = this;
    this.setUsername(username);
    this.socket = io();
    this.socket.on("connect", function() {
      self.socket.on(Events.USER_CONNECTED, function(userId) {
        if (userId === self.getUsername()) {
          return;
        }
        self._connectTo(userId);
        self.emit(Events.USER_CONNECTED, userId);
        console.log("User connected", userId);
      });
      self.socket.on(Events.USER_DISCONNECTED, function(userId) {
        if (userId === self.getUsername()) {
          return;
        }
        self._disconnectFrom(userId);
        self.emit(Events.USER_DISCONNECTED, userId);
        console.log("User disconnected", userId);
      });
    });
    console.log("Connecting with username", username);
    // this.peer = new Peer(username, "lwjd5qra8257b9");
    this.peer = new Peer(username, {
      host: location.hostname,
      port: 9000,
      path: "/chat"
    });
    this.peer.on("open", function(userId) {
      self.setUsername(userId);
    });
    this.peer.on("connection", function(conn) {
      self._registerPeer(conn.peer, conn);
      self.emit(Events.USER_CONNECTED, conn.peer);
    });
  };
}
