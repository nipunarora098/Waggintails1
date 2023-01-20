import React , {useEffect, useState} from "react";
import '../css/PetProfile.css';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from 'buffer';
import {v4 as uuidv4} from "uuid";
function ShowPetProfile(props){
    let id = props.UserId._id;
    const Navigate = useNavigate();
    const [User , setUser] = useState({});
    const [Images , setImages] = useState([]);
    const [image , setImage] = useState(null);
    useEffect(() => {
        async function fetchImages(){
            if(id){
            let response = await fetch(`http://localhost:9002/GetImages/${id}`);
            let data = await response.json();
            let arr = [];
            for(let i = 0 ; i < data.length ; i++){
                const buffer = Buffer.from(data[i].image.data.data);
                const arrayBuffer = buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
                const blob = new Blob([arrayBuffer], {type: data[i].image.contentType});
                arr.push({src : URL.createObjectURL(blob) , key : i});
            }
            setImages(arr);
            axios.post("http://localhost:9002/GetUserDetails" ,{id : id})
                .then(res =>{
                    let user = res.data.user;
                    const buffer = Buffer.from(user.image.data.data);
                    const arrayBuffer = buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
                    const blob = new Blob([arrayBuffer], {type: user.image.contentType});
                    setImage(URL.createObjectURL(blob));
                    setUser(res.data.user);
                });
            
            }
            else{
                Navigate("/SignupPM")
            }
        }
    if(id) fetchImages();
    },[id , Navigate]);

    function Card(props){
        return (
            <div className="gallery-item" tabIndex="0" key = {uuidv4()}>
            <img src={props.src} className="gallery-image" alt=""/>
            <div className="gallery-item-info">
            </div>
        </div>
        
        ); 
    }
    return (
        <div className = "pet-profile">
            <div>
            <div className="container">
            <Link to = "/Chat">
            <button className="button-63">&#10096; Chat </button>
            </Link>
<div className="profile">
    <div className="profile-image">
        <div className="profile-images-card">
            <div className="profile-images">
                <img src={image} alt = "Imagea" id="upload-img"/>
            </div>
            
        </div>
    </div>
    <div className="profile-user-settings">
        <h1 className="profile-user-name">{User ? User.PetName : ""}</h1>
        {/* </Link> */}
        <button className="btn profile-settings-btn" aria-label="profile settings"></button>
    </div>
    <div className="profile-stats">
        <ul>
            <li><span className="profile-stat-count"></span> {id ? User.Address : ""},{id ? User.City : ""},{User ?User.State : ""}, {User ?User.Postal_Code : ""} </li>
        </ul>
    </div>
    <div className="profile-bio">
        <p><span className="profile-real-name">{id ? User.PetAbout : ""}</span> </p>
        <p><span className="profile-real-name">{id ? User.PetSchedule: ""}</span> </p>
    </div>
</div>
{/* <!-- End of profile section --> */}
</div>
{/* <!-- End of container --> */}

<main>
<div className="container">
    <div className="gallery">
        {Images.map(Card)}
    </div>
    {/* <!-- End of gallery --> */}
</div>
{/* <!-- End of container --> */}

</main>
        </div>
        </div>
    );
}
export default ShowPetProfile;