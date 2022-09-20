const {User} = require("../../models/user");

const {RequestErr} = require("../../helpers");

const resendVerifyEmail = async(req, res) =>{
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw RequestErr(404, "Not found");
    };
    if(user.verify){
        throw(400, "User already verify");
    };
    const mail = {
        to: email,
        subject: "Accept registration on website",
        html: `<a href="http://localhost:3000/auth/verify${user.verificationToken}" target="_blank">Accept registration</a>`
    }
    await sendMail(mail);
    res.json({
        message: "Email verify resend",
    });
}