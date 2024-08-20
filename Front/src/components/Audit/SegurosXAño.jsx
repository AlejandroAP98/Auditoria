import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LifeInsuranceChart = () => {
    const [chartData, setChartData] = useState(null); 

    useEffect(() => {
        const fetchLifeInsurances = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/lifeInsurances');
                const data = await response.json();

                if (!data || data.length === 0) {
                    setChartData({}); 
                    return;
                }

                // Agrupar por rango de fechas
                const dateRanges = data.reduce((acc, insurance) => {
                    const startYear = new Date(insurance.start_date).getFullYear();
                    const endYear = new Date(insurance.date_expire).getFullYear();

                    for (let year = startYear; year <= endYear; year++) {
                        if (!acc[year]) acc[year] = 0;
                        acc[year] += 1;
                    }
                    return acc;
                }, {});

                // Configurar los datos para la gráfica
                const labels = Object.keys(dateRanges);
                const counts = labels.map(year => dateRanges[year]);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Cantidad de Seguros de Vida',
                            data: counts,
                            backgroundColor: 'rgba(255, 255, 255, 0.4)',
                            borderColor: 'rgba(200, 5, 50, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching life insurances:', error);
                setChartData({}); 
            }
        };

        fetchLifeInsurances();
    }, []);

    return (
        <div>
            <h2>Seguros de Vida por Año</h2>
            {chartData ? (
                <Bar data={chartData} options={{ responsive: true }} />
            ) : (
                <p>Cargando datos...</p>
            )}
        </div>
    );
};

export default LifeInsuranceChart;
