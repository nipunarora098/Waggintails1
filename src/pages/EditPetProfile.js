import axios from "axios";
import React, { useState , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/editPetProfile.css";
function EditPetProfile() {
  const [image , setImage] = useState(null);
  const User = JSON.parse(localStorage.getItem('User'));
  useEffect(() =>{
    if(!User){
      Navigate('/SignupPM');
    }
  })
  const Navigate = useNavigate();
  const [PetName, setPetName] = useState(User.PetName);
  const [PetBreed, setPetBreed] = useState(User.PetBreed);
  const [PetAge, setPetAge] = useState(User.PetAge);
  const [PetGender, setPetGender] = useState(User.PetGender);
  const [PetAbout, setPetAbout] = useState(User.PetAbout);
  const [PetSchedule, setPetSchedule] = useState(User.PetSchedule);
  useEffect(() => {
    async function fetchImage(){
        if(User){
        const response2 = await fetch(`http://localhost:9002/GetProfilePhoto/${User._id}`);
        const data2 = await response2.blob();
        setImage(URL.createObjectURL(data2));
        }
        else{
            Navigate("/SignupPM")
        }
    }
if(User) fetchImage();
},[User._id ,Navigate , User]);
  const SubmitPetDetails = (event) => {
    const Pet = {
      _id: User._id,
      PetName: PetName,
      PetBreed: PetBreed,
      PetAge: PetAge,
      PetGender: PetGender,
      PetAbout: PetAbout,
      PetSchedule: PetSchedule,
    };
    axios.post("http://localhost:9002/SubmitPetDetails", Pet).then((res) => {
      alert(res.data.message);
      localStorage.setItem('User', JSON.stringify(res.data.user));
      Navigate("/PetProfile");
    });
  };
  function Logout(){
    localStorage.removeItem('User');
    Navigate("/SignupPM");
  }
  return (
    <div className="EditPet">
      <div className="main-content">
        <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center">
          <img
            src="assests/images/dog.jpeg"
            style={{
              minHeight: "400px",
              backgroundImage: "assests/images/dog.jpeg",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center top",
            }}
            alt = "dog"
          />

          <span className="mask bg-gradient-default opacity-8"></span>
          <div className="container-fluid d-flex align-items-center">
            <div className="row">
              <div className="col-lg-7 col-md-10">
                <p className="text-white mt-0 mb-5"></p>
                {/* <!-- <a href="#!" className="btn btn-info">Edit profile</a> --> */}
                {/* <!-- <a href="#!" className="btn btn-info">Submit</a> --> */}
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
                      <h3 className="mb-0">Your Pet's Account</h3>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form>
                    <div className="profile-image">
                      <div className="profile-images-card">
                        <div className="profile-images">
                          <img src={image} id="upload-img" alt = "profile" />
                        </div>
                        
                      </div>

                      {/* <!-- <img src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces" alt=""> --> */}
                    </div>
                    <h6 className="heading-small text-muted mb-4">Pet Info</h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group focused">
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Pet's name
                            </label>
                            <input
                              type="text"
                              id="input-username"
                              className="form-control form-control-alternative"
                              placeholder="Name"
                              value = {PetName}
                              onChange = {(event) => setPetName(event.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label
                              className="form-control-label"
                              htmlFor="input-breed"
                            >
                              Pet's breed
                            </label>
                            <input
                              type="text"
                              id="input-breed"
                              className="form-control form-control-alternative"
                              placeholder="Breed"
                              value = {PetBreed}
                              onChange = {(event) => setPetBreed(event.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group focused">
                            <label
                              className="form-control-label"
                              htmlFor="input-age"
                            >
                              Pet's age
                            </label>
                            <input
                              type="number"
                              id="input-age"
                              className="form-control form-control-alternative"
                              placeholder="Age"
                              value = {PetAge}
                              onChange = {(event) => setPetAge(event.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group focused">
                            <label
                              className="form-control-label"
                              htmlFor="input-gender"
                            >
                              Pet's gender
                            </label>
                            <select
                              required
                              name="gender"
                              className="form-control form-control-alternative"
                              value = {PetGender}
                              onChange = {(event) => setPetGender(event.target.value)}
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-4" />
                    {/* <!-- Description --> */}
                    <h6 className="heading-small text-muted mb-4">
                      More About Your Pet
                    </h6>
                    <div className="pl-lg-4">
                      <div className="form-group focused">
                        <textarea
                          rows="4"
                          className="form-control form-control-alternative"
                          placeholder="Medical And Health Conditions (Allergies if any)"
                          value = {PetAbout}
                          onChange = {(event) => setPetAbout(event.target.value)}
                        ></textarea>
                      </div>
                    </div>
                    <div className="pl-lg-4">
                      <div className="form-group focused">
                        <textarea
                          rows="4"
                          className="form-control form-control-alternative"
                          placeholder="Daily Schedule Of Your Pet"
                          value = {PetSchedule}
                          onChange = {(event) => setPetSchedule(event.target.value)}
                        ></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-7 col-md-10">
                        <Link to = "/PetProfile" className = "btn btn-info">
                            Cancel
                        </Link>
                        <Link to = "/PetProfile" onClick = {SubmitPetDetails} className="btn btn-info">
                          Update Profile
                        </Link>
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
                Copyright © 2021 <Link to = "/" onClick = {Logout}>Waggin' Tails</Link> All rights
                reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default EditPetProfile;
