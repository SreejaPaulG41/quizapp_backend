const jwt = require('jsonwebtoken');
require('dotenv').config();

const { Users } = require("../models");

const adminCheck = async (req, res, next)=>{
    try {
        const userId = parseInt(req.user);
        const userInformation = await Users.findOne({
            attributes: ["isAdmin"],
            where: {
                id: userId
            }
        })
        if(userInformation?.isAdmin){
            req.isAdmin = await userInformation?.isAdmin;
            next();
        }else{
            res.status(403).send("Only Admin Can Add Questions");
        }
    } catch (error) {
        console.log(error)
        res.status(403).send("Only Admin Can Add Questions");// This Runs
        next(error);
    }
}

module.exports = adminCheck;