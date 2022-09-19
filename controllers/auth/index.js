const register = require("./register");
const login = require("./login");
const updateAvatar = require("./updateAvatar");
const logout = require("./logout");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
    register,
    login,
    updateAvatar, 
    logout,
    verifyEmail,
    resendVerifyEmail
};