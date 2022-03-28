const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const auth = require('../middleware/auth');
const adminCheck = require('../middleware/adminCheck');

const { Users, Genres, Questions } = require('../models');

const getGenreIdFromName = async (name) => {
    const nameWithOutSpace = name.split(" ");
    //Get Genre Ids
    const latestGenreId = await Genres.findAll({
        attributes: ["genreId"],
    })
    //Calculate The Last No Part
    const numberPresent = parseInt(latestGenreId[latestGenreId.length - 1]?.genreId?.slice(-2));
    let noToAdd = numberPresent + 1;
    if (noToAdd.toString().length === 1) {
        noToAdd = "0" + noToAdd;
    }
    //Calculate The Front Part
    if (nameWithOutSpace.length > 1) {
        const initialLetter = nameWithOutSpace.map((item, index) => item.charAt(0).toUpperCase());
        let newGenreId = '';
        initialLetter.forEach((item, index) => newGenreId = newGenreId + item);
        newGenreId = newGenreId + noToAdd;
        return newGenreId;
    } else {
        const initialLetter = nameWithOutSpace[0].substring(0, 2).toUpperCase();
        let newGenreId = initialLetter + noToAdd;
        return newGenreId;
    }
}

//Add A New Question
router.post('/add-new-question', auth, adminCheck, async (req, res) => {
    try {
        const { genreName, questionText, questionMark, timeAlloted, answerOptions } = req.body;
        let genreIdOfQuestion = '';
        //Post The GenreId, GenreName To Genre Details If Genre Is Not Present
        const getGenre = await Genres.findOne({
            where: { genreName }
        })
        //If Genre Not Present Add That In Genre Table
        if (!getGenre) {
            const genreId = await getGenreIdFromName(genreName);
            const newGenre = await Genres.create({
                genreId, genreName
            })
            genreIdOfQuestion = newGenre?.genreId;
        } else {
            genreIdOfQuestion = getGenre?.genreId;
        }
        //Check Question Is Previously Present Or Not
        const presentQuestion = await Questions.findOne({
            where: {
                genreId: genreIdOfQuestion,
                questionText: questionText,
                // answerOptions: answerOptions,
                answerOptions: {
                    [Op.contains]: answerOptions
                }
            }
        })
        console.log("presentQuestion")
        console.log(presentQuestion)
        if (!presentQuestion) {
            //Add The Question To The Question Table
            const questions = await Questions.findAll({
                attributes: ["questionId"],
                order: [["questionId", "DESC"]]
            })
            const lastQuestionId = questions[0].questionId;
            const newQuestion = await Questions.create({
                questionId: (lastQuestionId + 1),
                genreId: genreIdOfQuestion,
                questionText,
                questionMark,
                timeAlloted,
                answerOptions: answerOptions,
            })
            res.json({response: "New Question Added Successfully!"})
        }else{
            res.status(502).send("This Question Is Allready Present In This Genre!")
        }

    } catch (error) {
        console.log(error);
        res.status(403).send("Not Authorized User!");
    }
})
module.exports = router;