const {Schema, model} = require("mongoose");
const Joi = require("joi");

const { handlerErrors } = require("../helpers");

const emailRegexp = /^[\w.]+@[\w]+.[\w]$/ ;   

const userSchema = new Schema({
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      minlength:6,
      required: [true, 'Password is required'],
    },
    
    // subscription: {
    //   type: String,
    //   enum: ["starter", "pro", "business"],
    //   default: "starter"
    // },
    // token: {
    //   type: String,
    //   default: null,
    // },
  }, {versionKey:false, timestamps:true});

userSchema.post("save", handlerErrors);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  repeat_password: Joi.ref("password"),
});


const schemas = {
  registerSchema
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas
};