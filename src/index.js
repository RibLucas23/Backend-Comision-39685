/* ---------------------- Modulos ----------------------*/
//dotenv
import "dotenv/config"
//__dirname
import { __dirname } from "./path.js";
import * as path from 'path'
//handlebars
import { engine } from 'express-handlebars';
//server Express
import express from "express";
const app = express()

app.set("port", process.env.PORT || 5000)
//socket.io
import { Server } from "socket.io";
import { getManagerMessages } from "./dao/daoManager.js";

/* --- Inicia server ---*/
const server = app.listen(app.get("port"), () => console.log(`Server on port ${app.get("port")}`))

/* ---------------------- Middlewares---------------------- */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', express.static(__dirname + '/public'))
// Handlebars as template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'))

/* ---------------------- ServerIO---------------------- */
const io = new Server(server)


// const data = await getManagerMessages();
// const managerMessages = new data.ManagerMessageMongoDB();


io.on("connection", async (socket) => {
    console.log("Connection detected")
    socket.on("message", async (info) => {
        managerMessage.addElements([info]).then(() => {
            managerMessage.getElements().then((mensajes) => {
                console.log(mensajes)
                socket.emmit("allMessages", mensajes)
            })
        })
    })
})

/* ---------------------- Routes---------------------- */
// Routers
//HBS
const data = await getManagerMessages();
const managerMessages = new data.ManagerMessageMongoDB();
app.get('/', async (req, res) => {
    const msjs = await managerMessages.getElements()

    console.log(msjs)

    res.send(msjs)
})