/* ---------------------- Modulos ----------------------*/
import express from 'express'
//__dirname
import { __dirname } from "./path.js";
import * as path from 'path'
//router
import routerProduct from './routes/products.routes.js'
import routerCart from './routes/cart.routes.js'
//handlebars
import { engine } from 'express-handlebars';
//socket.io
import { Server } from "socket.io";
//server express
const app = express() //app es igual a la ejecucion de express
const PORT = 8080

/* --- Inicia server ---*/
const server = app.listen(PORT, () => {
    console.log(`Server on port http://localhost:${PORT}`)
})

/* ---------------------- Middlewares---------------------- */
app.use(express.json())
app.use(express.urlencoded({ extended: true })) //Permite realizar consultas en la URL (req.query)
//handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views')); //__dirname + './views'


/* ---------------------- ServerIO---------------------- */
const io = new Server(server)
import { ProductManager } from './controllers/ProductManager.js';
const ioProducts = new ProductManager("./src/models/ioProdutcts.json")
io.on("connection", async (socket) => { //io.on es cuando se establece la conexion
    console.log(`Nuevo cliente conectado! ${socket.id}`)

    //Show products
    const DB_PRODUCTOS = await ioProducts.getProducts()
    io.sockets.emit('from-server-productos', DB_PRODUCTOS)

    //add products
    socket.on("from-client-producto", async producto => {
        await ioProducts.addProduct(producto)
        io.sockets.emit('from-server-productos', await DB_PRODUCTOS)
    })

    //delete product
    socket.on("from-client-deleteProduct", async id => {
        await ioProducts.remove(id)
        io.sockets.emit('from-server-productos', await DB_PRODUCTOS)
    })

})
/* ---------------------- Routes---------------------- */
app.use('/', express.static(__dirname + '/public'))
// Routers
app.use('/api/products', routerProduct)
app.use('/api/cart', routerCart)

//HBS
app.get('/', async (req, res) => {
    const DB_products = await ioProducts.getProducts()
    res.render("home", { DB_products })
})
app.get('/realTimeProducts', (req, res) => {
    res.render("realTimeProducts")
})