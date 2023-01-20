import React , {useState} from "react";
import {IoMdSend} from "react-icons/io";
import InputEmoji from 'react-input-emoji';
import "../css/ChatInput.css"
function ChatInput({handleSendMsg}){
    const [msg , setMsg] = useState("");
    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
          handleSendMsg(msg);
          setMsg("");
        }
      };
    return (
        <div className = "ChatInput">
            <form className = "input-container" onSubmit = {(event) => sendChat(event)}>
                <InputEmoji placeholder = "Type your Message Here" value = {msg} onChange = {setMsg}/> 
                <button type = "submit" className = "send_btn">
                    <IoMdSend/>
                </button>
            </form>
        </div>)
}
export default ChatInput;