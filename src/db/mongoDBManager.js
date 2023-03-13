import mongoose from "mongoose";
export class ManagerMongoDB {

    #url
    constructor(url, collection, schema) {
        this.#url = url //Atributo privado
        this.collection = collection
        this.schema = new mongoose.Schema(schema)
        this.model = mongoose.model(this.collection, this.schema)
    }

    //conecto a la base de datos
    async #setConnection() {
        try {
            await mongoose.connect(this.#url)
            console.log("DB is connected")
        } catch (error) {
            return error
        }
    }
    //Agrego uno o varios elementos
    async addElements(elements) {
        this.#setConnection()
        try {
            await this.model.insertMany(elements)
        } catch (error) {
            return error
        }
    }

    //Traigo los elementos
    async getElements() {
        this.#setConnection()
        try {
            console.log("entra")
            return await this.model.find()
        } catch (error) {
            return error
        }
    }

    //Traigo un elemento espesifico 
    async getElementByid(id) {
        this.#setConnection()
        try {
            await this.model.findById(id)
        } catch (error) {
            return error
        }
    }

    //Update a un elemento
    async updateElement(id, info) {
        this.#setConnection()
        try {
            await this.model.findByIdAndUpdate(id, info)
        } catch (error) {
            return error
        }
    }

    //Borro un elemento
    async deleteElement(id) {
        this.#setConnection()
        try {
            await this.model.findByIdAndDelete(id)
        } catch (error) {
            return error
        }
    }










}