import { promises as fs } from 'fs'

export class ProductManager {
    constructor(ruta) {
        this.ruta = ruta
    }

    //TRAE TODOS LOS PRODUCTOS
    async getProducts() {
        try {
            const objetos = await fs.readFile(this.ruta, 'utf-8')
            // console.log(JSON.parse(objetos))
            return JSON.parse(objetos)
        } catch (error) {
            return console.log(`Error al  leer productos`)
        }
    }
    //AGREGA UN PRODUCTO AL ARRAY
    async addProduct(obj) {
        try {
            const array = await this.getProducts()
            if (!await this.checkCode(array, obj)) {
                let newId = ""
                // si no hay ningun producto en el array entonces newID = 1
                if (array[array.length - 1]) {
                    newId = array[array.length - 1].id + 1
                } else {
                    newId = 1
                }
                const newObj = { ...obj, id: newId }
                array.push(newObj)
                let newArray = await fs.writeFile(this.ruta, JSON.stringify(array, null, 2))
                return newArray
            }
            throw error
        } catch (error) {
            console.log(`Error al  guardar`)
        }
    }

    //TRAE UN PRODUCTO ESPECIFICO POR ID 
    async getProductsById(id) {
        try {
            const array = await this.getProducts()
            const res = array.find(obj => obj.id === id)
            if (res) {
                console.log(res)
                return res
            } else {
                throw error
            }

        } catch (error) {
            return console.log("Not Found")
        }
    }

    // ACTUALIZA UN PRODUCTO
    async updateProduct(id, campo, newData) {
        try {
            const array = await this.getProducts()
            const obj = await this.getProductsById(id)
            obj[campo] = newData
            let index = array.findIndex(prod => prod.id == obj.id)
            array[index] = obj
            await fs.writeFile(this.ruta, JSON.stringify(array, null, 2))
            return array

        } catch (error) {
            return console.log("Not Found")
        }
    }


    //ELIMINA POR ID
    async remove(id) {
        const array = await this.getProducts()
        try {
            const obj = array.find(obj => obj.id == id)
            if (!obj) {
                const error = `no hay nada con  ID: ${id} `
                throw new Error(error)
            }

            const newArray = array.filter(obj => obj.id != id)
            await fs.writeFile(this.ruta, JSON.stringify(newArray, null, 2))
            return newArray, console.log(newArray)

        }
        catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    // CHECKEO SI EL CODE YA EXISTE
    async checkCode(array, product) {
        try {
            let check = array.find(obj => obj.code == product.code)
            if (!check) {
                return false
            }
            console.log("ya existe un prod con ese CODE")
            return true

        } catch (error) {
            console.error(error)
        }
    }
}
