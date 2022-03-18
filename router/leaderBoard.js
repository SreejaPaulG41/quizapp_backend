const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const { Answers, Genres, Questions, Users, Leaderboard } = require("../models");
const auth = require('../middleware/auth');

//Genre Specific Leaderboard
router.get("/leaderBoard", auth, async (req, res) => {
    try {
        // const { genreId } = req.query;
        // //Get Users Who Gave Quiz For Specific Genre
        // const userInfos = await Leaderboard.findAll({
        //     where: {
        //         genreId
        //     }
        // })
        const leaderBoardData = await Leaderboard.findAll()
        // //Send Data To Frontend
        const dataToSend = await Promise.all(leaderBoardData.map( async(item, index)=>{
            const userName = await Users.findOne({
                attributes: ["firstName", "lastName"],
                where: {
                    id: item.userId
                }
            })
            const date = item.quizGivenTime?.getDate() + " / " + item.quizGivenTime?.getMonth() + " / " + item.quizGivenTime?.getFullYear();
            return {userFullName: userName.firstName + " " + userName.lastName, fullMarks: item.fullMarks, userScore: item.userScore, quizGivenTime: date}
        }))
        res.json(dataToSend)
    } catch (error) {
        console.log(error);
        res.status(403).send("Not Authorized User!");
    }
})

//User Specific Leaderboard
router.get("/leaderBoard-userSpecific", auth, async (req, res) => {
    try {
        const userId = parseInt(req.user);
        //Get User Gave Genre
        const userQuizDetails = await Leaderboard.findAll({
            where: {
                userId
            }
        })
        const dataToSend = await Promise.all(userQuizDetails.map(async(item, index)=>{
            const genreNameRes = await Genres.findOne({
                attributes: ["genreName"],
                where: {
                    genreId: item.genreId
                }
            })
            const date = item.quizGivenTime?.getDate() + " / " + item.quizGivenTime?.getMonth() + " / " + item.quizGivenTime?.getFullYear();
            return { genreName: genreNameRes.genreName, genreId: item.genreId, fullMarks: item.fullMarks, userScore: item.userScore, quizGivenTime: date}
        }))
        res.json(dataToSend)
    } catch (error) {
        console.log(error);
        res.status(403).send("Not Authorized User!");
    }
})
module.exports = router;