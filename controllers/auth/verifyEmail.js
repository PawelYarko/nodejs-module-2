const {User} = require("../../models/user");

const {RequestErr} = require("../../helpers");

const verifyEmail = async(req, res) => {
    const {verificationToken} = req.params;
    const user = await User.findOne({verificationToken});
    if(!user){
        throw RequestErr(404, "Not found verification Token")
    }

    await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: ""});
    res.json({
        message:"Email success"
    });
};

module.exports = verifyEmail;