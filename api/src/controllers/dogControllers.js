require('dotenv').config();
const axios = require("axios");
// const { Sequelize } = require("sequelize/types");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env

const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`

async function getDogApi() { // funcion asincrona para traer los perros de la API
  let dogsApi = (await axios(URL)).data.map(e => { // traigo los perros de la API y los guardo en una variable, luego los recorro y los guardo en un objeto 
    return { // retorno el objeto 
      id: e.id, // id del perro
      name: e.name.toLowerCase(), // nombre del perro en minuscula 
      temperament: e.temperament, // temperamento del perro 
      height_min: Number(e.height.metric.split("-")[0]), //uso split para separar los valores de la altura y luego los guardo en un array, luego uso el indice 0 para guardar el valor minimo de la altura, luego uso Number para convertirlo en un numero
      height_max: Number(e.height.metric.split("-")[1]), // altura maxima del perro 
      weight_min: Number(e.weight.metric.split("-")[0]), // peso minimo del perro 
      weight_max: Number(e.weight.metric.split("-")[1]), // peso maximo del perro
      life_span: e.life_span, // esperanza de vida del perro
      image: e.image.url // imagen del perro
    }
  })
  console.log(dogsApi)
  return dogsApi 
   
   
}

// async function getDogDB() { // funcion asincrona para traer los perros de la base de datos
//   return await Dog.findAll({ // traigo todos los perros de la base de datos
//     include: { 
//       model: Temperament, 
//       attributes: ['name'], 
//       through: { 
//         attributes: [], 
//       },
//     } // incluyo el modelo de temperamento y los atributos que quiero que me traiga
//       // el through es para que no me traiga los atributos de la tabla intermedia
//       // el include me permite traer los datos de la tabla intermedia
//       // el include me permite traer los datos de la tabla intermedia
//   })
// }

// forma new promise de getDogDB con include
function getDogDB() { // funcion para traer los perros de la base de datos
  return new Promise((resolve, reject) => { // creo una promesa
    Dog.findAll({ // traigo todos los perros de la base de datos
      include: { 
        model: Temperament,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    })
      .then((dogs) => resolve(dogs)) 
      .catch((err) => reject(err));  
  }); 
}


async function getAllDogs() {
  const dogsDB = await getDogDB(); // traigo los perros de la base de datos
  const dogsApi = await getDogApi(); // traigo los perros de la API
  const allDogs = dogsDB.concat(dogsApi) // concateno los perros de la base de datos con los perros de la API
  return allDogs // retorno todos los perros
}
 
async function deleteDog(id) { // funcion asincrona para eliminar un perro por id
  const dog = await Dog.findByPk(id) // busco el perro por id
  if (dog) { // si existe el perro
    await dog.destroy() // lo elimino
    return dog // retorno el perro eliminado
  }
  return null // si no existe el perro retorno null
}




      module.exports = {
        getAllDogs,
        deleteDog,
       
    }
 
    // getDogApi me permite traer los perros de la API y guardarlos en la base de datos, luego los traigo de la base de datos (getDogDB) y los concateno con los perros de la API (getAllDogs)