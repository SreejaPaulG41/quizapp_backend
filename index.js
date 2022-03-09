const express = require('express');
const cors = require('cors');

const models = require('./models');

const auth = require('./middleware/auth');

const authenticationRoute = require('./router/authentication');
const dashboard = require('./router/dasboard');
const questions = require('./router/questions');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Listening To Port ${port}`);
})

//Authentication Route
app.use('/auth',authenticationRoute);

//Is the user authenticate
app.get('/valid-check', auth, async(req, res) => {
    try {
        res.json(true)
    } catch (error) {
        console.log(error)
    }
})

//Dashboard Page
app.use('/',dashboard);

//Questions
app.use('/',questions);

// app.get('/check', async(req, res)=>{
//     const rj = await models.Genres.findOne({
//         where :{
          
//         },
//         include: [{
//             model: models.Questions,
//             where: {
//                 genreId: 'JS02'  ,
//                 questionText: "a"
//             }
//         }]
//     })
//     // console.log(JSON.stringify(rj.genreId))
//     // const val = JSON.stringify(rj.genreId);
//     const ques = await models.Questions.findAll({
//         include: [{
//             model: models.Genres,
//             where: {
//                 genreName : "React JS"  
//             }
//         }]
//     })
//     console.log(ques)
// })
