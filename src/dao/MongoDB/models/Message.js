import { Schema } from "mongoose";
import { ManagerMongoDB } from "../../../db/mongoDBManager.js";

//variable de entorno
const url = process.env.URLMONGODB
//Schema
const messageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export class ManagerMessageMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "messages", messageSchema)
        // Aqui irian los atributos propios de la clase
    }
    // Aqui irian los metodos propios de la clase
}