import React, { Component } from "react";

class ActiveUsers extends Component {
  render() {
    return (
      <div className="">
        <h2 className="text-2xl">Active users</h2>
        <div id="flex">
          <ul>
            {this.props.users.map((user, index) => (
              <li key={user}>
                <i className="p-3 bg-gray-200 rounded-full"></i>
                <span>{user}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ActiveUsers;
