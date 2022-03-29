const express = require('express');
const router = express.Router();

const {Genres, Questions} = require('../models');
const auth = require('../middleware/auth');
const adminCheck = require('../middleware/adminCheck');


//Get All Questions
router.get('/allQuestions', auth, adminCheck, async (req, res)=>{
    try {
        const questions  = await Questions.findAll({
            attributes: ["questionId", "questionText", "questionMark", "timeAlloted", "answerOptions"],
            order: [["questionId", "ASC"]],
            include: [{
                model: Genres,
                attributes: ["genreName"],
                required: true
            }]
        })
        const dataToSend = questions.map((item, index)=>{
            return {
                questionId: item.questionId,
                questionText: item.questionText,
                questionMark: item.questionMark,
                timeAlloted: item.timeAlloted,
                answerOptions: item.answerOptions,
                genreName: item.Genre.genreName
            }
        })
        res.json(dataToSend)
    } catch (error) {
        console.log(error);
        res.status(403).send("Not Authorized User!");
    }
})

//Delete Question
router.delete("/delete-question", auth, adminCheck, async(req, res)=>{
    try {
        const { questionId } = req.body;
        console.log(questionId)
        const question = await Questions.destroy({
            where:{
                questionId
            }
        })
        res.json({response: "Question Deleted Successfully!"})
    } catch (error) {
        console.log(error);
        res.status(403).send("Not Authorized User!");
    }
})

//To Update Get The Question
router.get("/get-a-question", auth, adminCheck, async(req, res)=>{
    try {
        const { questionId } = req.query;
        const selectedQuestion = await Questions.findOne({
            attributes: ["questionId", "questionText", "questionMark", "timeAlloted", "answerOptions"],
            where: {
                questionId
            },
            include: [{
                model: Genres,
                attributes: ["genreName"],
                required: true
            }]
        })
        if(selectedQuestion){
            const dataToSend = {
                questionId: selectedQuestion.questionId,
                questionText: selectedQuestion.questionText,
                questionMark: selectedQuestion.questionMark,
                timeAlloted: selectedQuestion.timeAlloted,
                answerOptions: selectedQuestion.answerOptions,
                genreName: selectedQuestion.Genre.genreName
            }
            res.json(dataToSend)
        }else{
            res.status(502).send("Can Not Find The Question");
        }
    } catch (error) {
        console.log(error);
        res.status(403).send("Not Authorized User!");
    }
})

//Update A Question
router.put("/update-question", auth, adminCheck, async(req, res)=>{
    try {
        const { questionId, genreName, questionText, questionMark, timeAlloted, answerOptions } = req.body;
        const updatedQuestion = await Questions.update({genreName, questionText, questionMark, timeAlloted, answerOptions},{
            where: {
                questionId 
            }
        });
        if(updatedQuestion){
            res.json("Question Updated Successfully!");
        }else{
            res.status(502).json("Could nOt Update The Question!");
        }
    } catch (error) {
        console.log(error);
        res.status(403).send("Not Authorized User!");
    }
})
module.exports = router;