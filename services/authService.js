const User = require('../models/User')
const jswt = require('jsonwebtoken')
const {promisify} = require('util')
const {secretKey} = require('../config/env')
const bcrypt = require('bcrypt')

exports.registerProfile = async(userData) =>{
    let password = userData.password;
    let hashedPassword = await bcrypt.hash(password,10)
    userData.password = hashedPassword
    const profile = new User();
    profile.username = userData.username;
    profile.password = userData.password;
    profile.save();
    const isValid = await bcrypt.compare(userData.repeatPass, profile.password)
    return isValid
}

exports.login = async(userData) => {
    const {username, password} = userData;
    const profile = await User.findOne({username})
    if(!profile){
        return
    }
    const isValid = await bcrypt.compare(password,profile.password)
    if(isValid){
        const jswtSign = promisify(jswt.sign);
        const token = await jswtSign({username: profile.username, _id: profile._id},secretKey,{expiresIn: '2d'})
        return token;
    }
}