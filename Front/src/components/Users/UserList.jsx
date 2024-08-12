import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css'


const documentTypeMap = {
    1: 'CC',
    2: 'Pasaporte',
    3: 'Tarjeta de Identidad',

};

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/users');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                setUsers(users.filter(user => user.id !== userId));
            } catch (error) {
                setError(error.message);
            }
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className='container'>
            <div className="list-container">
            <h1>Lista de Usuarios</h1>
            <ul className="list">
                {users.map(user => (
                    <li key={user.id} className="card">
                        <div className="details">
                            <h2>{user.name} {user.last_name}</h2>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Documento:</strong> {documentTypeMap[user.document_type] || 'Desconocido'} {user.document_number}</p>
                            <p><strong>Dirección:</strong> {user.address}</p>
                            <p><strong>Límite de Crédito:</strong> ${user.creditLimit}</p>
                        </div>
                        <div className="actions">
                            <Link to={`/edit-user/${user.id}`} className="edit-button">
                                Editar
                            </Link>
                            <button 
                                onClick={() => handleDelete(user.id)} 
                                className="delete-button"
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default UserList;
