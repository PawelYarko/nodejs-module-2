const bcrypt = require('bcryptjs');

const {User} = require('../../models/user');

const { RequestErr } = require("../../helpers");

const register = async(req, res) =>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        throw RequestErr(409, "Email already exist") 
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const result = await User.create({email, password: hashPassword});
    res.status(201).json({
        email: result.email,
    })
}   
module.exports = register;