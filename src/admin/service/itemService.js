const API_URL = "http://localhost:5000/users"; // Cambiar a la nueva ruta

// Obtener todos los usuarios
export const getUsers = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};

// Agregar un nuevo usuario
export const addUser = async (user) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    return await response.json();
};

// Actualizar un usuario
export const updateUser = async (id, user) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    return await response.json();
};

// Eliminar un usuario
export const deleteUser = async (id) => {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
};
