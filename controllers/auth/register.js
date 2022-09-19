const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const nanoid = require('nanoid');

const {User} = require('../../models/user');

const { RequestErr, sendEmail } = require("../../helpers");

const register = async(req, res) =>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        throw RequestErr(409, "Email already exist") 
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    const result = await User.create({email, password: hashPassword, avatarURL, verificationToken});
    const mail = {
        to: email,
        subject: "Accept registration on website",
        html: `<a href="http://localhost:3000/auth/verify${verificationToken}" target="_blank">Accept registration</a>`
    }
    await sendEmail(email);
    res.status(201).json({
        email: result.email,
    })
}   
module.exports = register;