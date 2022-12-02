const router = require("express").Router();

router.get("/profile",(req,res)=>{
    res.render("home")
})

router.get("/profile/login",(req,res)=>{
    res.render("login")
})

router.get("/profile/register",(req,res)=>{
    res.render("register")
})

module.exports = router