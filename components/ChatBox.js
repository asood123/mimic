import React, { Component } from "react";

import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import UsersList from "./UsersList";

export default class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], messages: [] };
  }

  componentDidMount() {
    this.chatProxy = this.props.chatProxy;
    this.chatProxy.connect(this.props.username);
    this.chatProxy.onMessage(this.addMessage.bind(this));
    this.chatProxy.onUserConnected(this.userConnected.bind(this));
    this.chatProxy.onUserDisconnected(this.userDisconnected.bind(this));
  }

  userConnected(user) {
    console.log("userConnected", user);
    var users = this.state.users;
    users.push(user);
    this.setState({
      users: users
    });
  }

  userDisconnected(user) {
    var users = this.state.users;
    users.splice(users.indexOf(user), 1);
    this.setState({
      users: users
    });
  }

  messageHandler(message) {
    console.log("chatbox.messagehandler", message);
    //message = this.refs.messageInput.getDOMNode().value;
    this.addMessage({
      content: message,
      author: this.chatProxy.getUsername()
    });
    this.chatProxy.broadcast(message);
  }

  addMessage(message) {
    if (message) {
      message.date = new Date();
      const { messages } = this.state;
      messages.push(message);
      this.setState({ messages });
    }
  }

  render() {
    return (
      <div className="chat-box" ref="root">
        <style jsx>{`
          .chat-box {
            height: 100%;
            background-color: #fff;
          }
          .chat-header {
            height: 30px;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            color: #fff;
            background-color: #59adeb;
          }
          .chat-content-wrapper {
            height: -webkit-calc(100% - 64px);
            height: -moz-calc(100% - 64px);
            height: -ms-calc(100% - 64px);
            height: calc(100% - 64px);
            margin: 0px;
          }
        `}</style>
        <div className="chat-header ui-widget-header">Mimic App</div>
        <div className="chat-content-wrapper row">
          <MessagesList messages={this.state.messages} />
          <UsersList users={this.state.users} ref="usersList" />
        </div>
        <MessageInput
          ref="messageInput"
          messageHandler={this.messageHandler.bind(this)}
        />
      </div>
    );
  }
}
