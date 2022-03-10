const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const { Users } = require('../models');
const jwtGenerator = require('../util/jwtGenerator');

const validEmail = (userEmail) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
}

//Register Route
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            res.status(401).send("Please Fill All The Fields To Proceed");
        } else if (!validEmail(email)) {
            res.status(401).send("Invalid Email Is Provided");
        } else {
            try {
                //If a user is allready present
                console.log("check")
                console.log(Users)
                const userPresent = await Users.findOne({
                    where: {
                        email
                    }
                })
                if (userPresent) {
                    res.status(401).send("This Email Is Allready Registered!");
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
            } catch (error) {
                console.log(error)
                res.status(502).send(error);
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Serevr Error");
    }
})

//Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(401).send("Please Fill All The Fields To Proceed");
        } else if (!validEmail(email)) {
            res.status(401).send("Invalid Email Is Provided");
        } else {
            try {
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
                    res.status(401).send("Email Is Not Registered!");
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
                        res.status(401).send("Password Incorrect!");
                    }
                }
            } catch (error) {
                console.log(error)
                res.status(502).send(error);
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Serevr Error");
    }
})

module.exports = router;