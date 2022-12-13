import React from "react";
import "./Chat.css";

const ChatForm = ({ handleSubmit, text, setText, setImg }) => {
    return (

        <form className="message_form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="img">
                    {/* <Attachment /> */}
                </label>
                <input
                onChange={(e) => setImg(e.target.files[0])}
                type="file"
                id="img"
                accept="image/*"
                style={{ display: "none" }}
                />
            </div>
            <div className="Send">
                <input
                    type="text"
                    placeholder="Enter message"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button className="btn">Send</button>
            </div>
        </form>
    )
}
export default ChatForm;