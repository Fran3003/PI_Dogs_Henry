import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { getDogDetail, resetState, deleteCreatedDog } from "../../redux/actions"
import { Link } from "react-router-dom"
import { useHistory } from "react-router"
import Loader from "../Loader/loader"
import s from "./dogDetail.module.css"

const DogDetail = () => {
    const dispatch = useDispatch()
    const dog = useSelector((state) => state.dogDetail)
    const { id } = useParams() //id del perro
    // const history = useHistory()

    useEffect(() => { //cuando se monta el componente
        dispatch(getDogDetail(id)) //llama a la acción getDogDetail
        dispatch(resetState()) //llama a la acción resetState
    }, [dispatch, id]) //cuando cambia el dispatch o el id

    
    const history = useHistory()

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteCreatedDog(id))
        history.push("/home")
    }

    return (
        <div className={s.principal}>

            <div className={s.details}>
                <Link to="/home" ><button><h1>BACK</h1></button></Link>
            </div>

            {dog.length > 0 ?
                <>
                    <section className={s.section}>
                        <img className={s.img} src={dog[0].image} alt="dog" />
                        <div className={s.container1}>
                            <br />
                            <h1>{dog[0].name.toUpperCase()}</h1>
                            <hr />
                            <br />
                            <h2>Temperament: {dog[0].temperament ? dog[0].temperament.toLowerCase() : (dog[0].temperaments && dog[0].temperaments.map((t) => " " + t.name.toLowerCase()))}</h2> 
                            <h2>Lower weight: {dog[0].weight_min} kilograms</h2>
                            <h2>Higher weight: {dog[0].weight_max} kilograms</h2>
                            <h2>Lower height: {dog[0].height_min} centimeters</h2>
                            <h2>Higher height: {dog[0].height_max} centimeters</h2>
                            <h2>Life span: {dog[0].life_span} </h2>

                            {dog[0].id.length === 36 && <button onClick={handleDelete}>DELETE</button>}
                            
                        </div>
                    </section>
                </>
                :
                <Loader />
            }

        </div>
    )
}

export default DogDetail