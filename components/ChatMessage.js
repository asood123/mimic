import React, { Component } from "react";

export default class ChatMessage extends Component {
  render() {
    var msg = this.props.message;
    var hours = msg.date.getHours();
    var minutes = msg.date.getMinutes();
    hours = hours < 9 ? "0" + hours : hours;
    minutes = minutes < 9 ? "0" + minutes : minutes;
    return (
      <div className="chat-message">
        <style jsx>{`
          .chat-message {
            min-height: 21px;
            padding-left: 10px;
            margin: 3px;
            font-family: consolas;
          }

          .message-author,
          .message-time {
            font-size: 15px;
            color: #666;
            float: left;
            margin-right: 6px;
          }

          .message-content {
            font-size: 15px;
            color: #000;
            display: inline-block;
          }
        `}</style>
        <div className="message-time">[{hours + ":" + minutes}]</div>
        <div className="message-author">
          &lt;
          {msg.author}
          &gt;
        </div>
        <div className="message-content">{msg.content}</div>
      </div>
    );
  }
}
