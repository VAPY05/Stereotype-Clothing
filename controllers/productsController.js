const router = require("express").Router();

const Clothing = require("../models/Cloth");
const {create, find, findById} = require("../services/postService")

router.get("/products",async(req,res)=>{
    const data = await Clothing.find()
    console.log(data)
    res.render("catalog", {data})
})

router.get("/products/:id/details",async(req,res)=>{
    const id = req.params.id;
    const item =  await findById(id);
    console.log(item)
    res.render("details", {item})
})

router.get("/products/create",(req,res)=>{
    res.render("create")
})

router.post("/products/create",async(req,res)=>{
    const obj = req.body;
    res.send(obj)
    try{
        const data = await create(obj.name, obj.description, obj.img, obj.select, res.locals.user._id)
    }catch{
        res.redirect("/403")
    }
    res.redirect("/products")
})

module.exports = router