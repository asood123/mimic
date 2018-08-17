import React, { Component } from "react";

export default class UsersList extends Component {
  render() {
    const { users } = this.props;
    return (
      <div className="users-list col-xs-3">
        <style jsx>{`
          .users-list {
            height: 100%;
            background-color: #fff;
            color: #eee;
            padding: 0px;
          }
          .chat-user {
            padding: 3px;
            color: #111;
          }
        `}</style>
        {users.map(u => (
          <div className="chat-user" key={u}>
            {u}
          </div>
        ))}
      </div>
    );
  }
}
