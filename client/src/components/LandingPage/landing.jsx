import React from "react";
import { Link } from "react-router-dom";
import s from "./landing.module.css";


const LandingPage = () => {
    return (
        <div className={s.inicio}>
            <h1>Welcome to Dog App</h1>
            <Link to="/home">
                <button></button>
            </Link>
        </div>
    )
}

export default LandingPage;