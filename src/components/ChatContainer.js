import React,{useState ,useEffect , useRef} from "react";
import '../css/ChatContainer.css';
import LogOut from "../components/LogOut";
import ChatInput from "./ChatInput";
import axios from "axios";
import {v4 as uuidv4} from "uuid";
import {Link} from "react-router-dom";
function ChatContainer(props){
    const currentChat = props.currentChat;
    const user = props.user;
    const socket = props.socket;
    const [Messages , setMessages] = useState([]);
    const [arrivalMessage , setArrivalMessage] = useState(null); 
    const scrollRef = useRef();
    const handleSendMsg = async(msg) => {
        await axios.post("http://localhost:9002/AddMessage" ,{
            from : user._id,
            to : currentChat._id,
            message:msg , 
        });
        socket.current.emit("send-msg" , {
            to:currentChat._id,
            from : user._id,
            message : msg , 
        });
        setMessages((prev) =>{
            const msgs = [...prev];
            msgs.push({fromSelf : true , message : msg});
            return msgs;
        });
    };
    useEffect(() =>{
        if(socket.current){
            socket.current.on('msg-receive' , (msg) =>{
                console.log("buddy");
                 setArrivalMessage({fromSelf : false , message : msg})
            });

        }
    } , [socket])
    useEffect(() =>{
        arrivalMessage && setMessages((prev) => [...prev , arrivalMessage])
    } , [arrivalMessage])
    useEffect(() =>{
        scrollRef.current?.scrollIntoView({behaviour : "smooth"});
    } , [Messages])
    useEffect(()=>{
        async function GetMessages(){
            if(currentChat){
            const response = await axios.post("http://localhost:9002/GetAllMessages" , {
            from : user._id,
            to : currentChat._id,
            });
            setMessages(response.data);}
        }
        GetMessages();
    } ,[currentChat , user._id] );
    
    return (
        <div className = "chat-section">
            <div className="chat-header">
                <div className = "user-details">
                    <div className = "image">
                        <img src = {currentChat.image} alt = "UserImage"/>
                    </div>
                    <div className = "username">
                        <h3> <Link to = "/ShowPetProfile">{currentChat.PetName}</Link></h3>
                    </div>
                </div>
                <LogOut/>
            </div>
            <div className="chat-messages">
                {Messages.map((message) =>{
                    return (
                        <div ref = {scrollRef} key = {uuidv4()}>
                            <div  className = {`message ${message.fromSelf ? "sended": "received"}`}>
                            <div  className = "content">
                                <p >
                                    {message.message}
                                </p>
                            </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <ChatInput handleSendMsg = {handleSendMsg}/>
        </div>)
}
export default ChatContainer;