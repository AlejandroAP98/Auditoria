import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../index.css';

const LifeInsuranceEdit = () => {
    const { id } = useParams();
    const [lifeInsurance, setLifeInsurance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLifeInsurance = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/lifeInsurances/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setLifeInsurance(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchLifeInsurance();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLifeInsurance((prevLifeInsurance) => ({
            ...prevLifeInsurance,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/lifeInsurances/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(lifeInsurance),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            navigate('/lifeInsurances'); 
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!lifeInsurance) return <div>Life Insurance not found</div>;

    return (
        <div className='container'>
            <h1>Editar Seguro de Vida</h1>
            <form onSubmit={handleSubmit} className='divForm'>
                <div className='formularios'>
                    <input
                        type="text"
                        name="user_id"
                        placeholder="ID del Usuario"
                        value={lifeInsurance.user_id || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="amount"
                        placeholder="Cantidad de Cobertura"
                        value={lifeInsurance.amount || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="start_date"
                        placeholder="Fecha de Inicio"
                        value={lifeInsurance.start_date || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="end_date"
                        placeholder="Fecha de Finalización"
                        value={lifeInsurance.end_date || ''}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Estado"
                        value={lifeInsurance.description || ''}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Actualizar Seguro</button>
            </form>
        </div>
    );
};

export default LifeInsuranceEdit;
