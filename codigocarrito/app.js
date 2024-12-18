const cartItems = document.getElementById('cart-items');
const totalDisplay = document.getElementById('total');
let total = 0;

// Modal elementos
const modal = document.createElement('div');
modal.classList.add('modal');

const modalContent = document.createElement('div');
modalContent.classList.add('modal-content');

// Botón para cerrar el modal
const closeButton = document.createElement('span');
closeButton.classList.add('close');
closeButton.innerHTML = '&times;';
modalContent.appendChild(closeButton);

// Contenido del modal
const modalHeading = document.createElement('h2');
modalHeading.textContent = '¡Gracias por tu compra!';
modalContent.appendChild(modalHeading);

const modalText = document.createElement('p');
modalContent.appendChild(modalText);

modal.appendChild(modalContent);
document.body.appendChild(modal);

// Función para dar formato a los números con separador de miles
function formatPrice(price) {
    let formattedPrice = price.toLocaleString('es-CO');
    if (formattedPrice.length > 6) {
        formattedPrice = formattedPrice.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
    }
    return formattedPrice;
}

// Agregar evento a cada botón de agregar al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productName = e.target.parentElement.querySelector('h3').innerText;
        const productPrice = parseFloat(e.target.getAttribute('data-price'));

        const li = document.createElement('li');
        li.textContent = `${productName} - $${formatPrice(productPrice)}`;

        // Botón para quitar producto
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Quitar';
        removeButton.style.marginLeft = '10px';
        removeButton.addEventListener('click', () => {
            cartItems.removeChild(li);
            total -= productPrice;
            updateTotal();
        });

        li.appendChild(removeButton);
        cartItems.appendChild(li);

        total += productPrice;
        updateTotal();
    });
});

function updateTotal() {
    totalDisplay.textContent = `$${formatPrice(total)}`;
}

// Evento para el botón de compra
document.getElementById('buy-button').addEventListener('click', () => {
    const loggedInUser = sessionStorage.getItem('nombreUsuario');

    if (!loggedInUser) {
        alert('Debes iniciar sesión para realizar la compra.');
        window.location.href = '../src/login.html'; // Asegúrate de que esta ruta sea correcta.
        return;
    }

    if (total > 0) {
        modalText.textContent = `Tu total es $${formatPrice(total)}. ¡Esperamos que disfrutes tus productos!`;
        modal.style.display = 'flex';
        
        // Resetear el carrito y total después de la compra
        cartItems.innerHTML = '';
        total = 0;
        updateTotal();
    } else {
        alert('Tu carrito está vacío.');
    }
});

// Cerrar el modal cuando se haga clic en el botón de cierre
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cerrar el modal si se hace clic fuera del contenido del modal
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

//botón de regreso a la página de inicio
const backButton = document.createElement('button');
backButton.textContent = 'Regresar a la tienda';
backButton.classList.add('back-button');
document.body.appendChild(backButton);

backButton.addEventListener('click', () => {
    window.location.href = '../index.html'; 
});
