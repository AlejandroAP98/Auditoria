import  { useState, } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import PropTypes from 'prop-types';
import UserSelector from './UserSelect';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ creditData, userData }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);

    const filteredCreditData = creditData.filter(credit =>
        selectedUsers.length === 0 || selectedUsers.includes(credit.user_id.toString())
    );

    const chartData = {
        labels: filteredCreditData.map(item => `${item.status}`),
        datasets: [
            {
                label: 'Monto de Créditos',
                data: filteredCreditData.map(item => item.amount),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h2>Créditos por usuario</h2>
            <UserSelector
                users={userData}
                selectedUsers={selectedUsers}
                onSelect={setSelectedUsers}
                
            />
            <Bar data={chartData} options={{ responsive: true }} />
        </div>
    );
};

BarChart.propTypes = {
    creditData: PropTypes.array.isRequired,
    userData: PropTypes.array.isRequired,
};

export default BarChart;
