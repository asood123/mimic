import React, { Component } from "react";

export default class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
  }

  onChange(event) {
    this.setState({ message: event.target.value });
  }

  keyHandler(event) {
    var msg = this.state.message.trim();
    if (event.keyCode === 13 && msg.length) {
      this.props.messageHandler(msg);
      this.setState({ message: "" });
    }
  }

  render() {
    return (
      <input
        type="text"
        className="form-control"
        placeholder="Enter a message..."
        value={this.state.message}
        onChange={this.onChange.bind(this)}
        onKeyUp={this.keyHandler.bind(this)}
      />
    );
  }
}
