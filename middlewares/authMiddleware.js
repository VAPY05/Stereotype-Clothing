const {secretKey} = require('../config/env')
const jswt = require('jsonwebtoken')
const {promisify} = require('util')

const jswtVerify = promisify(jswt.verify)

exports.auth = async(req,res,next) => {
    const token = req.cookies["user"]
    if(token){
        const decoded = await jswtVerify(token,secretKey);
        res.user = decoded;
        res.locals.user = decoded
    }
    next();
}


/* exports.isAuth = async(req,res,next) => {
    if(req.cookies["user"]) {
        return res.redirect('/')
    }
    next();
}

exports.isGuest = async(req,res,next) => {
    if(!req.cookies["user"]) {
        return res.redirect('/profile/login')
    }
    next();
} */