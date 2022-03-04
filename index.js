//const seed = require('./seed');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const sequelize = require('./util/database');

const Questions = require('./models/questions');
const Genres = require('./models/genres');
const Users = require('./models/users');

const jwtGenerator = require('./util/jwtGenerator');

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
            const userPresent = await Users.findAll({
                where: {
                    email: email
                }
            })
            if (userPresent.length > 0) {
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
                const userId = JSON.stringify(newUser).id;
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
            const user = await Users.findAll({
                where: {
                    email: email
                }
            })
            console.log(user)
            if (user.length === 0) { //No match found
                res.json("Email Is Not Registered!");
            } else {
                //If email is present compare passwords
                const presentPassword = JSON.stringify(user[0].password);
                const matchedPassword = await bcrypt.compare(password, JSON.parse(presentPassword));

                if (matchedPassword) {
                    //Generate JWT Token
                    const userId = JSON.stringify(user).id;
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
