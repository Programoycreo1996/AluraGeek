// Función para obtener productos del servidor simulado
const getProductos = async () => {
    try {
        const response = await fetch("http://localhost:5000/productos");
        const productos = await response.json();
        renderizarProductos(productos); // Renderiza los productos obtenidos
    } catch (error) {
        console.error("Error obteniendo los productos:", error);
    }
};

// Función para renderizar los productos en el DOM
const renderizarProductos = (productos) => {
    const contenedor = document.querySelector(".productos-lista");
    const mensajeVacio = document.querySelector(".producto-vacio");

    // Limpia el contenedor antes de renderizar
    contenedor.innerHTML = "";

    if (productos.length === 0) {
        mensajeVacio.style.display = "block"; // Muestra el mensaje si no hay productos
    } else {
        mensajeVacio.style.display = "none"; // Oculta el mensaje si hay productos
        productos.forEach((producto) => {
            const card = `
                <div class="card">
                    <img src="http://localhost:5000/productos${producto.imagen}" alt="${producto.nombre}" class="card-image" />
                    <div class="card-container--info">
                        <p class="card-name">${producto.nombre}</p>
                        <div class="card-container--value">
                            <p class="card-price">$${producto.precio.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            `;
            contenedor.innerHTML += card;
        });
    }
};


// Función para agregar un nuevo producto
const agregarProducto = async (producto) => {
    try {
        const response = await fetch("http://localhost:5000/productos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(producto),
        });

        if (response.ok) {
            const nuevoProducto = await response.json();
            console.log("Producto agregado:", nuevoProducto);
            getProductos(); // Actualiza la lista de productos
        }
    } catch (error) {
        console.error("Error agregando el producto:", error);
    }
};

// Capturar evento del formulario para agregar productos
document.getElementById("form-agregar").addEventListener("submit", (event) => {
    event.preventDefault();

    const producto = {
        nombre: document.getElementById("nombre").value,
        precio: parseFloat(document.getElementById("precio").value),
        imagen: document.getElementById("imagen").value,
    };

    agregarProducto(producto); // Llama a la función para agregar el producto
});

// Función para eliminar un producto por ID
const eliminarProducto = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/productos/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            console.log(`Producto con ID ${id} eliminado`);
            getProductos(); // Actualiza la lista de productos
        }
    } catch (error) {
        console.error("Error eliminando el producto:", error);
    }
};

// Llama a la función para obtener los productos al cargar la página
window.onload = () => {
    getProductos();
};
