function obtenerCarrito() 
{
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function cargarProductosCarrito() 
{
    let tabla = document.getElementById("tabla-carrito");
    
    let total = document.getElementById("valor-final");
    listaCarrito = obtenerCarrito();
    if(listaCarrito.length === 0) {
        document.getElementById("tabla-carrito").innerHTML = "<tr><td colspan='4'>El carrito está vacío</td></tr>";
        total.textContent = `El valor final a pagar es de: $0.00`;
        return;
    }



    listaCarrito.forEach(item => {
        let fila = document.createElement("tr");
        fila.innerHTML = "";
        fila.innerHTML += `
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>$${item.precio.toFixed(2)}</td>
        `;
        tabla.appendChild(fila);
    });    
    let valorTotal = listaCarrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    total.textContent = `El valor final a pagar es de: $${valorTotal.toFixed(2)}`;
}


function limpiarCarrito() 
{
    if(listaCarrito.length === 0) {
        mostrarSnackbar("El carrito ya está vacío");
        return;
    }   
    localStorage.removeItem("carrito");
    document.getElementById("tabla-carrito").innerHTML = "";
    let total = document.getElementById("valor-final");
    total.textContent = `El valor final a pagar es de: $0.00`;
    alert("Carrito limpiado correctamente");

}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});