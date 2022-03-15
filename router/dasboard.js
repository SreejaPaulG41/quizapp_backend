const express = require('express');
const router = express.Router();

const {Users, Genres} = require('../models');
const auth = require('../middleware/auth');

//Dashboard Page
router.get('/dashboard', auth, async(req, res) => {
    try {
        const userId = parseInt(req.user);
        const userDetails = await Users.findOne({
            where: {
                id: userId
            }
        })
        res.json(userDetails.firstName); //Can return other values also
    } catch (error) {
        console.log(error);
        res.status(403).send("Not Authorized User!");
    }
})

//Get genre details in dashboard page
router.get('/genreDetails', auth, async(req, res) => {
    try {
        try {
            const genreDetails = await Genres.findAll({
                attributes: ["genreId", "genreName"]
            });
            res.json(genreDetails);   
        } catch (error) {
            console.log(error)
            res.status(502).send(error);
        }
    } catch (error) {
        console.log(error);
        res.status(403).send("Not Authorized User!");
    }
})


module.exports =router;