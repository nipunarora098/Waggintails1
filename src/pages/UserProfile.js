import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/UserProfile.css";
function UserProfile(props) {
  const User = JSON.parse(localStorage.getItem('User'));    
  const Navigate = useNavigate();
  const [UserName, setUserName] = useState(User.UserName);
  const [Email, setEmail] = useState(User.Email);
  const [First_Name, setFirstName] = useState(User.First_Name);
  const [Last_Name, setLastName] = useState(User.Last_Name);
  const [Address, setAddress] = useState(User.Address);
  const [City, setCity] = useState(User.City);
  const [State, setState] = useState(User.State);
  const [Contact_No, setContactNo] = useState(User.Contact_No);
  const [Postal_Code, setPostalCode] = useState(User.Postal_Code);
  const [About, setAbout] = useState(User.About);
  const SubmitUserDetails = (event) => {
    const user = {
    _id : User._id,
  UserName : UserName,
  Email : Email,
  First_Name:First_Name,
  Last_Name : Last_Name,
  Address:Address,
  City: City,
  State:State,
  Contact_No : Contact_No,
  Postal_Code : Postal_Code,
  About : About
    }
    axios.post("http://localhost:9002/SubmitUserDetails", user).then((res) => {
        alert(res.data.message);
        props.setLoginUser(user);
        Navigate("/MemberArea");
    });
  };
  return (
    <div className="UserProfile">
      <div className="main-content">
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "770px",
            backgroundImage:
              "assestsimagesCopy of Blue and Yellow Business Hip TrainingHow-to Video (1).jpg",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          {/* <!-- Mask --> */}
          <span className="mask bg-gradient-default opacity-8"></span>
          {/* <!-- Header container --> */}
          <div className="container-fluid d-flex align-items-center">
            <div className="row">
              <div className="col-lg-7 col-md-10">
                <h1 className="display-2 text-white">Hello {UserName}</h1>
                <p className="text-white mt-0 mb-5">
                  This is your profile page. You can see the progress you've
                  made with your work and manage your projects or assigned tasks
                </p>
                <a href="#!" className="profile-btn btn-info" onClick = {(event) => {
                    Navigate("/MemberArea");
                }}>
                  Cancel
                </a>
                <a href="#!" className="profile-btn btn-info" onClick = {SubmitUserDetails}>
                  Update Details
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Page content --> */}
        <div className="container-fluid mt--7">
          <div className="row">
            <div className="col-xl-8 order-xl-1">
              <div className="card bg-secondary shadow">
                <div className="card-header bg-white border-0">
                  <div className="row align-items-center">
                    <div className="col-8">
                      <h3 className="mb-0">My account</h3>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group focused">
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Username
                            </label>
                            <input
                              type="text"
                              id="input-username"
                              className="form-control form-control-alternative"
                              placeholder="Username"
                              value = {UserName}
                              onChange = {(event) => setUserName(event.target.value)}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <input
                              type="email"
                              id="input-email"
                              className="form-control form-control-alternative"
                              placeholder="abce@example.com"
                              value = {Email}
                              onChange = {(event) => setEmail(event.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group focused">
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <input
                              type="text"
                              id="input-first-name"
                              className="form-control form-control-alternative"
                              placeholder="First name"
                              value = {First_Name}
                              onChange = {(event) => setFirstName(event.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group focused">
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <input
                              type="text"
                              id="input-last-name"
                              className="form-control form-control-alternative"
                              placeholder="Last name"
                              value = {Last_Name}
                              onChange = {(event) => setLastName(event.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-4" />
                    {/* <!-- Address --> */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <div className="row">
                      <div className="col-lg-6">
                          <div className="form-group focused">
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Contact Number 
                            </label>
                            <input
                              className="form-control form-control-alternative"
                              placeholder="Mobile Number"
                              type="text"
                              value = {Contact_No}
                              onChange = {(event) => setContactNo(event.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group focused">
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <input
                              id="input-address"
                              className="form-control form-control-alternative"
                              placeholder="Home Address"
                              type="text"
                              value = {Address}
                              onChange = {(event) => setAddress(event.target.value)}
                            />
                          </div>
                        </div>
                        
                      </div>
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="form-group focused">
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              id="input-city"
                              className="form-control form-control-alternative"
                              placeholder="City"
                              value = {City}
                              onChange = {(event) => setCity(event.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group focused">
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              State
                            </label>
                            <input
                              type="text"
                              id="input-country"
                              className="form-control form-control-alternative"
                              placeholder="State"
                              value = {State}
                              onChange = {(event) => setState(event.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Postal code
                            </label>
                            <input
                              type="number"
                              id="input-postal-code"
                              className="form-control form-control-alternative"
                              placeholder="Postal code"
                              value = {Postal_Code}
                              onChange = {(event) => setPostalCode(event.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-4" />
                    {/* <!-- Description --> */}
                    <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <div className="form-group focused">
                        <label>About Me</label>
                        <textarea
                          rows="4"
                          className="form-control form-control-alternative"
                          placeholder="A few words about you ..."
                          value = {About}
                          onChange= {(event) => setAbout(event.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="row align-items-center justify-content-xl-between">
          <div className="col-xl-6 m-auto text-center">
            <div className="copyright">
              <p>
                Copyright © 2021 <a href="#">Waggin' Tails</a> All rights
                reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default UserProfile;
