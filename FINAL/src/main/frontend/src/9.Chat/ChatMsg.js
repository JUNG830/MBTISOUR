import React, { useRef, useEffect } from "react";
import Moment from "react-moment";
import "./Chat.css";

const ChatMsg = ({ msg, user1}) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  return (
    <ul 
      className={`message_wrapper ${msg.from === user1 ? "own" : ""}`}
      ref={scrollRef}
    >
      <li className={msg.from === user1 ? "me" : "friend"}>
        {msg.media ? 
        <img src={msg.media} alt={msg.text} /> 
        : null}
        {msg.text}
      {/* </li>
      <li > */}
        <small>
          <Moment format="LT">{msg.createdAt.toDate()}</Moment>
        </small>
      </li>

    </ul>
  );
};

export default ChatMsg;