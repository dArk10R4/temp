import React from 'react';
import "./Main.css";
import NAVBAR from '../Navbar/Navbar.jsx';
import { Link } from "react-router-dom";
function MainPage() {
  return (
    <div>
      
    <NAVBAR/>
    <div class="middle">
    <div className="parent-div">
      <div className="text-container">
        <div className="text">
          SecureFishing.com 
        </div>
        <div className="text menshe">Hooked on Safety, Cast with</div>
        <div className="text menshe"> Confidence</div>
        <div className="rectangle-background">
          <button className="learn-more-button">
            Learn More
          </button>
        </div>
      </div>
    </div>
    <div className='txt'>Our Commitment</div>
    <div class="parent-container">
  <div class="child-div">
    <h3>Educational Content</h3>
  <p>We offer comprehensive guides, articles, and tutorials on recognizing and avoiding phishing scams and other cyber threats.</p>
  </div>
  <div class="child-div">
    <h3>Community Support</h3>
  <p>Join our community of security-conscious individuals where you can share experiences, ask questions, and get support.</p>
  </div>
  <div class="child-div">
    <h3>Up-to-Date</h3>
  <p>Stay informed with the latest news and updates on cybersecurity trends and threats.</p>
  </div>
</div>

<div className='txt'>Explore Different Fishing Methods</div>

<div class="parent-container">
  <div class="child-div-2">
  Email Phishing
    </div>
  <div class="child-div-2">
  Spear Phishing
   </div>
  <div class="child-div-2">
  Whaling
    </div>
</div>
<div class="parent-container">
  <div class="child-div-2">
  Clone Phishing
    </div>
  <div class="child-div-2">
  Vishing and Smishing
   </div>
  <div class="child-div-2">
  Angler Phishing
    </div>
</div>


        {/*Tam nujno v kajdom napisat pod kajdim kontent*/}
    </div>
        </div>
  );
}

export default MainPage;
