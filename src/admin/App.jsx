import { useState, useEffect } from "react"; // Importamos React y hooks para manejar estados y efectos secundarios
import Swal from "sweetalert2"; // Librería para mostrar alertas
import "../admin/index.css"; // Archivo CSS para estilos

function App() {
    // Estados principales
    const [users, setUsers] = useState([]); // Lista de usuarios
    const [form, setForm] = useState({ name: "", email: "", password: "" }); // Datos del formulario
    const [editingUser, setEditingUser] = useState(null); // Índice del usuario en edición (null si no estamos editando)
    const [showPasswords, setShowPasswords] = useState(false); // Estado para alternar entre mostrar/ocultar contraseñas

    // Cargar usuarios desde el almacenamiento local (localStorage) al iniciar el componente
    useEffect(() => {
        loadUsers();
    }, []);

    // Función para cargar los usuarios guardados en localStorage
    const loadUsers = () => {
        const savedUsers = JSON.parse(localStorage.getItem("users")) || []; // Si no hay usuarios, usa un array vacío
        setUsers(savedUsers); // Actualiza el estado con los usuarios cargados
    };

    // Maneja los cambios en los campos del formulario
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value }); // Actualiza el estado con el valor del input
    };

    // Maneja el envío del formulario (agregar o actualizar usuario)
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene la recarga de la página al enviar el formulario
        if (editingUser !== null) {
            // Si estamos editando un usuario
            const updatedUsers = users.map((user, index) =>
                index === editingUser
                    ? { ...user, name: form.name, email: form.email, password: form.password } // Actualiza los datos del usuario
                    : user
            );
            localStorage.setItem("users", JSON.stringify(updatedUsers)); // Guarda los usuarios actualizados en localStorage
            setUsers(updatedUsers); // Actualiza el estado con los usuarios actualizados
            Swal.fire({
                title: "Actualizado",
                text: "Usuario actualizado con éxito",
                icon: "success",
                confirmButtonText: "OK",
            });
            setEditingUser(null); // Salimos del modo de edición
        } else {
            // Si estamos agregando un usuario nuevo
            const newUser = { name: form.name, email: form.email, password: form.password }; // Crea un nuevo objeto usuario
            const updatedUsers = [...users, newUser]; // Añade el nuevo usuario a la lista
            localStorage.setItem("users", JSON.stringify(updatedUsers)); // Guarda los usuarios actualizados en localStorage
            setUsers(updatedUsers); // Actualiza el estado con los usuarios actualizados
            Swal.fire({
                title: "Agregado",
                text: "Usuario agregado con éxito",
                icon: "success",
                confirmButtonText: "OK",
            });
        }
        setForm({ name: "", email: "", password: "" }); // Limpia el formulario después de agregar/editar
    };

    // Maneja la edición de un usuario
    const handleEdit = (user) => {
        setForm({ name: user.name, email: user.email, password: user.password }); // Llena el formulario con los datos del usuario
        setEditingUser(users.indexOf(user)); // Guarda el índice del usuario en edición
        Swal.fire({
            title: "Modo de edición",
            text: `Editando: ${user.name}`,
            icon: "info",
            confirmButtonText: "Entendido",
        });
    };

    // Maneja la eliminación de un usuario
    const handleDelete = async (index) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            const updatedUsers = users.filter((_, i) => i !== index); // Elimina el usuario con el índice especificado
            localStorage.setItem("users", JSON.stringify(updatedUsers)); // Guarda los usuarios actualizados en localStorage
            setUsers(updatedUsers); // Actualiza el estado con los usuarios actualizados
            Swal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
        }
    };

    // Alterna entre mostrar y ocultar las contraseñas en el listado
    const toggleShowPasswords = () => {
        setShowPasswords(!showPasswords); // Cambia el estado de `showPasswords`
    };

    return (
        <div className="container">
            <h1>Dashboard Lentech</h1>

            {/* Formulario para agregar/editar usuarios */}
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleChange}
                />
                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    name="password"
                    type="password" // Contraseña oculta mientras se escribe
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                />
                <button type="submit">
                    {editingUser !== null ? "Actualizar" : "Agregar"} {/* Cambia el texto según el modo */}
                </button>
            </form>

            <h2>Usuarios</h2>

            {/* Botón para mostrar/ocultar contraseñas */}
            <button onClick={toggleShowPasswords} className="toggle-passwords">
                {showPasswords ? "Ocultar Contraseñas" : "Mostrar Contraseñas"} {/* Cambia el texto */}
            </button>

            {/* Listado de usuarios */}
            <div className="item-list">
                {users.map((user, index) => (
                    <div key={index} className="item">
                        <span>
                            <strong>{user.name}</strong> - {user.email} -{" "}
                            {showPasswords ? user.password : "********"} {/* Muestra la contraseña o asteriscos */}
                        </span>
                        <div className="item-buttons">
                            <button className="edit-btn" onClick={() => handleEdit(user)}>
                                Editar
                            </button>
                            <button className="delete-btn" onClick={() => handleDelete(index)}>
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
