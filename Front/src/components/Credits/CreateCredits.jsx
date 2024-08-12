import { useState, useEffect } from 'react';

function CreateCredit() {
    const [user_id, setUserId] = useState('');
    const [interest_rate, setInterestRate] = useState('');
    const [amount, setAmount] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [status, setStatus] = useState('');
    const [users, setUsers] = useState([]);


    useEffect(() => {
        // Aquí debes hacer una solicitud a la API para obtener la lista de usuarios.
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const interestRateFloat = parseFloat(interest_rate);
        const amountFloat = parseFloat(amount);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/credits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id,
                    interest_rate: interestRateFloat,
                    amount: amountFloat,
                    start_date,
                    end_date,
                    status
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);

            // Limpiar los campos después de la creación
            setUserId('');
            setInterestRate('');
            setAmount('');
            setStartDate('');
            setEndDate('');
            setStatus('');

            alert("Crédito creado exitosamente");
        } catch (error) {
            console.error('Error creating credit:', error);
        }
    };

    return (
        <div className='container'>
            <h1>Crear Crédito</h1>
            <form onSubmit={handleSubmit} className='divForm'>
                <div className='formularios'>
                    <select id="user_id" value={user_id} onChange={(e) => setUserId(e.target.value)}>
                        <option value="" disabled>Seleccione un usuario</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name} {user.last_name}</option>
                        ))}
                    </select>

                    <input type="number" placeholder="Tasa de interés (%)" value={interest_rate} onChange={(e) => setInterestRate(e.target.value)} />
                    <input type="number" placeholder="Monto" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <input type="date" placeholder="Fecha de inicio" value={start_date} onChange={(e) => setStartDate(e.target.value)} />
                    <input type="date" placeholder="Fecha de finalización" value={end_date} onChange={(e) => setEndDate(e.target.value)} />
                    <input type="text" placeholder="Estado" value={status} onChange={(e) => setStatus(e.target.value)} />
                </div>
                <button type="submit">Crear Crédito</button>
            </form>
        </div>
    );
}

export default CreateCredit;
