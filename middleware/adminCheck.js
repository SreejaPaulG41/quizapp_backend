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
        req.isAdmin = await userInformation?.isAdmin;
        next();
    } catch (error) {
        console.log(error)
        res.status(502).send(error);
        next(error);
    }
}

module.exports = adminCheck;