import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/Notifications.css";
import { Buffer } from "buffer";
import axios from "axios";
function Notifications(props) {
  const User = JSON.parse(localStorage.getItem('User'));
  // const User = props.User;
  const Navigate = useNavigate();
  function Logout() {
    localStorage.setItem('User', JSON.stringify({}));
    Navigate("/SignupPM");
  }
  const [Requests, setRequests] = useState([]);
  useEffect(() => {
    if(!User){
      Navigate('/SignupPM');
    }
  }, [User , Navigate]);
  useEffect(() => {
    async function GetRequests() {
      if(User){
      let response = await fetch(`http://localhost:9002/GetRequests/${User._id}`);
      let data = await response.json();
      for (let i = 0; i < data.length; i++) {
        const buffer = Buffer.from(data[i].image.data.data);
        const arrayBuffer = buffer.slice(
          buffer.byteOffset,
          buffer.byteOffset + buffer.byteLength
        );
        const blob = new Blob([arrayBuffer], {
          type: data[i].image.contentType,
        });
        data[i].image = URL.createObjectURL(blob);
      }
      setRequests(data);}
    }
    GetRequests();
  }, [User._id , Navigate]);
  function Accept_Request(props) {
    axios.post("http://localhost:9002/AcceptRequest", props).then((res) => {
      alert(res.data.message);
    });
  }
  function Delete_Request(props) {
    axios.post("http://localhost:9002/DeleteRequest", props).then((res) => {
      alert(res.data.message);
    });
  }
  function Card(props) {
    // const [AccBtnClasses , setAccBtnClasses] = useState(['btn' , 'accept']);
    // const[ResAccBtn , setResAccBtn] = useState(['btn' , 'dispnone']);
    // const[ResRejBtn , setResRejBtn] = useState(['btn' , 'dispnone']);
    function handleAccBtn(){
      const e1 = document.getElementById(`button-${props._id}-1`);
      e1.className = "btn accept dispnone";
      const e2 = document.getElementById(`button-${props._id}-2`);
      e2.className = "btn accept dispnone";
      // setAccBtnClasses(['btn' , 'accept' , 'dispnone']);
    }
    function handleResAccBtn(){
      const e1 = document.getElementById(`button-${props._id}-3`);
      e1.className = "btn dispblock";
      // setResAccBtn(['btn' , 'dispblock']);
    }
    function handleResRejBtn(){
      const e1 = document.getElementById(`button-${props._id}-4`);
      e1.className = "btn dispblock";
      // setResRejBtn(['btn' , 'dispblock']);
    }
    return (
      <div className="notification" key={props._id}>
        <img src={props.image} alt="" />
        <div className="name">{props.PetName} sends a Friend Request </div>
        <div className="btn-container1">
          <button
            className="btn accept"
            id = {`button-${props._id}-1`}
            onClick={() =>{
              Accept_Request({ Receiver: props.Receiver, Sender: props.Sender });
              handleAccBtn();
              handleResAccBtn();
            }}
          >
            Accept  &#x2713;
          </button>
          <button
            className="btn accept"
            id = {`button-${props._id}-2`}
            onClick={() =>{
              Delete_Request({ Receiver: props.Receiver, Sender: props.Sender });
              handleAccBtn();
              handleResRejBtn();
            }
            }
          >
            Reject &#10060;
          </button>
          <div className="accepted"> 
          <button 
          id = {`button-${props._id}-3`}
          className = "btn dispnone"
          >
            Request Accepted &#x2713;</button></div>
          <div className="deleted"> 
          <button 
          id = {`button-${props._id}-4`}
          className = "btn dispnone"
          >
            Request Rejected	&#10060;</button></div>
        </div>
      </div>
    );
  }
  return (
    <div className="member_body">
      <div className="wrapper">
        <div className="header">
          <nav>
            <div className="heading">
              <img src="assests/images/logo.jpeg" alt="Logo" />
              <Link to="/"> WAGGIN' TAILS </Link>
            </div>
            <input type="checkbox" id="click" />
            <label htmlFor="click" className="menu-btn">
              <i className="fas fa-bars"></i>
            </label>
            <ul>
              <li>
                <Link to="/MemberArea"> Home </Link>
              </li>
              <li>
                <Link to="/Notifications"> Notifications</Link>
              </li>
              <li>
                <Link to="/Chat"> Chat</Link>
              </li>
              <li>
                <div className="dropdown">
                  <button className="dropbtn">
                    Profile<i className="fa fa-caret-down"></i>
                  </button>
                  <div className="dropdown-content">
                    <Link to="/PetProfile"> Pet profile </Link>
                    <Link to="/UserProfile"> User Profile </Link>
                    <Link to="/SignupPM" onClick={Logout}>
                      {" "}
                      Logout
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <div className="cards_wrap">
          <h1 className="m-0">Notifications </h1>
        </div>
        <div className="box-body p-0">
          {Requests.map(Card)}
          </div>
        {/* ---------------------------Notifications------------------------------------------------- */}
        <footer>
          <div className="content">
            <div className="left">
              <div className="upper">
                <div className="topic">Waggin' Tails</div>
                <p> A playdate matching site for your pet </p>
              </div>
              <div className="lower">
                <div className="topic">Contact us</div>
                <div className="media-icons">
                  <a href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="middle">
              <div className="topic">Our Developers</div>
              <div>
                <a href="https://www.linkedin.com/in/nipun-arora-877386201/">Nipun</a>
              </div>
              <div>
                <a href="https://in.linkedin.com/in/mitanshi-garg-15618b223/">Mitanshi Garg</a>
              </div>
            </div>
            <div className="right">
              <div className="topic">Feedback Form</div>
              <form action="#">
                <div>
                  <input type="email" placeholder="Enter email address" />
                </div>
                <div></div>
                <textarea
                  required
                  name="myText"
                  placeholder="Type discription of your pet here"
                  cols="60"
                  rows="5"
                ></textarea>

                <input type="submit" name="" value="Send" />
              </form>
            </div>
          </div>
          <div className="memberarea_bottom">
            <p>
              Copyright © 2021 <Link to = "/"> Waggin'Tails</Link> All rights reserved
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
export default Notifications;
