const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const { Answers, Genres, Questions, Users } = require("../models");
const auth = require('../middleware/auth');

router.get("/leaderBoard-genreSpecific", auth, async (req, res) => {
    try {
        const userId = parseInt(req.user);
        const { genreId } = req.body;
        //Get All The Answer Result
        const answers = await Answers.findAll({
            where: {
                genreId
            }
        })
        //Get The User Name
        const userPresent = answers?.map((item, index) => {
            return item.userId
        })
        const userInfo = await Users.findAll({
            attributes: ["firstName", "lastName"],
            where: {
                id: {
                    [Op.or]: userPresent
                }
            }
        })
        //Get Genre Specific Question
        const questions = await Questions.findAll({
            where: {
                genreId
            }
        })
        const questionMarks = questions.map((item, index) => {
            return {
                questionId: item.questionId,
                questionMark: item.questionMark
            }
        })
        const totalMarksOfQuiz = questionMarks.reduce((acc, item) => {
            acc = acc + item.questionMark;
            return acc;
        }, 0)
        //Get User Specific Answer And Marks
        const answer = await Answers.findAll({
            attributes: ["userId", "givenAnswerDetails"],
            where: {
                userId: {
                    [Op.or]: userPresent
                },
                genreId
            }
        })

        //Calculate Marks

        let marksOfUser = [];
        for (let i = 0; i < answer.length; i++) {
            let userId = answer[i].userId;
            let givenAnswerDetails = answer[i].givenAnswerDetails;
            const marksArr = givenAnswerDetails.map((item, index) => {
                let marksToAdd = 0;
                if (item.answerGiven) {
                    const questionMarkDetail = questionMarks.find((data, index) => {
                        return data.questionId = item.questionId
                    })
                    if (item.rightNess) {
                        marksToAdd = marksToAdd + questionMarkDetail.questionMark;
                    } else {
                        marksToAdd = marksToAdd - (questionMarkDetail.questionMark * 0.50);
                    }
                }
                return marksToAdd;
            })
            const totalMarksGot = marksArr.reduce((acc, item) => {
                acc = acc + item;
                return acc;
            }, 0);
            marksOfUser.push({ genreId, userId, totalMarksGot, totalMarksOfQuiz })
        }
        res.json(marksOfUser)
    } catch (error) {
        console.log(error);
        res.status(403).send("Not Authorized User!");
    }
})

module.exports = router;