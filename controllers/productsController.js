const router = require("express").Router();

router.get("/products",(req,res)=>{
    res.render("catalog")
})

 router.get("/products/:id/details",(req,res)=>{
    res.render("details")
 })

module.exports = router