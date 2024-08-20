import { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import BarChart from './BarChart.jsx'; 
import InterestRatesChart from './Interes.jsx';
import DashboardStats from './DashboardStats.jsx';
import './Audit.css' 

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [lifeInsurances, setLifeInsurances] = useState([]);
    const [credits, setCredits]=useState([]);   
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const creditsResponse = await fetch('http://127.0.0.1:8000/api/credits');
                if (!creditsResponse.ok) throw new Error('Failed to fetch credits');
                const creditsData = await creditsResponse.json();
                setCredits(creditsData);

                const userResponse = await fetch('http://127.0.0.1:8000/api/users');
                if (!userResponse.ok) throw new Error('Failed to fetch users');
                const userData = await userResponse.json();
                setUsers(userData);

                // const lifeInsurancesResponse = await fetch('/api/lifeInsurances');
                // if (!lifeInsurancesResponse.ok) throw new Error('Failed to fetch life insurances');
                // const lifeInsurancesData = await lifeInsurancesResponse.json();
                // setLifeInsurances(lifeInsurancesData);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchData();
    }, []);

    const fetchData = async (tableName, setData, fileName) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/${tableName}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setData(data);
            downloadCSV(data, fileName)
        } catch (error) {
            setError(error.message);
        }
    };

    const generateCSV = (data) => {
        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => headers.map(header => row[header]).join(','))
        ].join('\n');

        return new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    };

    const downloadCSV = (data, fileName) => {
        const csvBlob = generateCSV(data);
        saveAs(csvBlob, `${fileName}.csv`);
    };

    

    return (
        <div className='containerDashboard'>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <div className='content'>
                <div className='graficas'>
                <DashboardStats/>
                <BarChart creditData={credits} userData={users} />
                {credits.length > 0 && <InterestRatesChart data={credits}/>}
                
                </div>
                <div className='descargas'>
                    <h2>Descargar datos</h2>
                    <div className='columns-tabs'>
                        <button  className='buttonAudit' onClick={() => fetchData('users', setUsers, 'users')}>Usuarios</button>
                        <button className='buttonAudit' onClick={() => fetchData('lifeInsurances', setLifeInsurances, 'life_insurance')}>Seguros de vida</button>
                        <button className='buttonAudit' onClick={() => fetchData('credits', setCredits, 'credits')}>Créditos</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
