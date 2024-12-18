const user = JSON.parse(localStorage.getItem('login_success')) || false;

if (!user) {
    // Si el usuario no está logueado, muestra la alerta de SweetAlert
    Swal.fire({
        icon: 'info',
        title: 'Iniciar Sesión',
        text: 'Debes iniciar sesión para acceder a esta página',
        confirmButtonText: 'Ir a Iniciar Sesión',
        showCancelButton: false,
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'login.html'; // Redirigir a la página de login
        }
    });
} else {
    // Oculta los botones de Signup y Login si el usuario está logueado
    const signupLink = document.querySelector('#signup');
    const loginLink = document.querySelector('#login');
    if (signupLink) signupLink.style.display = 'none';
    if (loginLink) loginLink.style.display = 'none';

    // Muestra el nombre del usuario y el ícono al lado del carrito
    const userIcon = document.createElement('span');
    userIcon.classList.add('user-info'); // Añade la clase para el estilo
    userIcon.innerHTML = `<span>${user.name}</span>`; // Asegúrate de que el nombre esté almacenado

    // Inserta el ícono de usuario junto al carrito
    const cartLink = document.querySelector('.cart-link');
    if (cartLink) cartLink.insertAdjacentElement('afterend', userIcon);

    // Verifica si es admin y muestra el botón CRUD
    const userRole = sessionStorage.getItem("userRole");
    const adminButton = document.querySelector(".user-link");
    const adminIcon = document.querySelector(".far.fa-address-card");
    if (userRole === "admin") {
        if (adminButton) adminButton.style.display = "block";
        if (adminIcon) adminIcon.style.display = "inline-block";
    }
}

// Lógica para el cierre de sesión
const logout = document.querySelector('#logout');
logout.addEventListener('click', () => {
    Swal.fire({
        icon: 'info',
        title: 'Cerrar Sesión',
        text: '¿Estás seguro de que quieres cerrar sesión?',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('login_success'); // Eliminar la sesión del localStorage
            sessionStorage.clear(); // Limpiar también sessionStorage
            localStorage.setItem("logoutEvent", Date.now()); // Emitir un evento global

            // Ocultar el ícono de usuario y el botón CRUD al cerrar sesión
            const userIcon = document.querySelector('.user-info');
            const adminButton = document.querySelector(".user-link");
            const adminIcon = document.querySelector(".far.fa-address-card");
            if (userIcon) userIcon.remove();
            if (adminButton) adminButton.style.display = "none";
            if (adminIcon) adminIcon.style.display = "none";

            Swal.fire({
                icon: 'success',
                title: 'Sesión Cerrada',
                text: 'Tu sesión ha sido cerrada correctamente.',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = 'login.html'; // Redirigir a la página de login después de cerrar sesión
            });
        }
    });
});

// Escuchar eventos de logout en otras pestañas
window.addEventListener("storage", (event) => {
    if (event.key === "logoutEvent") {
        const userIcon = document.querySelector('.user-info');
        const adminButton = document.querySelector(".user-link");
        const adminIcon = document.querySelector(".far.fa-address-card");
        if (userIcon) userIcon.remove();
        if (adminButton) adminButton.style.display = "none";
        if (adminIcon) adminIcon.style.display = "none";
    }
});
