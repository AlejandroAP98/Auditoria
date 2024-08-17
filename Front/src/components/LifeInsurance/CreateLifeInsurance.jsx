import { useState, useEffect } from 'react';

function CreateLifeInsurance() {
    const [id_user, setUserId] = useState('');
    const [amount, setAmount] = useState('');
    const [start_date, setStartDate] = useState('');
    const [date_expire, setDateExpire] = useState('');
    const [description, setDescription] = useState('');
    const [users, setUsers] = useState([]);


    useEffect(() => {

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
        
        const coverageAmountFloat = parseFloat(amount);
        console.log(amount)
        try {
            const response = await fetch('http://127.0.0.1:8000/api/lifeInsurances', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_user,
                    start_date,
                    date_expire,
                    amount: coverageAmountFloat,
                    description
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setUserId('');
            setAmount('');
            setStartDate('');
            setDateExpire('');
            setDescription('');
            alert("Seguro de vida creado exitosamente");
        } catch (error) {
            console.error('Error creating life insurance:', error);
        }
    };

    return (
        <div className='container'>
            <h1>Crear Seguro de Vida</h1>
            <form onSubmit={handleSubmit} className='divForm'>
                <div className='formularios'>
                    <select id="id_user" value={id_user} onChange={(e) => setUserId(e.target.value)}>
                        <option value="" disabled>Seleccione un usuario</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name} {user.last_name}</option>
                        ))}
                    </select>
                    <input type="number" placeholder="Monto de Cobertura" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <input type="date" placeholder="Fecha de inicio" value={start_date} onChange={(e) => setStartDate(e.target.value)} />
                    <input type="date" placeholder="Fecha de finalización" value={date_expire} onChange={(e) => setDateExpire(e.target.value)} />
                    <input type="text" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type="submit">Crear Seguro de Vida</button>
            </form>
        </div>
    );
}

export default CreateLifeInsurance;
