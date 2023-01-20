import React , {useState , useEffect}from "react";
import '../css/Card.css';
import { Buffer } from 'buffer'; 
import { Link } from "react-router-dom";
// import 
function Card (props){
    const Contacts = props.contacts;
    const User = props.user;
    const changeChat = props.changeChat;
    const [CurrentUserName , setCurrentUserName] = useState(undefined);
    const [CurrentUserImage , setCurrentUserImage] = useState(undefined);
    const [CurrentSelected , setCurrentSelected] =  useState(undefined);
    useEffect(() => {
        if(User){
            setCurrentUserImage(User.image);
            setCurrentUserName(User.UserName);
        }
    } , [User]);
    if( Contacts){
        if(Contacts.length && Contacts[0].image.data){
    for(let i = 0 ; i < Contacts.length ; i++){
        const buffer = Buffer.from(Contacts[i].image.data.data);
        const arrayBuffer = buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
        const blob = new Blob([arrayBuffer], {type: Contacts[i].image.contentType});
        Contacts[i].image = URL.createObjectURL(blob);
      }}}
    if(User){
        if(User.image.data){
        const buffer = Buffer.from(User.image.data.data);
        const arrayBuffer = buffer.slice(buffer.byteOffset , buffer.byteOffset + buffer.byteLength);
        const blob = new Blob([arrayBuffer] , {type: User.image.contentType});
        User.image = URL.createObjectURL(blob);}
    }
    const changeCurrentChat = (index , contact) =>{
        setCurrentSelected(index);
        changeChat(contact);

    }
    return (
        <div className = "card-container">
           <div className = "brand">
            <Link to = "/MemberArea">
           <button className="button-91">  Back </button>
           </Link>
                <img src = "assests/images/logo.jpeg" alt = "logo"/>
                <h3> Waggin Tails</h3>
           </div>
           <div className = 'Contacts'>
   {Contacts ? Contacts.map((contact , index) => {
                return (
                    <div className = {`contact ${index === CurrentSelected ? "selected" : ""}`} key = {index} onClick = {() => changeCurrentChat(index , contact)}>
                        <div className = "image"> 
                            <img src = {contact.image} alt = "pic"/>
                        </div>
                        <div className = "username">
                            <h3> {contact.PetName}</h3>
                        </div>
                    </div>
                )
            }) : <p>No Contacts</p>}
            
</div>
            <div className = "current-user">
                <div className = "image"> 
                    <img src = {User ? User.image : ""} alt = "pic"/>
                </div>
                <div className = "username">
                    
                    <h2> {User ? User.PetName : ""}</h2>
                </div>
            </div>
        </div>);
}
export default Card;