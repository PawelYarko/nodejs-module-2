const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const {User} = require('../../models/user');

const { RequestErr } = require("../../helpers");

const {SECRET_KEY} = process.env;

const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw RequestErr(401, 'Email not found');
    }
    const comparesPassword = await bcrypt.compare(password, user.password);
    if(!comparesPassword){
        throw RequestErr(401, 'Password wrong');
    }
    if(!user.verify){
        throw RequestErr(400, "Email not verify");
    }
    const payload = {
        id: user._id
    }

    const token = jwt.sign(payload, SECRET_KEY,  {expiresIn: "1h"})
    await User.findByIdAndUpdate(user._id, {token});
    res.json({
        token,
    })
}   
module.exports = login;
