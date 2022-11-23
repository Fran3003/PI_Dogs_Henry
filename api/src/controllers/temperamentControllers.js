require('dotenv').config(); // variable de entorno
const axios = require('axios');
const {Temperament} = require('../db'); // importo el modelo de temperamento
const {API_KEY} = process.env; // variable de entorno

const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`; // URL de la API la guardo en una variable para no repetir el codigo 

async function getTempApi(req, res) { // funcion asincrona para traer los temperamentos de la API
    let temperamentsAPI = (await axios(URL)).data.map(e => (e.temperament)).toString().replaceAll(" ", "").split(",").reduce((acc, item) => { // traigo los temperamentos de la API y los guardo en una variable, luego los separo por comas y los guardo en un array, luego los recorro y los guardo en un objeto. hago esto porque de la API me llegan los temperamentos como un string separado por comas y quiero que me lleguen como un array de strings
        if (!acc.includes(item)) { // si el objeto no incluye el item (temperamento) lo agrega
            acc.push(item); // acc es el objeto que voy a retornar y push es el metodo que agrega un item al array
        }
        return acc;  // retorno el objeto 
    }, []) 
    // TemperamentsAPI es un array de strings
    temperamentsAPI.map(element => { // recorro el array de temperamentos de la API
        Temperament.findOrCreate({  // busco en la base de datos si el temperamento ya existe
             
            where: { name: element },  // busco por nombre, si el nombre del temperamento ya existe no lo agrega
        }) 
    });


    let allTemps = await Temperament.findAll() // traigo todos los temperamentos de la base de datos
    allTemps = allTemps.filter(t => t.name !== "")  // filtro los temperamentos que no tienen nombre
    res.send(allTemps)  // envio los temperamentos a la ruta
    console.log(allTemps) 
 
    // la funcion getTempApi me permite traer los temperamentos de la API y guardarlos en la base de datos, luego los traigo de la base de datos y los envio a la ruta
}

module.exports = {
    getTempApi
}
