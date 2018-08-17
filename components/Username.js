import React, { Component } from "react";

export default class Username extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="reg-form-container">
        <style jsx>{`
          .reg-form-container {
            width: 75%;
            margin: auto;
            padding-top: 10%;
          }
        `}</style>
        <label>Username </label>
        <input
          type="text"
          id="username-input"
          className="form-control"
          onChange={event => this.setState({ username: event.target.value })}
        />
        <br />
        <button
          id="connect-btn"
          className="btn btn-primary"
          onClick={() => this.props.onClick(this.state.username)}
        >
          Connect
        </button>
      </div>
    );
  }
}
