const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next)=>{
    try {
        const jwtToken = req.header("jwtToken");
        if(jwtToken){
            const payload = jwt.verify(jwtToken, process.env.jwtSecret);
            //return payload then
        }else{
            res.json("Not Valid User")
        }
    } catch (error) {
        console.log(error)
        res.json("Not Valid!")
    }
}