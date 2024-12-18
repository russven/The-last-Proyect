//Capturar datos desde local storage
// SyncData.jsx
import React, { useEffect, useState } from 'react';

const SyncData = () => {
    const [localData, setLocalData] = useState(null);

    useEffect(() => {
        // Obtener datos del Local Storage
        const data = getDataFromLocalStorage();
        setLocalData(data);
    }, []);

    const getDataFromLocalStorage = () => {
        const data = localStorage.getItem('users'); // Reemplaza 'keyName' con tu clave
        return data ? JSON.parse(data) : null;
    };

    const sendDataToServer = async () => {
        if (localData) {
            try {
                const response = await fetch('http://localhost:5173/api/sync', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(localData),
                });

                const result = await response.json();
                console.log('Datos enviados al servidor:', result);
            } catch (error) {
                console.error('Error al enviar los datos:', error);
            }
        }
    };

    return (
        <div>
            <h1>Sincronización de datos</h1>
            {localData ? (
                <p>Datos listos para ser enviados:</p>
            ) : (
                <p>No hay datos disponibles.</p>
            )}
            <button onClick={sendDataToServer}>Enviar datos al servidor</button>
        </div>
    );
};

export default SyncData; React;