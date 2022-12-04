const { login } = require("../services/authService");

const {auth, isGuest, isAuth} = require("../middlewares/authMiddleware")

const router = require("express").Router();

router.get("/profile",isGuest,(req,res)=>{
    console.log(res.locals)
    res.render("profile",{username: res.locals.user.username})
})

router.get("/profile/login",isAuth,(req,res)=>{
    res.render("login")
})

router.post("/profile/login",isAuth,async(req,res)=>{
    const {username, password} = req.body
    const obj = {username, password};
    const token = await login(obj)
    if(token){
        res.cookie("user",token)
        res.redirect("/")
    }else{
        res.redirect("404")
    }
})

router.get("/profile/register",isAuth,(req,res)=>{
    res.render("register")
})

router.get("/profile/logout",isGuest,(req,res)=>{
    res.clearCookie("user");
    res.redirect("/")
})

router.post("/profile/register",isAuth,(req,res)=>{
    const {username, password, repeatPassword} = req.body
    res.send(`Username: ${username}, Password: ${password}, Repeated Password: ${repeatPassword}`)
})

module.exports = router