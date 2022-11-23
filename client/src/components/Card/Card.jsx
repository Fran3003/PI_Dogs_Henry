import React from "react"
import s from "./Card.module.css"


//componente funcional

// const Card = ({ name, temperament, weight_min, weight_max, image }) => {

//     return (
//         <div className={s.container}>
//             <div className={s.carta}>
//             <img src={image} alt="dog" width="200px" height="200px" />
//             <h3>{name.toUpperCase()}</h3>
//             <p>TEMPERAMENT: <br />{temperament + "  "}</p>
//             <p>{weight_min}</p>
//             <p>{weight_max}</p>
//             </div>
//         </div>
//     )
// }

// componente de clase

class Card extends React.Component {
    render() {
        return (
            <div className={s.container}>
                <div className={s.carta}>
                <img src={this.props
                .image} alt="dog" width="200px" height="200px" />
                <h3>{this.props.name.toUpperCase()}</h3>
                <p>TEMPERAMENT: <br />{this.props.temperament + "  "}</p>
                <p>{this.props.weight_min}</p>
                <p>{this.props.weight_max}</p>
                </div>
            </div>
        )
    }
}




export default Card



