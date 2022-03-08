const express = require('express');
const router = express.Router();

const models = require('../models');
const auth = require('../middleware/auth');

//Dashboard Page
router.get('/dashboard', auth, async(req, res) => {
    try {
        const userId = parseInt(req.user);
        const userDetails = await models.Users.findOne({
            where: {
                id: userId
            }
        })
        res.json(userDetails.firstName); //Can return other values also
    } catch (error) {
        console.log(error)
    }
})


module.exports =router;