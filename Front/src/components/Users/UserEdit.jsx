import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../index.css'

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/users/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            navigate('/users'); // Redirige a la lista de usuarios después de la actualización
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>User not found</div>;

    return (
        <div className='container'>
            <h1>Editar Usuario</h1>
            <form onSubmit={handleSubmit} className='divForm'>
                <div className='formularios'>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={user.name || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Apellido"
                        value={user.last_name || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="document_type"
                        placeholder="Tipo de documento"
                        value={user.document_type || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="document_number"
                        placeholder="Número de documento"
                        value={user.document_number || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Dirección"
                        value={user.address || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user.email || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={user.password || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="creditLimit"
                        placeholder="Límite de crédito"
                        value={user.creditLimit || ''}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Actualizar Usuario</button>
            </form>
        </div>
    );
};

export default EditUser;
