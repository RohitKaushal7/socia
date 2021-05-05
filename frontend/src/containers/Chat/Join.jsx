import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const initialState = {
  name: "",
  room: "",
};

class Join extends Component {
  constructor() {
    super();
    this.state = {
      ...initialState,
    };
  }

  clearForm() {
    this.setState({
      ...initialState,
    });
  }

  inputUpdate(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  join() {
    const { name, room } = this.state;
    if (name && room) {
      this.props.history.push(`/chat/${name}/${room}`);
    }
  }

  render() {
    const { name } = this.state;

    return (
      <div>
        <div>
          <div>
            <div>
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  autoComplete="off"
                  name="name"
                  value={name}
                  onChange={this.inputUpdate.bind(this)}
                />
                <span></span>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <select name="room" onChange={this.inputUpdate.bind(this)}>
                  <option value="">With Whom U Want to Chat</option>
                  <option value="Room1">Room1</option>
                  <option value="Room2">Room2</option>
                </select>
                <i></i>
              </div>
            </div>
          </div>
          <div>
            <button onClick={() => this.join()}>Join</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Join);
