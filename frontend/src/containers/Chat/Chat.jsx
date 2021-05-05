import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import io from "socket.io-client";
import dayjs from "dayjs";
import ActiveUsers from "../../components/organisms/Chat/ActiveUsers";
import Messages from "../../components/organisms/Chat/Message";
var socket;
const initialState = {
  users: [],
  messages: [],
  newMsg: "",
  fetchingLocation: false,
};

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  componentWillUnmount() {
    const param = {
      room: this.props.match.params.room,
    };
    socket.emit("leave", param);
    this.setState({ ...initialState });
  }

  componentDidMount() {
    const scopeThis = this;
    const params = {
      name: this.props.match.params.name,
      room: this.props.match.params.room,
    };

    console.log(params);

    socket = io();

    socket.emit("join", params, function (err) {
      if (err) {
        this.props.history.push("/");
      }
    });

    socket.on("updateUserList", function (users) {
      scopeThis.setState({
        users,
      });
    });

    socket.on("newMessage", (message) => {
      var formattedTime = dayjs(message.createdDate).format("h:mm a");
      let newMsg = {
        text: message.text,
        from: message.from,
        room: message.room,
        createdDate: formattedTime,
      };
      let results = scopeThis.state.messages;
      results.push(newMsg);
      scopeThis.setState({
        messages: results,
      });

      var msgArr = scopeThis.state.messages.filter(
        (message) => message.room === this.props.match.params.room
      );
      if (msgArr.length > 3) {
        scopeThis.scrollToBottom();
      }
    });

    socket.on("createLocationMsg", (message) => {
      var formattedTime = dayjs(message.createdDate).format("h:mm a");
      let newMsg = {
        url: message.url,
        from: message.from,
        room: message.room,
        createdDate: formattedTime,
      };
      let results = scopeThis.state.messages;
      results.push(newMsg);
      scopeThis.setState({
        messages: results,
        fetchingLocation: false,
      });
    });

    socket.on("disconnect", function () {
      console.log("Connection lost from server.");
    });
  }

  scrollToBottom() {
    // selectors
    var listHeight = document.querySelector(".messages #list ul");
    var messagesList = document.querySelector(".messages #list");
    var newMessage = document.querySelector(".messages #list ul li:last-child");
    // heights
    var messagesWrapperHeight = listHeight.clientHeight;
    var clientHeight = messagesList.clientHeight;
    var scrollTop = messagesList.scrollTop;
    var scrollHeight = messagesList.scrollHeight;
    var newMessageHeight = newMessage.offsetHeight;
    var lastMessageHeight = newMessage.previousSibling.offsetHeight;

    if (
      clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
      scrollHeight
    ) {
      document.querySelector("#list").scrollTo(0, messagesWrapperHeight);
    }
  }

  clearForm() {
    this.setState({
      newMsg: "",
    });
  }

  inputUpdate(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  newMessage(e) {
    e.preventDefault();
    var obj = {
      text: this.state.newMsg,
    };
    socket.emit("createMessage", obj, function (data) {});
    this.clearForm();
  }

  sendLocation() {
    this.setState({
      fetchingLocation: true,
    });
    if (!navigator.geolocation) {
      return alert("GeoLocation not supported by your browser");
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        socket.emit("createLocationMsg", {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => {
        alert("Unable to fetch location");
      }
    );
  }

  render() {
    const { newMsg } = this.state;

    return (
      <div className="chatPage">
        {this.state.fetchingLocation ? (
          <p>Fetching your current location</p>
        ) : null}

        {/* <ActiveUsers users={this.state.users} /> */}

        <div className="messages_wrap">
          <Messages
            messages={this.state.messages}
            room={this.props.match.params.room}
          />

          <div className="">
            <div className="">
              <form
                className="flex items-center"
                onSubmit={(e) => this.newMessage(e)}
              >
                <input
                  name="newMsg"
                  placeholder="Type your message..."
                  autoComplete="off"
                  value={newMsg}
                  onChange={this.inputUpdate.bind(this)}
                  className="p-4 bg-gray-700 w-full"
                />

                <div className="p-4 w-6">
                  <button type="submit" className="btn">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Chat);
