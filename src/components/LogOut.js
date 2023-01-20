import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import "../css/LogOut.css";
function LogOut(){
    const Navigate = useNavigate();
    const handleClick = async () =>{
        localStorage.clear();
        Navigate("/SignupPM");
    }
    return (
        <div className = "LogOut">
            <button className = "send_btn" color = "black" onClick = {handleClick}> <BiPowerOff/></button>
        </div>)
}
export default LogOut;  