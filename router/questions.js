const express = require('express');
const router = express.Router();

const {Questions} = require('../models');
const auth = require('../middleware/auth');

//Genre based questions
router.get('/genreBasedQuestions', auth, async(req, res)=>{
    try {
        const { genreId } = req.body;
        try{
            const allQuestions = await Questions.findAll({
                where: {
                    genreId
                }
            });
            res.json(allQuestions);
        } catch (error) {
            console.log(error)
            res.status(502).send(error);
        }
    } catch (error) {
        console.log(error);
        res.status(403).send("Not Authorized User!");
    }
})

module.exports = router;