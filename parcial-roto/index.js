let listaCarrito = [];

function inicializar()
{
    listaCarrito = obtenerCarrito();
    document.getElementById("numero-articulos").textContent = listaCarrito.reduce((total, item) => total + item.cantidad, 0);

}


//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() 
{
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) 
{
    console.log(carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
}

//--- Funcion que actualiza el contador de productos en el carrito ---//
function actualizarContadorCarrito()
{
    let carrito = obtenerCarrito();
    let total = carrito.reduce((acum, prod) => acum + prod.cantidad, 0);
    document.getElementById("cantidad-carrito").textContent = total;

}

function sumarAlCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;
    let producto = elementoClickeado.closest(".li-hamburguesa, .li-bebida, .li-tragos");
    let nombre = producto.querySelector(".nombre-producto").textContent;
    let precio = parseFloat(producto.querySelector(".precio-producto").textContent.replace("$", ""));
    let itemExistente = listaCarrito.find(item => item.nombre === nombre);
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        listaCarrito.push({ nombre, precio, cantidad: 1 });
    }
    alert(`Un/una: ${nombre} fue agregado al carrito`);
    guardarCarrito(listaCarrito);

}

function restarDelCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;
    
    if(listaCarrito.length === 0) {
        alert("No hay productos para eliminar")
        return;
    }

    let producto = elementoClickeado.closest(".li-hamburguesa, .li-bebida, .li-tragos");
    let nombre = producto.querySelector(".nombre-producto").textContent;

    let itemExistente = listaCarrito.find(item => item.nombre === nombre);

    if (itemExistente) {
        itemExistente.cantidad--;
        if (itemExistente.cantidad <= 0) {
            listaCarrito = listaCarrito.filter(item => item.nombre !== nombre);
        }
        document.getElementById("numero-articulos").textContent = listaCarrito.reduce((total, item) => total + item.cantidad, 0);
        guardarCarrito(listaCarrito);
       
        alert(`Un/una: ${itemExistente.nombre} fue eliminado del carrito`);
    }
    else
    {
        alert(`No hay ${producto.querySelector(".nombre-producto").textContent} en el carrito para eliminar`);
    }
}

//--- Funcion para ordenar productos de mayor a menor precio ---//
function ordenarMayorAMenor(e)
{
    let seccion = e.target.closest("section");
    let lista = seccion.querySelector("ul");
    let productos = Array.from(lista.children);

    productos.sort((a, b) =>
    {
        let precioA = Number(
            a.querySelector(".precio-producto")
             .textContent.replace("$", "")
        );

        let precioB = Number(
            b.querySelector(".precio-producto")
             .textContent.replace("$", "")
        );

        return precioB - precioA;
    });

    productos.forEach(producto => lista.appendChild(producto));
}

//--- Funcion para ordenar productos de menor a mayor precio ---//
function ordenarMenorAMayor(e)
{
    let seccion = e.target.closest("section");
    let lista = seccion.querySelector("ul");
    let productos = Array.from(lista.children);

    productos.sort((a, b) =>
    {
        let precioA = Number(
            a.querySelector(".precio-producto")
             .textContent.replace("$", "")
        );

        let precioB = Number(
            b.querySelector(".precio-producto")
             .textContent.replace("$", "")
        );

        return precioA - precioB;
    });

    productos.forEach(producto => lista.appendChild(producto));

}

//--- Funcion para mostrar/ocultar las calorías de las hamburguesas ---//
function toggleCalorias(e)
{
    let elementoClickeado = e.target;
    let producto = elementoClickeado.closest(".li-hamburguesa");
    let calorias = producto.querySelector(".calorias-producto");

    if(!calorias)
    {
        return;
    }

    if(calorias.style.display === "none")
    {
        calorias.style.display = "block";
    }
    else
    {
        calorias.style.display = "none";
    }

}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
window.addEventListener("DOMContentLoaded", () => 
{
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");
    const botonesOrdenarMayor = document.querySelectorAll(".btn-ordenar-mayor");
    const botonesOrdenarMenor = document.querySelectorAll(".btn-ordenar-menor");
    const botonesCalorias = document.querySelectorAll(".btn-calorias");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
    botonesOrdenarMayor.forEach(btn => btn.addEventListener("click", ordenarMayorAMenor));
    botonesOrdenarMenor.forEach(btn => btn.addEventListener("click", ordenarMenorAMayor));
    botonesCalorias.forEach(btn => btn.addEventListener("click", toggleCalorias));

    // Actualizar el contador al cargar la página
    actualizarContadorCarrito();

    document.getElementById("contenedor-contador-carrito").addEventListener("click", () => {
        window.location.href = "./pages/carrito/carrito.html";
    });

});
