const { Router } = require('express');
const { Dog, Temperament } = require('../db');
const { getAllDogs } = require('../controllers/dogControllers');

const router = Router();

router.get('/', async (req, res, next) => { 
    try {
        const {name} = req.query; 
        let allDogs = await getAllDogs(); 
        if (name) { 
            let dogsByName = await allDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase())); 
            if (dogsByName.length) res.status(200).send(dogsByName); 
            res.status(404).send('Dog not found'); 
        } else { 
            res.status(200).send(allDogs);
        }
    } catch (error) { 
        next(error); 

    }
});

router.get('/:id', async (req, res, next) => { 
    try {
        const { id } = req.params 
        const allDogs = await getAllDogs() 
        if (id) {   
            const dogId = await allDogs.filter(e => e.id == id)  
            dogId.length > 0 ? 
                res.status(200).json(dogId) : 
                res.status(404).send('Dog not found') 
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
        const findName = allNames.find(dog => dog.name.toLowerCase() === name.toLowerCase() ) 
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