const express = require('express');
const { all } = require('express/lib/application');
const router = express.Router();
const { Op } = require('sequelize');

const auth = require('../middleware/auth');

const { Users, Genres, Questions, Answers, Leaderboard } = require('../models');

//After submit answer store
router.post('/submitAnswers', auth, async (req, res) => {
    try {
        const userId = parseInt(req.user);
        const { genreId, givenAnswerArr } = req.body;
        try {
            const presentAns = await Answers.findOne({
                where: {
                    genreId,
                    userId
                }
            })
            if (!presentAns) {
                //Add Data In Answer Table
                const addAnswer = await Answers.create({
                    userId,
                    genreId,
                    givenAnswerDetails: givenAnswerArr,
                })
                //Store The same Data With Marks In Leaderboard Table
                //Get Question WRT Genre
                const questions = await Questions.findAll({
                    attributes: ["questionId", "questionMark"],
                    where: {
                        genreId
                    },
                    order: [["questionId", "ASC"],],
                    raw: true
                })
                //Get Total Quiz Marks
                const fullMarksOfQuiz = questions.reduce((acc, item) => {
                    acc = acc + item.questionMark;
                    return acc;
                }, 0)
                //Sort Ans
                const answerArray = addAnswer.givenAnswerDetails.sort((a, b) => {
                    return a.questionId - b.questionId;
                })
                //Calculate User Marks In A Genre
                const individualMarksArr = answerArray.map((item, index) => {
                    let marksToAdd = 0;
                    if (item.answerGiven) {
                        const questionMarkDetail = questions.find((data, index) => {
                            return data.questionId == item.questionId
                        })
                        if (item.rightNess) {
                            marksToAdd = marksToAdd + questionMarkDetail.questionMark;
                        } else {
                            marksToAdd = marksToAdd - (questionMarkDetail.questionMark * 0.50);
                        }
                    }
                    return marksToAdd;
                })
                //Total Marks Got
                const totalMarksGot = individualMarksArr.reduce((acc, item) => {
                    acc = acc + item;
                    return acc;
                }, 0)
                const quizGivenTime = await Answers.findOne({
                    attributes: ["createdAt"],
                    where: {
                        userId, genreId
                    }
                })
                //Store In LeaderBoard
                const dataStoreedInLeaderBoard = await Leaderboard.create({
                    userId, genreId,
                    fullMarks: fullMarksOfQuiz, 
                    userScore: totalMarksGot, 
                    quizGivenTime: quizGivenTime.createdAt
                })
                res.status(200).json(addAnswer);
            } else {
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
router.get('/getAnswerDetails', auth, async (req, res) => {
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
            const sortedAnswerDetails = answerStored.givenAnswerDetails.sort((a, b) => {
                return a.questionId - b.questionId;
            })
            const firstQuestionId = sortedAnswerDetails[0].questionId;
            const lastQuestionId = sortedAnswerDetails[sortedAnswerDetails.length - 1].questionId;
            //Get all the questions in the particular range
            const allQuestionDetails = await Questions.findAll({
                where: {
                    [Op.and]: [{ questionId: { [Op.gte]: firstQuestionId } }, { questionId: { [Op.lte]: lastQuestionId } }]
                },
                raw: true
            })
            //Add all the details and send the details as response
            const resultArr = allQuestionDetails.map((item, index) => ({
                questionId: item.questionId,
                questionText: item.questionText,
                questionMark: item.questionMark,
                timeAlloted: item.timeAlloted,
                answerOptions: item.answerOptions,
                genreId: item.genreId,
                givenAnswerText: sortedAnswerDetails[index].givenAnswerText,
                rightNess: sortedAnswerDetails[index].rightNess,
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