import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// eslint-disable-next-line react/prop-types
const ActivityByUserChart = ({ data }) => {
    // eslint-disable-next-line react/prop-types
    const userActivities = data.reduce((acc, event) => {
        acc[event.user_id] = (acc[event.user_id] || 0) + 1;
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(userActivities).map(userId => `User ${userId}`),
        datasets: [
            {
                label: 'Number of Activities',
                data: Object.values(userActivities),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h2>Audit Activities by User</h2>
            <Bar data={chartData} />
        </div>
    );
};

export default ActivityByUserChart;
