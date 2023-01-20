import React from "react";
import "../css/Welcome.css"
function Welcome(props){
    const User = props.user;
    return (
        <div className = "welcome-container">
            <img src = "assests/images/robot.gif" alt = "Robot"/>
            <h1>
            Welcome , <span> {User ? User.PetName : ""} !</span>
        </h1>
        <h3> Please select a chat to start Messaging.</h3>
        </div>
        
    )
}
export default Welcome ;