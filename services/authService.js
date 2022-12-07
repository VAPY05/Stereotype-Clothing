const User = require('../models/User')
const jswt = require('jsonwebtoken')
const {promisify} = require('util')
const {secretKey} = require('../config/env')
const bcrypt = require('bcrypt')

exports.registerProfile = async(userData) =>{
    let hashedPassword = await bcrypt.hash(userData.password,10)
    userData.password = hashedPassword
    let username = userData.username
    const isProfileExisting = await User.findOne({username})
    if(isProfileExisting){
        return false
    }
    const profile = new User();
    profile.username = userData.username;
    profile.password = userData.password;
    profile.save();
    const isValid = await bcrypt.compare(userData.repeatPassword, profile.password)
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