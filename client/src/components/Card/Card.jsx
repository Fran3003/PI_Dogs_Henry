import React from "react"
import s from "./Card.module.css"




const Card = ({ name, temperament, weight_min, weight_max, image }) => {

    return (
        <div className={s.container}>
            <div className={s.carta}>
            <img src={image} alt="dog" width="200px" height="200px" />
            <h3>{name.toUpperCase()}</h3>
            <p>TEMPERAMENT: <br />{temperament + "  "}</p>
            <p>{weight_min}</p>
            <p>{weight_max}</p>
            </div>
        </div>
    )
}




export default Card



