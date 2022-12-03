const routes = require("express").Router()

const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController')
const productsController = require('./controllers/productsController')

routes.use(homeController)
routes.use(authController)
routes.use(productsController)

module.exports = routes