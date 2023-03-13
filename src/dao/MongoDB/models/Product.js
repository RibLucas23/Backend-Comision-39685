import { Schema } from "mongoose";
import { ManagerMongoDB } from "../../../db/mongoDBManager.js";

//variable de entorno
const url = process.env.URLMONGODB
//Schema
const productSchema = new Schema({
    nombre: String,
    marca: String,
    precio: Number,
    stock: Number,

})


export class ManagerMessageMongoDB extends ManagerMongoDB {
    super(url, messages, productSchema)
}