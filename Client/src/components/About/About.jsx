import React from 'react'
import HEADER from '../Header/Header.jsx'
import NAVBAR from '../Navbar/Navbar.jsx'
import './About.css'
function About() {
  return (
    <div>
      <NAVBAR />
      <div className="container">
        <div className="text-div">
          <h3>About Us</h3>
          <p className="">
            Welcome to SecureFishing.com, your ultimate resource for online
            safety and cybersecurity. In today’s digital age, protecting your
            personal and financial information from cyber threats is more
            important than ever. Our mission is to empower individuals and
            businesses with the knowledge and tools to navigate the internet
            securely and confidently.
          </p>
        </div>
        <div className="image-div">
          <img
            src="https://s3-alpha-sig.figma.com/img/1c68/3a12/f3dbd1c4af8699db89b76ab3359fcd6e?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K63SFGoo4xKH1FB3RMWvouwY6OTcK5ZC8oUFUjz9mTIZqOCEsklrmklpeMCqwFGSAY0SV~zkft4IZHFeWRSk4p1btgfmovQs9WPfhcz2uN27ERsMJB62sjWANYAlRxedL16i9KDVV0fAa0bxUePqoByqc4NcxUbEQt2VmG8SO1zgfKkYQ998EgqGgUJy794NkD5OKdB0whqoOueIQQD-~9GkhYecjlFK7Irz4iLKvInSXarvRu05XHCWsV~rJ9p7M6Fy~IfMtoLUwAtJRS6mj4mEu5dh3gw5WWKPlFpKiVUV-2~V0ggi5hOy9DNOsyx0teZcTIm3Jklt19tJs~BEkg__"
            alt="Descriptive"
          ></img>
        </div>
      </div>
      <div className="main-container">
        <div className="title-section">
          <h2>Meet the Team at SecureFishing.com</h2>
        </div>
        <div className="row-container">
          <div className="row-item">
            <img
              src="https://static.wikia.nocookie.net/0730c64e-f95d-4109-8d5c-2035fce09d89/scale-to-width/755"
              alt="Descriptive Alt Text 1"
            ></img>
            <h3>Yusifov Telman</h3>
            <p>
              Telman is our go-to problem solver who turns complex tech puzzles
              into simple solutions.
            </p>
          </div>
          <div className="row-item">
            <img
              src="https://media.distractify.com/brand-img/5cD0OoA1S/0x0/shaggy-scooby-doo-1665162154518.jpg"
              alt="Descriptive Alt Text 2"
            ></img>
            <h3>Nihad Goydarov</h3>
            <p>
              Nihad is our code wizard who makes sure everything behind the
              scenes runs without a hitch.
            </p>
          </div>
          <div className="row-item">
            <img
              src="https://ih1.redbubble.net/image.5102768960.9393/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
              alt="Ruslan"
            ></img>
            <h3>Gurbanov Ruslan</h3>
            <p>
              Ruslan is the artist of our digital canvas. He crafts the look and
              feel of SecureFishing.com.
            </p>
          </div>
          <div className="row-item">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Tyrannosaurus_Rex_Holotype.jpg/800px-Tyrannosaurus_Rex_Holotype.jpg"
              alt="Descriptive Alt Text 4"
            ></img>
            <h3>Abbasov Aziz</h3>
            <p>
              Aziz is the magician who makes sure your visit to
              SecureFishing.com is a delightful experience.
            </p>
          </div>
        </div>
      </div>
      {/* <div>Join</div> */}
    </div>
  )
}

export default About
