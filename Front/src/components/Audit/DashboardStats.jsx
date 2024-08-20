import { useState, useEffect } from 'react';
import './Audit.css'

const DashboardStats = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalCredits: 0,
        sumCreditAmount: 0,
        totalInsurances: 0,
        sumInsuranceAmount: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await fetch('http://127.0.0.1:8000/api/users');
                const creditsResponse = await fetch('http://127.0.0.1:8000/api/credits');
                const insurancesResponse = await fetch('http://127.0.0.1:8000/api/lifeInsurances');

                const users = await usersResponse.json();
                const credits = await creditsResponse.json();
                const insurances = await insurancesResponse.json();

                setStats({
                    totalUsers: users.length,
                    totalCredits: credits.length,
                    sumCreditAmount: credits.reduce((sum, credit) => sum + parseFloat(credit.amount), 0),
                    totalInsurances: insurances.length,
                    sumInsuranceAmount: insurances.reduce((sum, insurance) => sum + parseFloat(insurance.amount), 0),
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='containerStats'>
            <div className='divStats'>
                <p className='titleWidget'>Cantidad de usuarios</p>
                <p className='widget'>{stats.totalUsers}</p>
            </div>
            <div className='divStats'>
                <p className='titleWidget'>Cantidad de créditos</p>
                <p className='widget'>{stats.totalCredits}</p>
            </div>
            <div className='divStats'>
                <p className='titleWidget'>Monto de créditos</p>
                <p className='widget'>${stats.sumCreditAmount.toFixed(2)}</p>
            </div>
            <div className='divStats'>
                <p className='titleWidget'>Cantidad de seguros de vida</p>
                <p className='widget'>{stats.totalInsurances}</p>
            </div>
            <div className='divStats'>
                <p className='titleWidget'>Monto seguros de vida</p>
                <p className='widget'>${stats.sumInsuranceAmount.toFixed(2)}</p>
            </div>
            
        </div>
    );
};

export default DashboardStats;
