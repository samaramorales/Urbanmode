let carrito = [];
let total = 0;

function agregarAlCarrito(nombreProducto, precioProducto) {
    const productoExistente = carrito.find(item => item.nombre === nombreProducto);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre: nombreProducto, precio: precioProducto, cantidad: 1 });
    }
    
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalSpan = document.getElementById('total');
    const contadorCarrito = document.getElementById('contador-carrito');

    listaCarrito.innerHTML = '';
    total = 0;
    let cantidadTotalProductos = 0;

    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'my-2');
        li.innerHTML = `
            <span>${producto.nombre} (${producto.cantidad} x $${producto.precio})</span>
            <div>
                <button class="btn btn-sm btn-outline-secondary me-1" onclick="cambiarCantidad(${index}, -1)">-</button>
                <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${index}, 1)">+</button>
                <button class="btn btn-danger btn-sm ms-2" onclick="eliminarDelCarrito(${index})">X</button>
            </div>
        `;
        listaCarrito.appendChild(li);
        total += producto.precio * producto.cantidad;
        cantidadTotalProductos += producto.cantidad;
    });

    totalSpan.textContent = total;
    contadorCarrito.textContent = cantidadTotalProductos;
    guardarCarritoEnLocalStorage();
}

function cambiarCantidad(index, cambio) {
    if (carrito[index]) {
        carrito[index].cantidad += cambio;
        if (carrito[index].cantidad <= 0) {
            carrito.splice(index, 1); // Elimina el producto si la cantidad llega a 0 o menos
        }
        actualizarCarrito();
    }
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    total = 0;
    actualizarCarrito();
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoDeLocalStorage();
    const carritoIcono = document.getElementById('carrito-icono');
    const carritoDiv = document.getElementById('carrito');

    carritoIcono.addEventListener('click', (event) => {
        event.preventDefault(); // Evita el comportamiento predeterminado del enlace
        carritoDiv.style.display = carritoDiv.style.display === 'block' ? 'none' : 'block';
    });
});