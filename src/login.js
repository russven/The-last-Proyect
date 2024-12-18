// Asignar los datos al formulario
let loginForm = document.querySelector('#loginForm');

// Asignar un evento para enviar información
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    let Users = JSON.parse(localStorage.getItem('users')) || [];
    // Buscar los datos email y password para mirar si se encuentran registrados
    let validUser = Users.find(user => user.email === email && user.password === password);

    // Condicional 
    if (!validUser) {
        Swal.fire({
            icon: 'error',
            title: 'Error de datos',
            text: 'EL USUARIO Y/O CLAVE SON INCORRECTOS, INTÉNTALO NUEVAMENTE'
        });
        return;
    }

    // Definir el rol del usuario
    let userRole = 'user'; // Rol predeterminado

    // Comprobar si el usuario es administrador
    if (email === "admin.co@PIO.com" && password === "admin123") {
        userRole = 'admin';
    }

    // Guardar el rol de usuario en sessionStorage
    sessionStorage.setItem("userRole", userRole);

    Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión',
        text: `Bienvenido de nuevo ${validUser.name}`,
        confirmButtonText: 'Continuar',
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isConfirmed) {
            // Al hacer clic en "Continuar", guarda la información y redirige
            localStorage.setItem('login_success', JSON.stringify(validUser));
            sessionStorage.setItem('nombreUsuario', validUser.name);
            window.location.href = '../index.html';
        }
    });
});

// Evento para cerrar sesión
document.querySelector(".dropdown-item").addEventListener("click", function () {
    sessionStorage.clear(); // Borra todos los datos del sessionStorage
    Swal.fire({
        icon: 'info',
        title: 'Sesión cerrada',
        text: 'Has cerrado sesión exitosamente.',
        confirmButtonText: 'Volver a login',
    }).then(() => {
        window.location.href = "./login.html"; // Redirigir al usuario a la página de inicio de sesión
    });
});

// Ocultar o mostrar el botón CRUD según el rol
document.addEventListener("DOMContentLoaded", function () {
    const adminButton = document.querySelector(".user-link");

    // Función para comprobar el rol de usuario
    const checkUserRole = () => {
        const userRole = sessionStorage.getItem("userRole");
        if (userRole === "admin") {
            adminButton.style.display = "block"; // Mostrar el botón para admin
        } else {
            adminButton.style.display = "none"; // Ocultar el botón para otros usuarios
        }
    };

    // Llamar a la función para establecer el estado inicial
    checkUserRole();

    // Escuchar cambios en sessionStorage (opcional)
    window.addEventListener("storage", checkUserRole);
});
