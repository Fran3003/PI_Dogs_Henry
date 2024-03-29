import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { postDog, getAllTemperaments } from "../../redux/actions";
import s from "./DogCreate.module.css";




const DogCreate = () => { 
    const dispatch = useDispatch() 
    const allDogs = useSelector((state) => state.allDogs)  
    const temperaments = useSelector((state) => state.allTemperaments)  
    const [errors, setErrors] = useState({}) 
    const [input, setInput] = useState({ 
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span: "",
        temperaments: []
    })
    

    const validate = (input) => {
        
        let errors = {}

        if (!input.name) {
            errors.name = "Name is required"
        }
        else if (!/^[A-Za-z]+$/.test(input.name)) {
            errors.name = "The name must contain only letters"
        }
        
        else if (input.name.length < 3) {
            errors.name = "The name must contain at least 3 characters"
        }
        if (!input.height_min) {
            errors.height_min = "This parameter is required"
        }
        else if (!Number.isInteger(parseInt(input.height_min))) {
            errors.height_min = "This parameter only accepts integers"
        }
        else if (parseInt(input.height_min) >= parseInt(input.height_max)) {
            errors.height_min = "The lowest height must not exceed the highest height"
        }
        if (!input.height_max) {
            errors.height_max = "This parameter is required"
        }
        else if (!Number.isInteger(parseInt(input.height_max))) {
            errors.height_max = "This parameter only accepts integers"
        }
        else if (parseInt(input.height_max) <= parseInt(input.height_min)) {
            errors.height_min = "The highest height must exceed the lowest height"
        }
        if (!input.weight_min) {
            errors.weight_min = "This parameter is required"
        }
        else if (!Number.isInteger(parseInt(input.weight_min))) {
            errors.weight_min = "This parameter only accepts integers"
        }
        else if (parseInt(input.weight_min) >= parseInt(input.weight_max)) {
            errors.weight_min = "The lowest weight should not exceed the highest weight"
        }
        if (!input.weight_max) {
            errors.weight_max = "This parameter is required"
        }
        else if (!Number.isInteger(parseInt(input.weight_max))) {
            errors.weight_max = "This parameter only accepts integers"
        }
        else if (parseInt(input.weight_max) <= parseInt(input.weight_min)) {
            errors.weight_max = "The higher weight must overcome the lower weight"
        }
        if (!input.life_span) {
            errors.life_span = "This parameter is required"
        }
        else if (!Number.isInteger(parseInt(input.life_span))) {
            errors.life_span = "This parameter only accepts integers"
        }
        else if (input.life_span > 20) {
            errors.life_span = "This parameter cannot exceed 20 years"
        }

        
        return errors
    }


    const handleChange = (e) => { 
        setInput({ 
            ...input, 
            [e.target.name]: e.target.value 
        })
        setErrors(validate({ 
            ...input, 
            [e.target.name]: [e.target.value] 

        }))
        console.log(input)
    }

    useEffect(() => {
        dispatch(getAllTemperaments()) 
    }, [dispatch]) 


    const handleSubmit = (e) => { 
        e.preventDefault(); 
        if (!input.name || !input.height_min || !input.height_max || !input.weight_min || !input.weight_max || !input.life_span || input.temperaments.length === 0) { 
            alert("Complete the required fields (*)") 
        } else if (errors.name || errors.height_min || errors.height_max || errors.weight_min || errors.weight_max || errors.life_span) { 
            alert("Please, review the required data") 
        } else {
            setErrors(validate(input)) 
            dispatch(postDog(input)) 
            setInput({ 
                name: "",
                height_min: "",
                height_max: "",
                weight_min: "",
                weight_max: "",
                life_span: "",
                temperaments: []
            })
            
            
            // history.push('/home')
        }
    }

    const handleSelectTemp = (e) => { 
        if ( !input.temperaments.includes(e.target.value))  
            setInput({ 
                ...input, 
                temperaments: [...input.temperaments, e.target.value] 
            });
            


        
    }

    const handleDelete = (e) => {
        setInput({
            ...input,
            temperaments: input.temperaments.filter(temp => temp !== e)
        })
    }




    return (
        
        <div className={s.container}>
            <div className={s.form}>
                <div className={s.formTitle}>
                    <h2>Create your dog breed</h2>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={s.divCont}>
                        <label >*Name: </label>
                        <input  type="text" name="name" value={input.name} onChange={(e) => handleChange(e)} placeholder="name..." />
                        <div>{errors.name}</div>
                    </div>
                    <div className={s.divCont}>
                        <label >*Lower height: </label>
                        <input  type="text" name="height_min" value={input.height_min} onChange={(e) => handleChange(e)} placeholder="lower height..." />
                        <div>{errors.height_min}</div>
                    </div>
                    <div className={s.divCont}>
                        <label >*Higher height: </label>
                        <input  type="text" name="height_max" value={input.height_max} onChange={(e) => handleChange(e)} placeholder="higher height" />
                        <div>{errors.height_max}</div>
                    </div>
                    <div className={s.divCont}>
                        <label >*Lower weight: </label>
                        <input  type="text" name="weight_min" value={input.weight_min} onChange={(e) => handleChange(e)} placeholder="lower height..." />
                        <div>{errors.weight_min}</div>
                    </div>
                    <div className={s.divCont}>
                        <label >*Higher weight: </label>
                        <input  type="text" name="weight_max" value={input.weight_max} onChange={(e) => handleChange(e)} placeholder="higher weight" />
                        <div>{errors.weight_max}</div>
                    </div>
                    <div className={s.divCont}>
                        <label >*Life span: </label>
                        <input  type="text" name="life_span" value={input.life_span} onChange={(e) => handleChange(e)} placeholder="life span" />
                        <div>{errors.life_span}</div>
                    </div>
                    <div className={s.divCont}>
                        <label >*Temperaments: </label>
                        <select  name="temperaments" onChange={(e) => handleSelectTemp(e)}>
                            <option className={s.formOption}>All temperaments</option>
                            {
                                temperaments && temperaments.map(temp => (
                                    <option className={s.formOption} key={temp.id} value={temp.name}>{temp.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div >
                        {
                            input.temperaments.map(t =>
                                
                                    {
                                    return(<span>{t} <button className={s.btnX} type="button" onClick={() => handleDelete(t)}>x</button></span>)
                                }
                                )
                        }
                    </div>
                    <div className={s.button}>
                        <button type="submit">CREATE</button>
                        <Link to="/home"><button >HOME</button></Link>
                    </div>
                </form>
            </div>
        </div>



    )

}

export default DogCreate;



