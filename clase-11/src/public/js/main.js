const socket = io()


socket.on('from-server-productos', async (data) => {
    renderProducts(data)
    // mostrarProductos(DB_PRODUCTOS);
});

function renderProducts(productos) {
    console.log(productos)
    const cuerpoProductosHTML = productos.map((producto) => {
        return `<tr>
                    <td >${producto.title}: </td>
                    <td >$ ${producto.price}</td>
                    <td ># ${producto.code}</td>
                    <td > <img width=50 src="${producto.thumbnail}" alt=""> </img>  </td>
                    <td> <button  onclick="deleteProduct(${producto.id})">Delete</button> </td>
                </tr>
                `;
    })

    document.querySelector('#tablaProductos').innerHTML = cuerpoProductosHTML
}
function addProduct() {
    const title = document.querySelector('#title');
    const price = document.querySelector('#price');
    const code = document.querySelector('#code');
    const thumbnail = document.querySelector('#thumbnail');
    const stock = document.querySelector('#stock');
    const description = document.querySelector('#description');

    const producto = {
        title: title.value,
        price: price.value,
        code: code.value,
        thumbnail: thumbnail.value,
        stock: stock.value,
        description: description.value

    }
    console.log(producto)
    socket.emit('from-client-producto', producto);
}
function deleteProduct(id) {
    socket.emit('from-client-deleteProduct', id);
}

