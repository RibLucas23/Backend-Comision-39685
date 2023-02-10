import { Router } from "express";
import { ProductManager } from "../controllers/ProductManager.js";
const routerProduct = Router()
const products = new ProductManager('./src/models/productsArray.json')

routerProduct.get('/', async (req, res) => {
    let { limit } = req.query
    let productos = await products.getProducts()
    if (!limit) {
        res.send(productos)
    }
    else {
        res.send(productos.slice(0, limit))
    }
})
routerProduct.get('/:pId', async (req, res) => {
    let pId = parseInt(req.params.pId)
    let producto = await products.getProductsById(pId)
    res.send(producto)
})
routerProduct.post('/', async (req, res) => {
    let newProduct = await products.addProduct(req.body)
    res.send(newProduct)
})

routerProduct.delete('/:id', async (req, res) => {
    let deletedProduct = await products.remove(req.params.id)
    res.send(deletedProduct)
})

routerProduct.put('/:id', async (req, res) => {
    let newProduct = await products.updateProduct(req.params.id, req.body)
    res.send(newProduct)
})

export default routerProduct