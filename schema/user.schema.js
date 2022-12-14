const Joi = require('joi');

const id = Joi.string().uuid();
const avatar =Joi.string().uri();
const birthday = Joi.string().isoDate();
const email = Joi.string().email();
const firstName = Joi.string();
const lastName = Joi.string();
const sex = Joi.string();


const createUserSchema = Joi.object({
    avatar: avatar,
    birthday: birthday.required(),
    email : email.required(),
    firstName : firstName.required(),
    lastName : lastName.required(),
    sex : sex
});

const updateUsertSchema = Joi.object({
    avatar: avatar,
    birthday: birthday,
    email : email,
    firstName : firstName,
    lastName : lastName,
    sex : sex
});

const getUserSchema = Joi.object({
    id : id.required()
});

module.exports = {createUserSchema, updateUsertSchema, getUserSchema};