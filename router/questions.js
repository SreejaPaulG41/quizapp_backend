const express = require('express');
const router = express.Router();

const {Questions, Answers} = require('../models');
const auth = require('../middleware/auth');

//Genre based questions
router.get('/genreBasedQuestions', auth, async(req, res)=>{
    try {
        const userId = req.user;
        const { genreId } = req.query;
        try{
            const userHasGivenTest = await Answers.findOne({
                where: {
                    genreId,
                    userId
                }
            })
            if(!userHasGivenTest){
                const allQuestions = await Questions.findAll({
                    attributes: ["questionId", "questionText", "questionMark", "timeAlloted", "answerOptions", "genreId"],
                    where: {
                        genreId
                    }
                });
                res.json(allQuestions);
            }else{
                res.status(502).send("One User Can Not Submit Same Genre Question Twice!");
            }
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