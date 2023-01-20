import React, { useEffect, useState } from "react";
import "../css/memberArea.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import axios from "axios";
import {ToastContainer , toast} from "react-toastify";
axios.create({
  maxContentLength: Infinity,
});
function MemberArea(props) {
  const Navigate = useNavigate();
  let User = null;
  let id = null;
  if (!User) {
    User = JSON.parse(localStorage.getItem("User"));
    id = User._id;
  }
  if (!User) {
    Navigate("/SignupPM");
  }
  const [Members, setMembers] = useState([]);

  useEffect(() => {
    if (!User) {
      Navigate("/SignupPM");
    }
  }, [User, Navigate]);
  useEffect(() => {
    async function getMembers() {
      if (User) {
        let response = await fetch(`http://localhost:9002/GetMembers/${id}`);
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
        setMembers(data);
      }
    }
    getMembers();
  }, [id, Navigate]);

  function Send_Request(props) {
    const request = {
      Sender: User._id,
      Receiver: props.id,
      Name: User.PetName,
      Image: User.image,
    };
    const e1 = document.getElementById(`Request-${props.id}-1`);
    e1.className = "button dispnone";
    const e2 = document.getElementById(`Request-${props.id}-2`);
    e2.className = "button dispblock";
    axios.post("http://localhost:9002/SendRequest", request).then((res) => {
      toast.error(res.data.message,{
        position : "bottom-right",
        autoClose : 8000,
        pauseOnHover:true , 
        theme : "dark",
      });
    });
  }
  function Card(props) {
    return (
      <div className="card_item" key={props._id}>
        <div className="card_inner">
          <div>
            <img className="image" src={props.image} alt="Pet_Image" />
          </div>
          <div className="role_name">{props.PetName}</div>
          <div className="place_name">
            {props.City} , {props.State}
          </div>
          <div className="button dispblock" id = {`Request-${props._id}-1`}>
            <button
              className="send_btn"
              onClick={() => Send_Request({ id: props._id, Image: User.Image })}
            >
              SEND REQUEST{" "}
            </button>
          </div>
          <div className="button dispnone"  id = {`Request-${props._id}-2`}>
            <button
              className="send_btn"          >
              Request Sent &#10003;
            </button>
          </div>
        </div>
      </div>
    );
  }
  function Logout() {
    localStorage.removeItem("User");
    Navigate("/SignupPM");
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
        <div className="cards_wrap">{Members.map(Card)}</div>
        <ToastContainer/>
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
                  <a href="www.facebook.com">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="www.instagram.com">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="www.twitter.com">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="www.instagram.com">
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="middle">
              <div className="topic">Our Developers</div>
              <div>
                <a href="https://www.linkedin.com/in/nipun-arora-877386201/">
                  Nipun
                </a>
              </div>
              <div>
                <a href="https://in.linkedin.com/in/mitanshi-garg-15618b223/">
                  Mitanshi Garg
                </a>
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
              Copyright © 2021 <Link to="/"> Waggin'Tails</Link> All rights
              reserved
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
export default MemberArea;
