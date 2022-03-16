const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const { Answers, Genres, Questions, Users } = require("../models");
const auth = require('../middleware/auth');

//Genre Specific Leaderboard
router.get("/leaderBoard-genreSpecific", auth, async (req, res) => {
    try {
        const { genreId } = req.body;
        //Get All The Answer Result
        const answers = await Answers.findAll({
            where: {
                genreId
            }
        })
        //Get The User Given The Quiz
        const userPresent = answers?.map((item, index) => {
            return item.userId
        })
        //Get Genre Specific Question Id and Marks
        const questionMarks = await Questions.findAll({
            attributes: ["questionId", "questionMark"],
            where: {
                genreId
            },
            raw: true
        })
        //Total Quiz Marks
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
            marksOfUser.push({ userId, totalMarksGot })
        }
        //Send Data To Frontend
        const userDetailsToSend = await Promise.all(marksOfUser.map(async (item, index) => {
            const userInfo = await Users.findOne({
                attributes: ["firstName", "lastName"],
                where: {
                    id: item.userId
                }
            })
            const userName = userInfo.firstName + " " + userInfo.lastName;
            return {
                ...item,
                genreId,
                userName,
                totalMarksOfQuiz
            }
        }))

        res.json(userDetailsToSend)
    } catch (error) {
        console.log(error);
        res.status(403).send("Not Authorized User!");
    }
})

//User Specific Leaderboard
router.get("/leaderBoard-userSpecific", auth, async (req, res) => {
    try {
        const userId = parseInt(req.user);
        //Get User Specific Answeres
        const answersInfoOfUser = await Answers.findAll({
            attributes: ["userId", "genreId", "givenAnswerDetails", "createdAt"],
            where: {
                userId
            }
        })
        //Genre Specific Question Details
        const questionMarksDetails = await Promise.all(answersInfoOfUser.map(async (item, index) => {
            const questions = await Questions.findAll({
                attributes: ["questionId", "questionMark"],
                where: {
                    genreId: item.genreId
                },
                raw: true
            })
            const totalQuestionMarks = questions.reduce((acc, item) => {
                acc = acc + item.questionMark;
                return acc;
            }, 0)

            return { questions: questions, totalQuestionMarks, genreId: item.genreId };
        }))

        //Calculate Marks 
        const marksForEachGenre = [];
        for (let i = 0; i < answersInfoOfUser.length; i++) {
            const genre = answersInfoOfUser[i].genreId;
            const answers = answersInfoOfUser[i].givenAnswerDetails;
            const createdAt = answersInfoOfUser[i].createdAt;
            const marks = answers.map((item, index) => {
                let marksToStore = 0;
                if (item.answerGiven) {
                    const questionDetailsArr = questionMarksDetails.filter((item, index) => {
                        return item.genreId == genre;
                    })
                    const fullMarks = questionDetailsArr[0].questions.find((data, index) => {
                        return data.questionId == item.questionId;
                    })
                    if (item.rightNess) {
                        marksToStore = marksToStore + fullMarks.questionMark;
                    } else {
                        marksToStore = marksToStore - (fullMarks.questionMark * 0.50);
                    }
                }
                return marksToStore;
            })
            const getTotalMarks = questionMarksDetails.find((item, index) => {
                return item.genreId == genre;
            })
            marksForEachGenre.push({ marks, genre, totalMarks: getTotalMarks.totalQuestionMarks, createdAt })
        }
        //Add Total Marks Got
        const addedTotalGotMarks = marksForEachGenre.map((item, index) => {
            const totalMarksGot = item.marks.reduce((acc, item) => {
                acc = acc + item;
                return acc;
            })
            return { genre: item.genre, totalMarks: item.totalMarks, createdAt: item.createdAt, totalMarksGot }
        })
        //Send Data To Frontend, After Adding All
        const dataToSend = await Promise.all(addedTotalGotMarks.map(async (item, index) => {
            const genreName = await Genres.findOne({
                attributes: ["genreName"],
                where: {
                    genreId: item.genre
                }
            })
            return { totalMarks: item.totalMarks, totalMarksGot: item.totalMarksGot, createdAt: item.createdAt, genreName: genreName.genreName, userId }
        }))

        res.json(dataToSend)
    } catch (error) {
        console.log(error);
        res.status(403).send("Not Authorized User!");
    }
})
module.exports = router;