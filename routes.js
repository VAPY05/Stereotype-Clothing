const routes = require("express").Router()

const homeController = require('./controllers/homeController')
const productsController = require('./controllers/productsController')

routes.use(homeController)
routes.use(productsController)
routes.get("*",(req,res)=>{res.render("404")})

module.exports = routes