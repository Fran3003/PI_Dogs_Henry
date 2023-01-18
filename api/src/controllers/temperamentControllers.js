require('dotenv').config(); 
const axios = require('axios');
const {Temperament} = require('../db'); 
const {API_KEY} = process.env; 

const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`; 

async function getTempApi(req, res) { 
    let temperamentsAPI = (await axios(URL)).data.map(e => (e.temperament)).toString().replaceAll(" ", "").split(",").reduce((acc, item) => { 
        if (!acc.includes(item)) {
            acc.push(item); 
        }
        return acc;  
    }, []) 
    
    temperamentsAPI.map(element => { 
        Temperament.findOrCreate({  
             
            where: { name: element },  
        }) 
    });


    let allTemps = await Temperament.findAll() 
    allTemps = allTemps.filter(t => t.name !== "")  
    res.send(allTemps) 
    console.log(allTemps) 
 
}

module.exports = {
    getTempApi
}
