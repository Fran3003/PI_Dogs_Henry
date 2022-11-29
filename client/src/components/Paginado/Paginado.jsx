import React from 'react'
import s from './Paginado.module.css'




const Paginado = ({ allDogs, dogsPage, paginado }) => { //recibe todos los perros y la cantidad de perros por página

    const pageNum = [] //array de páginas
    
    for (let i = 1; i <= Math.ceil(allDogs / dogsPage); i++) {  //recorre el array de perros y divide por la cantidad de perros por página
        pageNum.push(i) //push agrega un elemento al final del array

    }
   
    return (
        <nav>
            <div className={s.PaginationContainer}>
                    <ul style={{ display: "inline-block" }}>
                        <li style={{
                            listStyle: "none",
                            display: "inline"
                        }}>
                        {pageNum?.map(num =>
                            <div className={s.NumberPaginate}
                                onClick={() => paginado(num)} key={num}>{num}
                            </div>
                        )}
                            </li>
                       
                    </ul> 
            </div>
        </nav>
    )
}

export default Paginado