import { promises as fs } from 'fs'

export class CartManager {
    constructor(ruta) {
        this.ruta = ruta
    }

    //TRAE TODOS LOS PRODUCTOS
    async getCart() {
        try {
            // console.log(this.ruta)
            const objetos = await fs.readFile(this.ruta, 'utf-8')
            // console.log(objetos)
            return JSON.parse(objetos)
        } catch (error) {
            return console.log(`Error al  leer productos`)
        }
    }
    async createCart() {
        try {
            const array = await this.getCart()
            let newId = ""
            // si no hay ningun producto en el array entonces newID = 1
            if (array[array.length - 1]) {
                newId = array[array.length - 1].id + 1
            } else {
                newId = 1
            }
            const newCart = {
                id: newId,
                products: []
            }
            array.push(newCart)
            await fs.writeFile(this.ruta, JSON.stringify(array, null, 2))
            return array
        } catch (error) {
            console.log(`Error al crear cart`)

        }
    }

    //AGREGA UN PRODUCTO AL CARRT
    async addProduct(id, obj) {
        try {
            const array = await this.getCart()
            const cart = await this.getCartById(id)
            const cartProduct = cart.products.find(product => product.id == obj.id)
            if (cartProduct) {
                cartProduct.quantity += 1
            } else {
                const newObj = {
                    id: obj.id,
                    quantity: 1
                }
                cart.products.push(newObj)
            }
            let index = array.findIndex(cart => cart.id == id)
            array[index] = cart
            await fs.writeFile(this.ruta, JSON.stringify(array, null, 2))
            return cart
        } catch (error) {
            console.log(`Error al  guardar`)
        }
    }
    //AGREGA UN PRODUCTO AL CARRT
    async addProduct2(id, idObj) {
        try {
            const array = await this.getCart()
            const cart = await this.getCartById(id)
            const cartProduct = cart.products.find(product => product.id == idObj)
            if (cartProduct) {
                cartProduct.quantity += 1
            } else {
                const newObj = {
                    id: idObj,
                    quantity: 1
                }
                cart.products.push(newObj)
            }
            let index = array.findIndex(cart => cart.id == id)
            array[index] = cart
            await fs.writeFile(this.ruta, JSON.stringify(array, null, 2))
            return cart
        } catch (error) {
            console.log(`Error al  guardar`)
        }
    }

    //TRAE UN PRODUCTO ESPECIFICO POR ID 
    async getCartById(id) {
        try {
            const array = await this.getCart()
            const res = array.find(obj => obj.id == id)
            if (res) {
                // console.log(res)
                return res
            } else {
                throw error
            }

        } catch (error) {
            return console.log("Not Found")
        }
    }

    // ACTUALIZA UN PRODUCTO
    // async updateProduct(id, { title, description, price, thumbnail, code, stock }) {
    //     try {
    //         const array = await this.getCart()
    //         const obj = await this.getCartById(parseInt(id))
    //         obj.title = title
    //         obj.description = description
    //         obj.price = price
    //         obj.thumbnail = thumbnail
    //         obj.code = code
    //         obj.stock = stock
    //         let index = array.findIndex(prod => prod.id == obj.id)
    //         array[index] = obj
    //         await fs.writeFile(this.ruta, JSON.stringify(array, null, 2))
    //         return array

    //     } catch (error) {
    //         return console.log("Not Found")
    //     }
    // }


    //ELIMINA POR ID
    // async remove(id) {
    //     const array = await this.getCart()
    //     try {
    //         const obj = array.find(obj => obj.id == id)
    //         if (!obj) {
    //             const error = `no hay nada con  ID: ${id} `
    //             throw new Error(error)
    //         }

    //         const newArray = array.filter(obj => obj.id != id)
    //         await fs.writeFile(this.ruta, JSON.stringify(newArray, null, 2))
    //         return newArray, console.log(newArray)

    //     }
    //     catch (error) {
    //         console.log(error)
    //         throw new Error(error)
    //     }
    // }


}
