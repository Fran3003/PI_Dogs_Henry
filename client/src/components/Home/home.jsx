import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllDogs, filterByBreeds, orderAlphabetic, orderWeight, getAllTemperaments, filterByTemperaments, filterByWeight } from "../../redux/actions";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import s from "./home.module.css";
import Paginado from "../Paginado/Paginado";
import Loader from "../Loader/loader";

const Home = () => {

   const dispatch = useDispatch();

   const allDogs = useSelector((state) => state.dogs)
   const allTemperaments = useSelector((state) => state.allTemperaments)
   // console.log(allDogs)
   const [, setOrder] = useState('')

   //paginado
   const [currentPage, setCurrentPage] = useState(1) //estado de la página actual
   const [dogsPage] = useState(8) //cantidad de perros por página

   const lastDog = currentPage * dogsPage  //8
   const firstDog = lastDog - dogsPage // 8 - 8 = 0 esto es para que no me muestre los 8 primeros perros
   const currentDogs = allDogs.slice(firstDog, lastDog) //dogs en la página actual


   const paginado = (pageNum) => { //recibe el número de página
      setCurrentPage(pageNum) //setea el estado currentPage con el número de página
   }
   
   useEffect(() => {
      dispatch(getAllDogs())
      dispatch(getAllTemperaments())
   }, [dispatch])


   const handleRefresh = (e) => {
      dispatch(getAllDogs())
   }

   const handleFilterBreeds = (e) => {
      e.preventDefault()
      dispatch(filterByBreeds(e.target.value))
      setCurrentPage(1)

   }

   const handleFilterTemperaments = (e) => {
      e.preventDefault()
      dispatch(filterByTemperaments(e.target.value))
      setCurrentPage(1)
   }

   const handleOrderAlph = (e) => {
      e.preventDefault()
      dispatch(orderAlphabetic(e.target.value))
      setCurrentPage(1)
      setOrder(e.target.value)
   }

   const handleOrderWeight = (e) => {
      e.preventDefault()
      dispatch(orderWeight(e.target.value))
      setOrder(e.target.value)
      setCurrentPage(1)
   }

   // const handleFilterWeight = (e) => {
   //    e.preventDefault()
   //    dispatch(filterByWeight(e.target.value))
   //    setCurrentPage(1)

   // }

   return (
      <>
         <div className={s.tittle}><h1>Henry Dogs</h1>
            <div>
            <div><SearchBar /></div>
               </div>
            <div>
               <div className={s.ordName}>
                  <label> NAME </label>
                  <select onChange={e => handleOrderAlph(e)} name="ordenar alfabéticamente" id="">
                     <option hidden>Alphabetic order</option>
                     <option value="asc"> A - Z </option>
                     <option value="desc"> Z - A </option>
                  </select>
               </div>

               <div className={s.filterBreeds}>
                  <label> BREEDS </label>
                  <select onChange={e => handleFilterBreeds(e)}>
                     <option value="all">All breeds</option>
                     <option value="existent">Existent</option>
                     <option value="created">Created</option>
                  </select>
                  
               </div>
            </div>

            <div>
               <div  className={s.ordWei}>
                  <label> WEIGHT </label>
                  <select onChange={e => handleOrderWeight(e)} id="">
                     <option hidden>Order by weight</option>
                     <option value="asc">  (- kg)  </option>
                     <option value="desc"> (+ kg)  </option>
                  </select>
                  
               </div>
                  
               <div className={s.filterTemp}>
                  <label> TEMPERAMENTS </label>
                  <select onChange={handleFilterTemperaments}>
                     <option value="all">All temperaments</option>
                     {
                        allTemperaments.map(temp => (
                           <option value={temp.name} key={temp.id}>{temp.name}</option>
                        ))}
                  </select>
               </div>

               {/* <div className={s.filterWei}>
                  <label> WEIGHT </label>
                  <select onChange={e => handleFilterWeight(e)}>
                     <option hidden>Filter by weight</option>
                     <option value="all">All</option>
                     <option value="10kg">-10kg</option>
                  </select>
                  </div> */}

            </div>
            <div className={s.btn}><Link to='/dogs' style={{ textDecoration: "none" }}><button>Create dog</button></Link>
                           <br />
                           <br />
                           <br />
            <button onClick={e => handleRefresh(e)}>Refresh</button>
            </div>
            
         </div><div>


            <div className={s.container}>

               {currentDogs.length ? currentDogs.map((e) => {
                  return (
                     <Link to={"/dogs/" + e.id} key={e.id} style={{ textDecoration: 'none' }}>
                        <div key={e} className={s.home}>
                           <Card
                              name={e.name}
                              temperament={e.temperament ? e.temperament.toLowerCase() : (e.temperaments && e.temperaments.map((t) => " " + t.name.toLowerCase()))}
                              weight_min={"LOWER WEIGHT: " + e.weight_min + " kg"}
                              weight_max={"HIGHER WEIGTH: " + e.weight_max + " kg"}
                              image={e.image} />
                        </div>
                     </Link>
                  );
               }
               ) : <Loader>
               </Loader>}
               <div />
               <div>
               </div>

            </div>

            <div />


            <Paginado
               dogsPage={dogsPage} //cantidad de perros por página
               allDogs={allDogs.length} //cantidad total de perros
               paginado={paginado} //función para cambiar de página
            />
         </div></>

   )
}

export default Home