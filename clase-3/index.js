import { ProductManager } from "./models/ProductManager.js"
const mesa = {
    title: "Mesa",
    description: "Mesa grande",
    price: 4444,
    thumbnail: "thumbnail",
    stock: 100
}
const teclado = {
    title: "teclado",
    description: "teclado grande",
    price: 8888,
    thumbnail: "thumbnail",
    stock: 1000
}
const Mousse = {
    title: "Mousse",
    description: "Mousse grande",
    price: 3333,
    thumbnail: "thumbnail",
    stock: 800
}
const productsArray = new ProductManager()
productsArray.addProduct(teclado)
productsArray.addProduct(mesa)
productsArray.addProduct(Mousse)

console.log(productsArray.getProducts())
productsArray.getProductsById(1)