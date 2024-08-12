import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';

const statusMap = {
    1: 'Activo',
    2: 'Pagado',
    3: 'En Mora',
    4: 'Cancelado',
};

const CreditList = () => {
    const [credits, setCredits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/credits');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCredits(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCredits();
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (creditId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este crédito?')) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/credits/${creditId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                setCredits(credits.filter(credit => credit.id !== creditId));
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const getUserName = (userId) => {
        const user = users.find(user => user.id === userId);
        return user ? `${user.name} ${user.last_name}` : 'Desconocido';
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className='container'>
            <div className="list-container">
            <h1>Lista de Créditos</h1>
            <ul className="list">
                {credits.map(credit => (
                    <li key={credit.id} className="card">
                        <div className="details">
                            <h2>Crédito #{credit.id}</h2>
                            <p><strong>Nombre de usuario:</strong> {getUserName(credit.user_id)}</p>
                            <p><strong>Tasa de Interés:</strong> {credit.interest_rate}%</p>
                            <p><strong>Monto:</strong> ${credit.amount}</p>
                            <p><strong>Fecha de Inicio:</strong> {credit.start_date}</p>
                            <p><strong>Fecha de Finalización:</strong> {credit.end_date}</p>
                            <p><strong>Estado:</strong> {statusMap[credit.status] || 'Desconocido'}</p>
                        </div>
                        <div className="actions">
                            <Link to={`/edit-credit/${credit.id}`} className="edit-button">
                                Editar
                            </Link>
                            <button 
                                onClick={() => handleDelete(credit.id)} 
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

export default CreditList;
