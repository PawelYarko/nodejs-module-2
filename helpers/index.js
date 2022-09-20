const RequestErr = require("./RequestErr");
const ctrlWrapper = require("./ctrlWrapper");
const handlerErrors = require("./handlerErrors");
cosnt sendMail = require("./sendEmail");

module.exports = {
    RequestErr,
    ctrlWrapper,
    handlerErrors,
    sendMail, 
}