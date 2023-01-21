import "./home.css"
import { Link } from "react-router-dom"
import Animation from "./Animation"
import { useState } from "react"

const Home = () => {

    const [load, setLoad] = useState(true)

    setTimeout(() => {
        setLoad(false)
    }, 2000)

    if (load) return (
        <div className="animation">
            {Animation}
            <p className="home-anim">Please wait a moment</p>
        </div>)

    return (
        <div className="loding-parent">
            <div className="loding-page">
                <div className="image-section">
                    <img className="team-image" src="https://wallpapercave.com/dwp2x/wp10683522.jpg" alt="Loding..." />
                </div>
                <div className="enter-section">
                    <h2 className="x-heading">10X team 04</h2>
                    <p className="self-text">Hi, I am Apurba Ruidas. I built this web application using React, Node.js, Express.js, MongoDB, and AWS S3</p>
                    <Link to="/posts"><button className="enter-button">Enter</button></Link>
                </div>
            </div>
        </div>
    )
}
export default Home