import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../index.css';

const EditCredit = () => {
    const { id } = useParams();
    const [credit, setCredit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCredit = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/credits/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCredit(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCredit();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredit((prevCredit) => ({
            ...prevCredit,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/credits/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credit),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            navigate('/credits'); // Redirige a la lista de créditos después de la actualización
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!credit) return <div>Credit not found</div>;

    return (
        <div className='container'>
            <h1>Editar Crédito</h1>
            <form onSubmit={handleSubmit} className='divForm'>
                <div className='formularios'>
                    <input
                        type="text"
                        name="user_id"
                        placeholder="ID del Usuario"
                        value={credit.user_id || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="amount"
                        placeholder="Monto"
                        value={credit.amount || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="interest_rate"
                        placeholder="Tasa de Interés"
                        value={credit.interest_rate || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="start_date"
                        placeholder="Fecha de Inicio"
                        value={credit.start_date || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="end_date"
                        placeholder="Fecha de Finalización"
                        value={credit.end_date || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="status"
                        placeholder="Estado"
                        value={credit.status || ''}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Actualizar Crédito</button>
            </form>
        </div>
    );
};

export default EditCredit;
