import React, { Component } from "react";

import ChatMessage from "./ChatMessage";

export default class MessagesList extends Component {
  constructor(props) {
    super(props);
  }

  // addMessage(message) {
  //   var messages = this.state.messages;
  //   var container = this.refs.messageContainer.findDOMNode();
  //   messages.push(message);
  //   this.setState({ messages: messages });
  //   // Smart scrolling - when the user is
  //   // scrolled a little we don't want to return him back
  //   if (
  //     container.scrollHeight - (container.scrollTop + container.offsetHeight) >=
  //     50
  //   ) {
  //     this.scrolled = true;
  //   } else {
  //     this.scrolled = false;
  //   }
  // }

  // componentDidUpdate() {
  //   if (this.scrolled) {
  //     return;
  //   }
  //   var container = this.refs.messageContainer.findDOMNode();
  //   container.scrollTop = container.scrollHeight;
  // }

  render() {
    var messages;
    messages = this.props.messages.map(m => {
      return <ChatMessage message={m} key={m.content + m.author + m.date} />;
    });
    if (!messages.length) {
      messages = (
        <div className="chat-no-messages">
          <style jsx>{`
            .chat-no-messages {
              padding: 10px;
              color: #000;
              font-size: 20px;
            }
          `}</style>
          No messages
        </div>
      );
    }
    return (
      <div ref="messageContainer" className="chat-messages col-9">
        <style jsx>{`
          .chat-messages {
            overflow: auto;
            height: 100%;
            padding: 0px;
            background-color: #f0f7ff;
          }
        `}</style>
        {messages}
      </div>
    );
  }
}
