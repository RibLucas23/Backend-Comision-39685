export class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(product) {
        if (!product.id) {
            product.id = this.products.length + 1
        }
        this.products.push(product)
        return product
    }

    getProducts() {
        return this.products
    }
    getProductsById(id) {
        const array = this.getProducts()
        const res = array.find(obj => obj.id === id)
        if (res) {
            console.log(res)
            return res
        } else {
            return console.log("Not Found")
        }


    }
}



