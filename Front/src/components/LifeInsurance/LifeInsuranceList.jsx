import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';

const LifeInsuranceList = () => {
    const [lifeInsurances, setLifeInsurances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers]=useState([]);

    useEffect(() => {
        const fetchLifeInsurances = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/lifeInsurances');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setLifeInsurances(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchLifeInsurances();
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

    const handleDelete = async (lifeInsuranceId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este seguro de vida?')) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/lifeInsurances/${lifeInsuranceId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                setLifeInsurances(lifeInsurances.filter(li => li.id !== lifeInsuranceId));
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
                <h1>Lista de Seguros de Vida</h1>
                <ul className="list">
                    {lifeInsurances.map(lifeInsurance => (
                        <li key={lifeInsurance.id} className="card">
                            <div className="details">
                                <h2>Seguro #{lifeInsurance.id}</h2>
                                <p><strong>Nombre de usuario:</strong> {getUserName(lifeInsurance.user_id)}</p>
                                <p><strong>Cantidad de Cobertura:</strong> ${lifeInsurance.amount}</p>
                                <p><strong>Fecha de Inicio:</strong> {lifeInsurance.start_date}</p>
                                <p><strong>Fecha de Finalización:</strong> {lifeInsurance.date_expire}</p>
                                <p><strong>Estado:</strong> {lifeInsurance.description}</p>
                            </div>
                            <div className="actions">
                                <Link to={`/edit-life-insurance/${lifeInsurance.id}`} className="edit-button">
                                    Editar
                                </Link>
                                <button 
                                    onClick={() => handleDelete(lifeInsurance.id)} 
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

export default LifeInsuranceList;
