import {User} from '../../models/user';

const { RequestErr } = require("../../helpers");

const register = async(res, req) =>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        throw RequestErr(409, "Email already exist") 
    }
    const result = await User.create({email, password});
    res.status(201).json({
        email: result.email,
    })
}   
module.exports = register;