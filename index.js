const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const models = require('./models');

const auth = require('./middleware/auth');

const authenticationRoute = require('./router/authentication');
const dashboard = require('./router/dasboard');
const questions = require('./router/questions');
const answers = require('./router/result');
const leaderBoard = require('./router/leaderBoard');
const newQuestionAdd = require('./router/newQuestion');
const adminOperations = require('./router/adminOperations');

require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use(morgan('tiny'));

app.listen(process.env.PORT || port, () => {
    console.log(`Listening To Port ${port}`);
})

//Authentication Route
app.use('/auth',authenticationRoute);

//Is the user authenticate
app.get('/valid-check', auth, async(req, res) => {
    try {
        res.json({valid: true})
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})

//Dashboard Page
app.use('/',dashboard);

//Questions
app.use('/',questions);

//store the given answers
app.use('/',answers);

//LeaderBoard Page
app.use('/', leaderBoard);

//New Question Add - Admin Operation
app.use('/', newQuestionAdd);

//Update, Delete A Question - Admin Operation
app.use('/', adminOperations);