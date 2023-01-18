import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsbyName } from "../../redux/actions";
import s from "./SearchBar.module.css"

const SearchBar = () => {

    const dispatch = useDispatch(); 
    const [name, setName] = useState("") 
    


    const handleChange = (e) => {
        e.preventDefault(); 
        setName(e.target.value) 
        console.log(name)
    }

    const handleSubmit = (e) => { 
        if (name.length < 3) { 
            alert("Enter at least three characters") 
        }
        e.preventDefault(); 
        dispatch(getDogsbyName(name)) 
        setName(e.target.value = "")    
    }

    return (
        <div className={s.SearchBar}> 
                <input type="text" placeholder="search..." onChange={e => handleChange(e)} value={name} /> 
                <button type="submit" onClick={(e) => handleSubmit(e)}> </button> 
                
            
        </div>
    )
    
}

export default SearchBar;