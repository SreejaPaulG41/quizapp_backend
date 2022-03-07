const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res, next)=>{
    try {
        const jwtToken = req.header("jwtToken");
        if(jwtToken){
            const payload = jwt.verify(jwtToken, process.env.jwtSecret);
            //return payload then
            console.log(payload) //{ user: '2', iat: 1646653321, exp: 1646826121 }
            req.user = await payload.user;
            next();
        }else{
            res.json("Not Valid User");
            next();
        }
    } catch (error) {
        console.log(error)
        res.json("Not Valid!");
        next(error);
    }
}
module.exports = auth;