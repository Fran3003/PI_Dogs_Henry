import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsbyName } from "../../redux/actions";
import s from "./SearchBar.module.css"

const SearchBar = () => {

    const dispatch = useDispatch(); // dispatch es una función que me permite ejecutar una acción específica en el store de redux, es decir, ejecutar una acción en el reducer de redux, en este caso, ejecutar la acción getDogsByName que está en el reducer de dogs y que me trae los perros que coincidan con el nombre que le paso por parámetro a la función getDogsByName que está en el action creator de dogs (actions.js), que a su vez, es una función que me devuelve un objeto con la acción que quiero ejecutar en el reducer de redux (en este caso, la acción getDogsByName) y el payload que es el nombre que le paso por parámetro a la función getDogsByName que está en el action creator de dogs (actions.js) y que es el nombre que quiero que coincida con el nombre de los perros que quiero traer de la base de datos. 
    const [name, setName] = useState("") // useState es un hook que me permite manejar el estado de un componente, en este caso, el estado del input de búsqueda de perros por nombre. El estado de un componente es un objeto que contiene las propiedades que quiero que tenga ese componente. En este caso, el estado del input de búsqueda de perros por nombre tiene una propiedad que se llama name que es la que contiene el valor del input de búsqueda de perros por nombre.
    





    const handleChange = (e) => {
        e.preventDefault(); //evita que se recargue la página
        setName(e.target.value) //setea el estado name con el valor del input
        console.log(name)
    }

    const handleSubmit = (e) => { //función que se ejecuta al hacer submit
        if (name.length < 3) { //si el input tiene menos de 3 caracteres, no hace nada
            alert("Enter at least three characters") //alerta
        }
        e.preventDefault(); //evita que se recargue la página
        dispatch(getDogsbyName(name)) //dispatchea la acción getDogsbyName con el valor del input
        setName(e.target.value = "")    //setea el estado name con el valor del input
    }

    return (
        <div className={s.SearchBar}> 
                <input type="text" placeholder="search..." onChange={e => handleChange(e)} value={name} /> 
                <button type="submit" onClick={(e) => handleSubmit(e)}> </button> 
                
            
        </div>
    )
    
}

export default SearchBar;