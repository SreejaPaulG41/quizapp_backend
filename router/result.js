const express = require('express');
const { all } = require('express/lib/application');
const router = express.Router();
const { Op } = require('sequelize');

const auth = require('../middleware/auth');

const {Users, Genres, Questions, Answers} = require('../models');

//After submit answer store
router.post('/submitAnswers', auth, async(req, res)=>{
    try {
        const userId = parseInt(req.user);
        const {genreId, givenAnswerArr} = req.body;
        try {
            const presentAns = await Answers.findOne({
                where: {
                    genreId,
                    userId
                }
            })
            if(!presentAns){
                const addAnswer = await Answers.create({
                    userId,
                    genreId,
                    givenAnswerDetails: givenAnswerArr,
                })
                res.status(200).json(addAnswer);
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

//send data to show in result page
router.get('/getAnswerDetails', auth, async(req, res)=>{
    try {
        const userId = parseInt(req.user);
        const { genreId } = req.query;
        try {
            //Get all answerdata 
            const answerStored = await Answers.findOne({
                attributes: ["givenAnswerDetails"],
                where: {
                    userId, genreId
                }
            })
            //Sort incase order is not right
            const sortedAnswerDetails = answerStored.givenAnswerDetails.sort((a,b)=>{
                return a.questionId - b.questionId;
              })
            const firstQuestionId = sortedAnswerDetails[0].questionId;
            const lastQuestionId = sortedAnswerDetails[sortedAnswerDetails.length - 1].questionId;
            //Get all the questions in the particular range
            const allQuestionDetails = await Questions.findAll({
                where: {
                    [Op.and]: [{ questionId : {[Op.gte]: firstQuestionId}},{questionId : {[Op.lte]: lastQuestionId}}]
                },
                raw: true
            })
            //Add all the details and send the details as response
            const resultArr = allQuestionDetails.map((item, index)=>({
                questionId: item.questionId,
                questionText: item.questionText,
                questionMark: item.questionMark,
                timeAlloted: item.timeAlloted,
                answerOptions: item.answerOptions,
                genreId: item.genreId,
                givenAnswerText : sortedAnswerDetails[index].givenAnswerText,
                rightNess : sortedAnswerDetails[index].rightNess,
                answerGiven: sortedAnswerDetails[index].answerGiven,
              }))
            //Send the data to be displayed on result page
            res.json(resultArr)
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