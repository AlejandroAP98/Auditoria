import { useState, useEffect } from 'react';
import '../../index.css';

const Audit = () => {
    const [audits, setAudits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

    useEffect(() => {
        const fetchAudits = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/audit');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAudits(data.reverse()); // Invertir el orden de los registros
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAudits();

        const intervalId = setInterval(fetchAudits, 10000); 

        return () => clearInterval(intervalId);
    }, []);
    // Filtrar las auditorías según el término de búsqueda
    const filteredAudits = audits.filter(audit => {
        const auditValues = [
            audit.id,
            audit.event,
            audit.auditable_type,
            JSON.stringify(audit.old_values),
            JSON.stringify(audit.new_values),
            audit.ip_address,
            audit.user_agent,
            audit.created_at,
        ];

        // Convertir todos los valores a strings y verificar si alguno coincide con el término de búsqueda
        return auditValues.some(value =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className='containerTable'>
            <h1>Eventos</h1>
            <input 
                type="text" 
                placeholder="Buscar en todas las columnas..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="search-input"
            />
            <table className="audit-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Evento</th>
                        <th>Tipo</th>
                        <th>Registro</th>
                        <th>Cambio</th>
                        <th>Ip</th>
                        <th>Agente</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAudits.map(audit => (
                        <tr key={audit.id}>
                            <td>{audit.id}</td>
                            <td>{audit.event}</td>
                            <td>{audit.auditable_type}</td>
                            <td>{JSON.stringify(audit.old_values)}</td>
                            <td>{JSON.stringify(audit.new_values)}</td>
                            <td>{audit.ip_address}</td>
                            <td>{audit.user_agent}</td>
                            <td>{audit.created_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Audit;
