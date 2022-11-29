const { Router } = require('express');
const { Dog, Temperament } = require('../db');
const { getAllDogs } = require('../controllers/dogControllers');

const router = Router();

router.get('/', async (req, res, next) => { // ruta para traer todos los perros
    try { // try catch para manejar los errores
        const {name} = req.query; // traigo el nombre del perro de la query
        let allDogs = await getAllDogs(); // traigo todos los perros de la base de datos
        if (name) { // si el nombre del perro existe en la query
            let dogsByName = await allDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase())); // filtro los perros por nombre
            if (dogsByName.length) res.status(200).send(dogsByName); // si el perro existe lo envio
            res.status(404).send('Dog not found'); // si el perro no existe envio un mensaje de error
        } else { // si el nombre del perro no existe en la query
            res.status(200).send(allDogs); // envio todos los perros
        }
    } catch (error) { // si hay un error lo envio
        next(error); 

    }
});

router.get('/:id', async (req, res, next) => { // ruta para traer un perro por id
    try {
        const { id } = req.params // traigo el id del perro de los params
        const allDogs = await getAllDogs() // traigo todos los perros de la base de datos
        if (id) {   // si el id del perro existe en los params
            const dogId = await allDogs.filter(e => e.id == id)  // filtro los perros por id
            dogId.length > 0 ? // si el perro existe
                res.status(200).json(dogId) : // lo envio
                res.status(404).send('Dog not found') // si el perro no existe envio un mensaje de error
        }


    } catch (error) {
        next(error)
    }
}) 

router.post('/', async (req, res, next) => { 

    try { 

        const { name, 
            height_min,
            height_max,
            weight_min,
            weight_max,
            image,
            temperaments,
            life_span,
            createdInDb 
        } = req.body 
        const allNames = await getAllDogs()
        const findName = allNames.find(dog => dog.name.toLowerCase() === name.toLowerCase() ) // busco si el nombre del perro ya existe en la base de datos

        if (findName) {
            return res.status(404).send("The dog's name is already exists")
        }



        const newDog = await Dog.create({ 
            name: name.toLowerCase(), 
            height_min: Number(height_min), 
            height_max: Number(height_max), 
            weight_min: Number(weight_min), 
            weight_max: Number(weight_max), 
            life_span, 
            createdInDb, 
            temperaments, 
            image: image ? image : "https://images.wallpaperscraft.com/image/single/dog_wonderment_emotion_127467_1280x720.jpg" 
        })

        let dbTemperament = await Temperament.findAll({ 
            where: { name: temperaments }, 
        })
        newDog.addTemperament(dbTemperament)
        res.status(201).json({ msg: "Created dog" })
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const dog = await Dog.findByPk(id)
        if (dog) {
            await dog.destroy()
            res.status(200).json({ msg: "Dog deleted" })
        } else {
            res.status(404).json({ msg: "Dog not found" })
        }
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const { name, height_min, height_max, weight_min, weight_max, life_span, temperaments, image } = req.body
        const dog = await Dog.findByPk(id)
        if (dog) {
            await dog.update({ name, height_min, height_max, weight_min, weight_max, life_span, temperaments, image })
            res.status(200).json({ msg: "Dog updated" })
        } else {
            res.status(404).json({ msg: "Dog not found" })
        }
    } catch (error) {
        next(error)
    }
})





module.exports = router;