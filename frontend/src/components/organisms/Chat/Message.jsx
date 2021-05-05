import React, { Component } from "react";

class Messages extends Component {
  render() {
    return (
      <div className="messages scrollbar-hidden">
        <div id="list">
          <ul>
            {this.props.messages
              .filter((message) => message.room === this.props.room)
              .map((message, index) => (
                <li key={index}>
                  {message.url && (
                    <div>
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <h4>{message.from}</h4>
                        <div className="">
                          <a
                            href={message.url}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            My current location
                          </a>
                        </div>
                      </div>
                      <span className="text-xs">{message.createdDate}</span>
                    </div>
                  )}

                  {!message.url && (
                    <div className="my-4">
                      <div className="bg-gray-700 p-4 rounded-lg text-white">
                        <span className="text-sm text-green-400">
                          {message.from}
                        </span>
                        <span className="text-xs px-2 text-gray-400">
                          {message.createdDate}
                        </span>
                        <div className="body">
                          <p>{message.text}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Messages;
