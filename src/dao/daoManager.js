
export const getManagerMessages = async () => {
    const modelMessage = process.env.DBSELECTION == 1
        ? await import('./MongoDB/models/Message.js') // MongoDB 
        : await import('./Postgresql/models/Message.js') // SQL (postgres)

    return modelMessage
}

export const getManagerProducts = async () => {
    const modelProduct = process.env.DBSELECTION == 1
        ? await import('./MongoDB/models/Product.js') // MongoDB 
        : await import('./Postgresql/models/Product.js') // SQL (postgres)
    return modelProduct
}

export const getManagerCarts = async () => {
    const modelCart = process.env.DBSELECTION == 1
        ? await import('./MongoDB/models/Cart.js') // MongoDB 
        : await import('./Postgresql/models/Cart.js')  // SQL (postgres)
    return modelCart
}