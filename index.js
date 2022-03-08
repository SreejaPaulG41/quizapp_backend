const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
//const Sequelize = require('./util/database');

const Questions = require('./models/questions');
const Genres = require('./models/genres');
const Users = require('./models/users');

const jwtGenerator = require('./util/jwtGenerator');
const auth = require('./middleware/auth');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


app.listen(port, () => {
    console.log(`Listening To Port ${port}`);
})

const validEmail = (userEmail) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
}

//Register Route
app.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            res.json("Please Fill All The Fields To Proceed");
        } else if (!validEmail(email)) {
            res.json("Invalid Email Is Provided");
        } else {

            //If a user is allready present
            console.log("check")
            console.log(Users)
            const userPresent = await Users.findOne({
                where: {
                    email
                }
            })
            if (userPresent) {
                res.json("This Email Is Allready Registered!");
            } else {
                const saltRounds = 10;
                //Generate a salt
                const salt = await bcrypt.genSalt(saltRounds);
                //Hash Password
                const bcryptPassword = await bcrypt.hash(password, salt);
                //Add This Password along with other credentials
                const newUser = await Users.create({
                    firstName: firstName, lastName: lastName, email: email, password: bcryptPassword
                })
                console.log("newUser")
                console.log(newUser);
                console.log("Stringy");
                console.log(JSON.stringify(newUser.id))
                //Jwt Token Generate
                const userId = JSON.stringify(newUser.id);
                console.log(userId);
                const jwtToken = jwtGenerator(userId);
                res.json({ jwtToken });
            }
        }
    } catch (error) {
        console.log(error);
    }
})

//Login Route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.json("Please Fill All The Fields To Proceed");
        } else if (!validEmail(email)) {
            res.json("Invalid Email Is Provided");
        } else {
            //If email is not present in db
            console.log(Users)
            const user = await Users.findOne({
                where: {
                    email
                }
            })
            console.log("User")
            console.log(user)
            if (!user) { //No match found
                res.json("Email Is Not Registered!");
            } else {
                //If email is present compare passwords
                const presentPassword = JSON.stringify(user.password);
                const matchedPassword = await bcrypt.compare(password, JSON.parse(presentPassword));

                if (matchedPassword) {
                    //Generate JWT Token
                    const userId = JSON.stringify(user.id);
                    const jwtToken = jwtGenerator(userId);
                    res.json({ jwtToken });
                } else {
                    res.json("Password Incorrect!");
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
})

//Is the user authenticate
app.get('/valid-check', auth, async(req, res) => {
    try {
        res.json(true)
    } catch (error) {
        console.log(error)
    }
})

//Dashboard Page
app.get('/dashboard', auth, async(req, res) => {
    try {
        const userId = parseInt(req.user);
        const userDetails = await Users.findOne({
            where: {
                id: userId
            }
        })
        res.json(userDetails.firstName); //Can return other values also
    } catch (error) {
        console.log(error)
    }
})
