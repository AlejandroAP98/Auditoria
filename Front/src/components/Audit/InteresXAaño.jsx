
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// eslint-disable-next-line react/prop-types
const InterestRatesByYearChart = ({ data }) => {
    // Agrupar datos por año y calcular la tasa de interés promedio
    // eslint-disable-next-line react/prop-types
    const yearInterestRates = data.reduce((acc, credit) => {
        const year = new Date(credit.start_date).getFullYear();
        if (!acc[year]) {
            acc[year] = { totalInterest: 0, count: 0 };
        }
        // Verifica que `credit.interest_rate` es un número
        if (!isNaN(credit.interest_rate)) {
            acc[year].totalInterest += parseFloat(credit.interest_rate);
            acc[year].count += 1;
        }
        return acc;
    }, {});
    

    // Convertir el objeto en arrays para Chart.js
    const labels = Object.keys(yearInterestRates);
    const interestRates = labels.map(year => yearInterestRates[year].totalInterest / yearInterestRates[year].count);
    
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Average Interest Rate',
                data: interestRates,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,

            },
        ],
    };
    return (
        <div>
            <h2>Average Interest Rates by Year</h2>
            <Bar data={chartData} />
        </div>
    );
};

export default InterestRatesByYearChart;
