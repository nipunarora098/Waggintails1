import React , {useState , useEffect , useRef} from "react";
import {useNavigate} from "react-router-dom";
import '../css/chat.css';
import axios from "axios";
import Card from "../components/Card";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { Buffer } from 'buffer';
import {io} from 'socket.io-client';
function Chat({setProfileId}){
    const socket = useRef();
    const Navigate = useNavigate();
    const [Contacts , setContacts] = useState(null);
    const [currentChat , setcurrentChat] = useState(undefined);
    let User ;
    if(!User){
    User = JSON.parse(localStorage.getItem('User'));
}    
    useEffect(() =>{
        if(User){
            socket.current = io("http://localhost:9002");
            socket.current.emit("add-user" , User._id);
        }
        else{
            Navigate("/SignupPM");
        }
    } , [User._id]);
    if(User==null){
        Navigate('/SignupPM');
    }
    useEffect(() => {
        async function GetContacts(){
            if(User){
          let response = await fetch(`http://localhost:9002/GetContacts/${User._id}`);
          let data = await response.json();
          setContacts(data);}
        }
        GetContacts();
      },[User._id]);
      const handleChatChange = (chat) =>{
        setcurrentChat(chat);
        setProfileId(chat);
      }
    return (
        <div className="chat">
            <div className = "chat-container">
                <Card contacts = {Contacts} user = {User} changeChat = {handleChatChange}/>
                {currentChat === undefined ?
                (
                    <Welcome user = {User}/>
                ):(
                    // <div></div>
                    <ChatContainer currentChat = {currentChat} user = {User}  socket = {socket}/>
                )}
            </div>
        </div>)
}
export default Chat;