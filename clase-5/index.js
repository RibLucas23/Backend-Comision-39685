import { ProductManager } from "./models/ProductManager.js"
const mesa = {
    title: "Mesa",
    description: "Mesa grande",
    price: 4444,
    thumbnail: "thumbnail",
    code: "ccc",
    stock: 100
}
const teclado = {
    title: "teclado",
    description: "teclado grande",
    price: 8888,
    thumbnail: "thumbnail",
    code: "bbb",
    stock: 1000
}
const Mousse = {
    title: "Mousse",
    description: "Mousse grande",
    price: 3333,
    thumbnail: "thumbnail",
    code: "aaa",
    stock: 800
}
const Mousse2 = {
    title: "Mousse",
    description: "Mousse grande",
    price: 3333,
    thumbnail: "thumbnail",
    code: "aaaeee",
    stock: 800
}
const productsArray = new ProductManager('./array.json')
// productsArray.getProducts()
// productsArray.addProduct(Mousse)
// await productsArray.addProduct(Mousse2)
// console.log(await productsArray.getProducts())
// await productsArray.remove(8)
await productsArray.updateProduct(4, "price", 99999)
// productsArray.addProduct(mesa)
// productsArray.addProduct(Mousse)
// productsArray.addProduct(Mousse2)
// console.table(productsArray.getProducts())
// console.log(await productsArray.getProductsById(2))