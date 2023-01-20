import React from "react";
import {Link} from 'react-router-dom';
import '../css/MainPageWt.css';
 function MainPageWT(){
    return (
        <div className = "MainPage">
<section className="banner">
        <div className="box content">
            <header>
                <img src="assests/images/logo.jpeg" alt="Flowers in Chania" width="40" height="40" className="logo"/>
                
                <ul>
                    <li><Link to= "/SignupPM"> Pet's Match </Link></li>
                    
                </ul>
            </header>

            <div className="contentBox">
                <h2>WAGGIN' TAILS</h2>
                <p> A playdate and volunteering website for pets. Helps your pet to find a perfect match to play with and a volunteer for pet
care. 
                    <span id="dots">...</span><span id="more">erisque enim
            Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero
            sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus
            gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus
            pulvinar nibh tempor porta.</span>
                </p>
                {/* <button onClick="myFunction()" id="myBtn">Read more</button> */}
            </div>
            <ul className="sci">


                <h3>Contact Us</h3>

                <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fa fa-whatsapp" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fa fa-envelope" aria-hidden="true"></i></a></li>
                

            </ul>
            
        </div>
        <div className="box images">
            <div className="imgBx">
                <img src="assests/images/Copy of Brown Geometric Flower Bloom Beauty Logo.png" alt="1"/>
            </div>
            <div className="imgBx">
                <img src="assests/images/Copy of Black Geometric Flower Bloom Beauty Logo.png" alt="2"/>
            </div>
            <div className="imgBx">
                <img src="assests/images/Copy of Brown & Pink Minimalist Gardening Line Art Logo.png" alt="3"/>
                <div className="bottom">
                    <p>Copyright © 2021 <a href="#"> Waggin'Tails</a> All rights reserved</p>
                </div>
            </div>

        </div>
    </section>                
        </div>
    );
 }
 export default MainPageWT;