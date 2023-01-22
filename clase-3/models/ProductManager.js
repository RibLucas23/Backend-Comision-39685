export class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(product) {
        if (!this.checkCode(product)) {
            if (!product.id) {
                product.id = this.products.length + 1
            }
            this.products.push(product)
            return product
        } else {
            return console.error("ya hay un product con ese CODE")
        }

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
    checkCode(product) {
        try {
            const array = this.getProducts()
            let check = array.find(obj => obj.code == product.code)
            if (!check) {
                return false
            } else {
                return true
            }

        } catch (error) {
            console.error(error)
        }

    }
}



