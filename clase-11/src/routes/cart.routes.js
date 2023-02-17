import { Router } from "express";
import { CartManager } from "../controllers/CartManager.js";
const routerCart = Router()
const cartManager = new CartManager('./src/models/cartArray.json')


routerCart.get('/', async (req, res) => {
    let productos = await cartManager.getCart()
    res.status(200).send(productos)
})
routerCart.get('/:cId', async (req, res) => {
    let cId = parseInt(req.params.cId)
    let cart = await cartManager.getCartById(cId)
    res.status(200).send(cart)
})
routerCart.post('/', async (req, res) => {
    let newCart = await cartManager.createCart()
    res.status(200).send(newCart)
})
routerCart.post('/:cId', async (req, res) => {
    let newCart = await cartManager.addProduct(req.params.cId, req.body)
    res.status(200).send(newCart)
})

routerCart.post('/:cId/product/:id', async (req, res) => {
    let newCart = await cartManager.addProduct2(req.params.cId, req.params.id)
    res.status(200).send(newCart)
})




// routerCart.delete('/:id', async (req, res) => {
//     let deletedProduct = await cartManager.remove(req.params.id)
//     res.send(deletedProduct)
// })

// routerCart.put('/:id', async (req, res) => {
//     let newProduct = await cartManager.updateProduct(req.params.id, req.body)
//     res.send(newProduct)
// })

export default routerCart