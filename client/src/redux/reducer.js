import { GET_ALL_DOGS, FILTER_BY_BREEDS, ORDER_ALPHABETIC, ORDER_WEIGHT, GET_DOGS_BY_NAME, POST_DOG, GET_ALL_TEMPERAMENTS, FILTER_BY_TEMPERAMENTS, GET_DOG_DETAIL, RESET_STATE, DELETE_CREATED_DOG, FILTER_BY_WEIGHT } from "./actions"

const initialState = {
    // estado inicial de la app  
    dogs: [], // todos los perros
    allDogs: [], // todos los perros sin filtrar por temperamento o raza 
    allTemperaments: [], // todos los temperamentos  
    dogDetail: [], // detalle de un perro  

};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DOGS:
            // en el caso de que el action.type sea GET_ALL_DOGS, se retorna un nuevo estado con los perros que vienen en el payload
            return {
                ...state, // se retorna el estado anterior
                dogs: action.payload,   // se reemplaza el estado anterior por el nuevo
                allDogs: action.payload  // se reemplaza el estado anterior por el nuevo
            }

        case GET_DOGS_BY_NAME:
            return {
                ...state, // se retorna el estado anterior
                dogs: action.payload // se reemplaza el estado anterior por el nuevo
            }

        case GET_ALL_TEMPERAMENTS:
            return {
                ...state,
                allTemperaments: action.payload
            }

        case GET_DOG_DETAIL:
            return {
                ...state,
                dogDetail: action.payload
            }


        case POST_DOG:
            return {
                ...state,
            }

        case FILTER_BY_BREEDS:
            const allBreeds = state.allDogs // se guarda en una variable el estado de todos los perros
            const filteredBreeds = action.payload === "all"// si el payload es "all" se retorna el estado de todos los perros 
                ? allBreeds // se retorna el estado de todos los perros
                : action.payload === "created" ? allBreeds.filter(el => el.createdDB) : allBreeds.filter(el => !el.createdDB) // si el payload es "created" se filtran los perros que fueron creados por el usuario, si no, se filtran los perros que no fueron creados por el usuario
            return { // se retorna un nuevo estado con los perros filtrados
                ...state, // se retorna el estado anterior
                dogs: filteredBreeds // se reemplaza el estado anterior por el nuevo
            }

        // el case de FILTER_BY_BREEDS sirve para filtrar los perros por raza, si el payload es "all" se retorna el estado de todos los perros, si el payload es "created" se filtran los perros que fueron creados por el usuario, si no, se filtran los perros que no fueron creados por el usuario


        case FILTER_BY_TEMPERAMENTS:
            const allDogs = state.allDogs.filter(e => e.temperament || e.temperaments)
            const dogFilterTemp = action.payload === "all" ? allDogs : allDogs.filter(el => {
                if (el.temperament) return el.temperament.includes(action.payload);
                if (el.temperaments) {
                    const temp = el.temperaments.map(e => e.name)
                    return temp.includes(action.payload)
                }
                return true
            })

            return {
                ...state,
                dogs: dogFilterTemp
            }

        // el case de FILTER_BY_TEMPERAMENTS sirve para filtrar los perros por temperamento, si el payload es "all" se retorna el estado de todos los perros, si no, se filtran los perros que contengan el temperamento que viene en el payload

        case ORDER_ALPHABETIC:
            const orderDog = action.payload === "asc" ? // si el payload es "asc" se ordenan los perros de forma ascendente, si no, se ordenan de forma descendente
                state.dogs.sort(function (a, b) { // se ordenan los perros de forma ascendente
                    if (a.name > b.name) { // si el nombre del perro a es mayor al nombre del perro b
                        return 1; // se retorna 1
                    }
                    if (b.name > a.name) { // si el nombre del perro b es mayor al nombre del perro a

                        return -1 // se retorna -1
                    }
                    return 0; // si no se retorna 0
                }) :
                state.dogs.sort(function (a, b) { // se ordenan los perros de forma descendente
                    if (a.name > b.name) { // si el nombre del perro a es mayor al nombre del perro b
                        return -1 // se retorna -1
                    }
                    if (b.name > a.name) { // si el nombre del perro b es mayor al nombre del perro a
                        return 1 // se retorna 1
                    }
                    return 0; // si no se retorna 0
                })
            return {
                ...state,
                dogs: orderDog
            }

        // el case de ORDER_ALPHABETIC sirve para ordenar los perros alfabeticamente, si el payload es "asc" se ordenan de la A a la Z, si no, se ordenan de la Z a la A, se utiliza el metodo sort para ordenar los perros, se utiliza la funcion sort para ordenar los perros, si el nombre del perro a es mayor al nombre del perro b, se retorna 1, si el nombre del perro b es mayor al nombre del perro a, se retorna -1, si no, se retorna 0, si el payload es "asc" se ordenan de la A a la Z, si no, se ordenan de la Z a la A

        case ORDER_WEIGHT:
            const orderWeight = action.payload === "asc" ? // si el payload es "asc" se ordenan los perros de forma ascendente, si no, se ordenan de forma descendente
                state.dogs.sort(function (a, b) { // se ordenan los perros de forma ascendente
                    if ((a.weight_min !== null ? a.weight_min : 10) > (b.weight_min !== null ? b.weight_min : 10)) {
                        // si el peso minimo del perro a es mayor al peso minimo del perro b o si el peso minimo del perro a es null y el peso minimo del perro b es mayor a 10, se retorna 1
                        return 1
                    }

                    if ((b.weight_min !== null ? b.weight_min : 10) > (a.weight_min !== null ? a.weight_min : 10)) { // si el peso minimo del perro b es mayor al peso minimo del perro a o si el peso minimo del perro b es null y el peso minimo del perro a es mayor a 10, se retorna -1

                        return -1
                    }
                    return 0;
                }) :
                state.dogs.sort(function (a, b) { // se ordenan los perros de forma descendente
                    if ((a.weight_min !== null ? a.weight_min : 10) > (b.weight_min !== null ? b.weight_min : 10)) { // si el peso minimo del perro a es mayor al peso minimo del perro b o si el peso minimo del perro a es null y el peso minimo del perro b es mayor a 10, se retorna -1
                        return -1
                    }
                    if ((b.weight_min !== null ? b.weight_min : 10) > (a.weight_min !== null ? a.weight_min : 10)) { // si el peso minimo del perro b es mayor al peso minimo del perro a o si el peso minimo del perro b es null y el peso minimo del perro a es mayor a 10, se retorna 1
                        return 1
                    }
                    return 0;
                })
            return {
                ...state,
                dogs: orderWeight
            }

        // el case de ORDER_WEIGHT sirve para ordenar los perros por peso, si el payload es "asc" se ordenan de menor a mayor, si no, se ordenan de mayor a menor, se utiliza el metodo sort para ordenar los perros, se utiliza la funcion sort para ordenar los perros, si el peso minimo del perro a es mayor al peso minimo del perro b, se retorna 1, si el peso minimo del perro b es mayor al peso minimo del perro a, se retorna -1, si no, se retorna 0, si el payload es "asc" se ordenan de menor a mayor, si no, se ordenan de mayor a menor, se utiliza el metodo sort para ordenar los perros, se utiliza la funcion sort para ordenar los perros, si el peso minimo del perro a es mayor al peso minimo del perro b, se retorna 1, si el peso minimo del perro b es mayor al peso minimo del perro a, se retorna -1, si no, se retorna 0, si el payload es "asc" se ordenan de menor a mayor, si no, se ordenan de mayor a menor


        case RESET_STATE:
            return {
                ...state,
                dogDetail: {}
            }
            // el case de RESET_STATE sirve para resetear el estado de la pagina de detalle de perro, se retorna un objeto vacio

        case DELETE_CREATED_DOG:
            return {
                ...state,
                dogs: state.dogs.filter(dog => dog.id !== action.payload)
            }

        case FILTER_BY_WEIGHT:
           // filtrar por peso menor a 10kg
            const dogsWeight = action.payload === "10kg" ? // si el payload es "less" se filtran los perros con peso menor a 10kg, si no, se filtran los perros con peso mayor a 10kg
                state.dogs.filter(dog => dog.weight_min < 10) : // se filtran los perros con peso menor a 10kg
                action.payload === "all" ? // si el payload es "all" se filtran todos los perros, si no, se filtran los perros con peso mayor a 10kg
                    state.dogs : // se filtran todos los perros
                    state.dogs.filter(dog => dog.weight_min > 10) // se filtran los perros con peso mayor a 10kg
                    
                
            return {
                ...state,
                dogs: dogsWeight
            }
            
            

        default: return state
    }

};


export default rootReducer;