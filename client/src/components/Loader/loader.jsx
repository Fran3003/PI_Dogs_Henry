import React from "react";
import s from "./loader.module.css";



const Loader = () => {
    return (
        <div className={s.load}>
            <p>Loading...</p>
            <img src="https://i.gifer.com/Xqg8.gif" alt="gif loading"/>
        </div>
    )
}

export default Loader