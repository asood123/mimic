import React, { Component } from "react";

import Head from "../components/Head";
import Username from "../components/Username";
import ChatBox from "../components/ChatBox";

import ChatProxy from "../gateways/ChatProxy";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onClick(username) {
    console.log("Connect clicked with username", username);
    const proxy = new ChatProxy();
    this.setState({ username: username, proxy });
  }

  render() {
    return (
      <section id="container">
        <style jsx>{`
          #container {
            width: 100%;
            margin: auto;
            height: 100%;
          }
        `}</style>
        <Head />
        {!this.state.username && <Username onClick={this.onClick.bind(this)} />}

        {this.state.username &&
          this.state.proxy && (
            <ChatBox
              username={this.state.username}
              chatProxy={this.state.proxy}
            />
          )}
      </section>
    );
  }
}
