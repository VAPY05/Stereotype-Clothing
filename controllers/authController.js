const router = require("express").Router();
const path = require("path")

router.get("/profile",(req,res)=>{
    res.render("profile")
})

router.get("/profile/login",(req,res)=>{
    res.render("login")
})

router.post("/profile/login",(req,res)=>{
    const {username, password} = req.body
    res.send(`Username: ${username}, Password: ${password}`)
})

router.get("/profile/register",(req,res)=>{
    res.render("register")
})

router.post("/profile/register",(req,res)=>{
    const {username, password, repeatPassword} = req.body
    res.send(`Username: ${username}, Password: ${password}, Repeated Password: ${repeatPassword}`)
})

module.exports = router