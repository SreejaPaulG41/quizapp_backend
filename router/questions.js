const express = require('express');
const router = express.Router();

const models = require('../models');
const auth = require('../middleware/auth');

router.get('/allQuestions', auth, async(req, res)=>{
    try {
        const allQuestions = await models.Questions.findAll();
        res.json(allQuestions);
    } catch (error) {
        console.log(error);
        res.status(403).send("Not Authorized User!");
    }
})

module.exports = router;