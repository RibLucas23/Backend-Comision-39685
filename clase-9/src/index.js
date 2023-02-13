/* ---------------------- Modulos ----------------------*/
import express from 'express'
import routerProduct from './routes/products.routes.js'
import routerCart from './routes/cart.routes.js'
const app = express() //app es igual a la ejecucion de express
const PORT = 8080

/* ---------------------- Middlewares---------------------- */
app.use(express.urlencoded({ extended: true })) //Permite realizar consultas en la URL (req.query)

/* ---------------------- Routes---------------------- */
// home
app.get('/', (req, res) => {
    res.send("Servidor iniciado ")
})
// Routers
app.use('/api/products', routerProduct)
app.use('/api/cart', routerCart)



/* --- Inicia server ---*/
app.listen(PORT, () => {
    console.log(`Server on port http://localhost:${PORT}`)
})