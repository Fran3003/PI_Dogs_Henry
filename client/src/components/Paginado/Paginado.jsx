import React from 'react'
import s from './Paginado.module.css'




const Paginado = ({ allDogs, dogsPage, paginado }) => { 

    const pageNum = [] 
    
    for (let i = 1; i <= Math.ceil(allDogs / dogsPage); i++) {  
        pageNum.push(i) 

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