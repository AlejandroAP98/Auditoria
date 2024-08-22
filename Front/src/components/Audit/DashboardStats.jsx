import { useState, useEffect } from 'react';
import './Audit.css';

const DashboardStats = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalCredits: 0,
        sumCreditAmount: 0,
        totalInsurances: 0,
        sumInsuranceAmount: 0,
    });
    const [interestRateThreshold, setInterestRateThreshold] = useState(''); 
    const [creditCountThreshold, setCreditCountThreshold] = useState(''); // Estado para el valor de n (número de créditos)
    const [filteredUsersByRate, setFilteredUsersByRate] = useState([]); 
    const [filteredUsersByCredits, setFilteredUsersByCredits] = useState([]); 

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

                
                if (interestRateThreshold) {
                    const filteredByRate = credits.filter(
                        (credit) => parseFloat(credit.interest_rate) > parseFloat(interestRateThreshold)
                    ).map(credit => users.find(user => user.id === credit.user_id));

                    setFilteredUsersByRate(filteredByRate);
                }

                
                if (creditCountThreshold) {
                    const userCreditCounts = users.map(user => ({
                        ...user,
                        creditCount: credits.filter(credit => credit.user_id === user.id).length,
                    }));

                    const filteredByCredits = userCreditCounts.filter(user => user.creditCount > parseInt(creditCountThreshold));
                    setFilteredUsersByCredits(filteredByCredits);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [interestRateThreshold, creditCountThreshold]); 

    // Formateo de montos en COP
    const formatCOP = (amount) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 2,
        }).format(amount);
    };

    return (
        <>
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
                <p className='widget'>{formatCOP(stats.sumCreditAmount)}</p>
            </div>
            <div className='divStats'>
                <p className='titleWidget'>Cantidad de seguros de vida</p>
                <p className='widget'>{stats.totalInsurances}</p>
            </div>
            <div className='divStats'>
                <p className='titleWidget'>Monto seguros de vida</p>
                <p className='widget'>{formatCOP(stats.sumInsuranceAmount)}</p>
            </div>
        </div>

        <div className='filtros'>
            <div className='filtrosTasa'>
                <p className='titleFiltros'>{filteredUsersByRate.length} créditos por tasa de interés mayor a:</p>
                <input
                    type='number'
                    value={interestRateThreshold}
                    onChange={(e) => setInterestRateThreshold(e.target.value)}
                    placeholder='Ingrese el valor'
                    className='inputFilteredUsersList'
                />
                {filteredUsersByRate.length > 0 ? (
                    <ul className='filteredUsersList'>
                        {filteredUsersByRate.map((user, index) => (
                            <a key={index}>{user.name} {user.last_name} {user.document_number}</a>
                        ))}
                    </ul>
                ) : (
                    <p className='titleFiltros'>No hay usuarios con una tasa mayor a {interestRateThreshold}%</p>
                )}    
                </div>
            <div className='filtrosTasa'>
                <p className='titleFiltros'>{filteredUsersByCredits.length} usuarios con más de {creditCountThreshold} créditos:</p>
                <input
                    type='number'
                    value={creditCountThreshold}
                    onChange={(e) => setCreditCountThreshold(e.target.value)}
                    placeholder='Ingrese el valor'
                    className='inputFilteredUsersList'
                />
                {filteredUsersByCredits.length > 0 ? (
                    <ul className='filteredUsersList'>
                        {filteredUsersByCredits.map((user, index) => (
                            <a key={index}>{user.name} {user.last_name} {user.document_number} - {user.creditCount} créditos</a>
                        ))}
                    </ul>
                ) : (
                    <p className='titleFiltros'>No hay usuarios con más de {creditCountThreshold} créditos</p>
                )}    
            </div>        
        </div>
        </>
    );
};

export default DashboardStats;
