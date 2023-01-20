import React, { useEffect, useState } from "react";
import "../css/PetProfile.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
function PetProfile() {
  const Navigate = useNavigate();

  let User;
  if (!User) {
    User = JSON.parse(localStorage.getItem("User"));
  }
  const [Images, setImages] = useState([]);
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (!User) {
      Navigate("/SignupPM");
    }
  });
  useEffect(() => {
    async function fetchImages() {
      if (User) {
        let response = await fetch(
          `http://localhost:9002/GetImages/${User._id}`
        );
        let data = await response.json();
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          const buffer = Buffer.from(data[i].image.data.data);
          const arrayBuffer = buffer.slice(
            buffer.byteOffset,
            buffer.byteOffset + buffer.byteLength
          );
          const blob = new Blob([arrayBuffer], {
            type: data[i].image.contentType,
          });
          arr.push({
            src: URL.createObjectURL(blob),
            key: i,
            _id: data[i]._id,
          });
        }
        setImages(arr);
        const response2 = await fetch(
          `http://localhost:9002/GetProfilePhoto/${User._id}`
        );
        const data2 = await response2.blob();
        setImage(URL.createObjectURL(data2));
      } else {
        Navigate("/SignupPM");
      }
    }
    if (User) fetchImages();
  }, [User._id, Navigate]);
  function DeletePhoto(props) {
    const id = {
      id: props.id,
    };
    axios.post("http://localhost:9002/DeletePhoto", id).then((res) => {
      toast.error(res.data.message, {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        theme: "dark",
      });
    });
    window.location.reload(false);
  }
  function Card(props) {
    return (
      <div className="gallery-item" tabIndex="0" key={uuidv4()}>
        <button
          className="dlt_btn"
          onClick={() => {
            DeletePhoto({ id: props._id });
            // alert('Delete Photo
          }}
        >
          {"    "}
          &#10006;{"    "}
        </button>
        <img src={props.src} className="gallery-image" alt="" />
        <div className="gallery-item-info"></div>
      </div>
    );
  }
  function ChangeProfile(event) {
    const formData = new FormData();
    console.log(event.target.files[0]);
    formData.append("Image", event.target.files[0]);
    formData.append("id", User._id);
    axios
      .post("http://localhost:9002/ChangeProfile", formData)
      .then((res) => {
        setImage(URL.createObjectURL(event.target.files[0]));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function AddPhoto(event) {
    const formData = new FormData();
    formData.append("Image", event.target.files[0]);
    Images.push({ src: URL.createObjectURL(event.target.files[0]) });
    formData.append("id", User._id);
    axios
      .post("http://localhost:9002/AddPhotos", formData)
      .then((res) => {
        alert(res.data.message);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="pet-profile">
      <div>
        <div className="container">
          <Link to="/MemberArea">
            <button className="button-63" role="button">
              &#10096; Home{" "}
            </button>
          </Link>
          <div className="profile">
            <div className="profile-image">
              <div className="profile-images-card">
                <div className="profile-images">
                  <img src={image} alt="Imagea" id="upload-img" />
                </div>
                <div className="custom-file">
                  <label className="button-15" htmlFor="fileupload">
                    Change Profile
                  </label>
                  <input
                    type="file"
                    id="fileupload"
                    accept="image/*"
                    onChange={ChangeProfile}
                    encType="multipart/form-data"
                  />
                </div>
              </div>
            </div>
            <div className="profile-user-settings">
              <h1 className="profile-user-name">{User ? User.PetName : ""}</h1>
              {/* <Link to = "/EditPetProfile"> */}
              <button className="btn profile-edit-btn button-15">
                <Link to="/EditPetProfile"> Edit Profile</Link>
              </button>
              {/* </Link> */}
              <button
                className="btn profile-settings-btn"
                aria-label="profile settings"
              >
                <i className="fas fa-cog" aria-hidden="true"></i>
              </button>
            </div>
            <div className="profile-stats">
              <ul>
                <li>
                  <span className="profile-stat-count"></span>{" "}
                  {User ? User.Address : ""},{User ? User.City : ""},
                  {User ? User.State : ""}, {User ? User.Postal_Code : ""}{" "}
                </li>
              </ul>
            </div>
            <div className="profile-bio">
              <p>
                <span className="profile-real-name">
                  {User ? User.PetAbout : ""}
                </span>{" "}
              </p>
              <p>
                <span className="profile-real-name">
                  {User ? User.PetSchedule : ""}
                </span>{" "}
              </p>
            </div>
            <div className="custom-file">
              <label htmlFor="addphoto" className="button-87">
                Add Photo
              </label>
              <input
                type="file"
                id="addphoto"
                accept="image/*"
                onChange={AddPhoto}
                encType="multipart/form-data"
              />
            </div>
          </div>
          {/* <!-- End of profile section --> */}
        </div>
        {/* <!-- End of container --> */}

        <main>
          <div className="container">
            <div className="gallery">
              {Images.map(Card)}
              <ToastContainer />
            </div>
            {/* <!-- End of gallery --> */}
          </div>
          {/* <!-- End of container --> */}
        </main>
      </div>
    </div>
  );
}
export default PetProfile;
