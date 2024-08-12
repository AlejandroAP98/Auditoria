import { useState, useEffect } from 'react';

function CreateUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [last_name, setLastName] = useState('');
    const [document_type, setDocumentType] = useState('');
    const [document_number, setDocumentNumber] = useState('');
    const [address, setAddress] = useState('');
    const [creditLimit, setCreditLimit] = useState('');
    const [id_role, setRole] = useState('');
    const [roles, setRoles] = useState([]);
    const [documentTypes, setDocumentTypes] = useState([]);

    useEffect(() => {
        setRoles([
            { id: 1, name: 'Cliente' },
            { id: 2, name: 'Administrador' }
        ]);

        setDocumentTypes([
            { id: 1, type: 'Cédula de ciudadanía' },
            { id: 2, type: 'Pasaporte' }
        ]);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const document_typeInt = parseInt(document_type);
        const idrole = parseInt(id_role);
        const creditLimitNumber = parseFloat(creditLimit);
        const email_verified_at = null;

        console.log(id_role, name, last_name, document_number, document_typeInt, address, email, email_verified_at, password, creditLimitNumber);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_role: idrole,
                    name,
                    last_name,
                    document_type: document_typeInt,
                    document_number,
                    address,
                    email,
                    password,
                    email_verified_at,
                    creditLimit: creditLimitNumber
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            setName('');
            setEmail('');
            setPassword('');
            setLastName('');
            setDocumentType('');
            setDocumentNumber('');
            setAddress('');
            setCreditLimit('');
            setRole('');
            alert("Usuario creado con exitosamente")
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className='container'>
            <h1>Crear Usuario</h1>
            <form onSubmit={handleSubmit} className='divForm'>
                <div className='formularios'>
                    <select id="role" value={id_role} onChange={(e) => setRole(e.target.value)}>
                        <option value="" disabled>Seleccione un rol</option>
                        {roles.map(role => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                    </select>
                    <select id="documentType" value={document_type} onChange={(e) => setDocumentType(e.target.value)}>
                        <option value="" disabled>Seleccione un tipo de documento</option>
                        {documentTypes.map(type => (
                            <option key={type.id} value={type.id}>{type.type}</option>
                        ))}
                    </select>

                    <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder='Apellido' value={last_name} onChange={(e) => setLastName(e.target.value)} />
                    <input type="text" placeholder='Número de documento' value={document_number} onChange={(e) => setDocumentNumber(e.target.value)} />
                    <input type="text" placeholder='Dirección' value={address} onChange={(e) => setAddress(e.target.value)} />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="text" placeholder='Límite de crédito' value={creditLimit} onChange={(e) => setCreditLimit(e.target.value)} />
                </div>
                <button type="submit">Crear Usuario</button>
            </form>
        </div>
    );
}

export default CreateUser;
