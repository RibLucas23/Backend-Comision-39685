import express from 'express'
import { ProductManager } from './models/ProductManager.js'
const app = express() //app es igual a la ejecucion de express
const PORT = 4000

const products = new ProductManager('./src/array.json')

app.use(express.urlencoded({ extended: true })) //Permite realizar consultas en la URL (req.query)


app.get('/', (req, res) => {
    res.send("Servidor iniciado ")
})
app.get('/products', async (req, res) => {
    let { limit } = req.query
    let productos = await products.getProducts()
    if (!limit) {
        res.send(productos)
    }
    else {
        res.send(productos.slice(0, limit))
    }
})
app.get('/products/:pId', async (req, res) => {
    let pId = parseInt(req.params.pId)
    let producto = await products.getProductsById(pId)
    res.send(producto)
})

app.listen(PORT, () => {
    console.log(`Server on port http://localhost:${PORT}`)
})