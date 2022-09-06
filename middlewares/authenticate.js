const jwt = require('jsonwebtoken');

const {User} = require('../models/user');

const { RequestErr } = require("../helpers");

const {SECRET_KEY} = process.env;

const authenticate = async(req, res, next) =>{
    const {authorization} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if(bearer !== "Bearer"){
        next(RequestErr(401, "Unauthorized"));
    }
    try {
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if(!user || !user.token){
            next(RequestErr(401, "Unauthorized")); 
        }
        req.user = user;
        next()
    } catch (error) {
        next(RequestErr(401, error.message))
    }
}

module.exports = authenticate;