require('dotenv').config();
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env

const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`

async function getDogApi() { 
  let dogsApi = (await axios(URL)).data.map(e => { 
    return {  
      id: e.id, 
      name: e.name.toLowerCase(), 
      temperament: e.temperament,  
      height_min: Number(e.height.metric.split("-")[0]), 
      height_max: Number(e.height.metric.split("-")[1]), 
      weight_min: Number(e.weight.metric.split("-")[0]), 
      weight_max: Number(e.weight.metric.split("-")[1]), 
      life_span: e.life_span, 
      image: e.image.url 
    }
  })
  console.log(dogsApi)
  return dogsApi 
   
   
}

function getDogDB() { 
  return new Promise((resolve, reject) => { 
    Dog.findAll({ 
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
  const dogsDB = await getDogDB(); 
  const dogsApi = await getDogApi(); 
  const allDogs = dogsDB.concat(dogsApi) 
  return allDogs 
}
 
async function deleteDog(id) { 
  const dog = await Dog.findByPk(id) 
  if (dog) { 
    await dog.destroy() 
    return dog 
  }
  return null 
}




      module.exports = {
        getAllDogs,
        deleteDog,
       
    }
 
  