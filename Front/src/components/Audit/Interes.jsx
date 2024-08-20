import { useState, } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const processData = (data) => {
    const yearData = data.reduce((acc, credit) => {
        const year = new Date(credit.start_date).getFullYear();
        const month = new Date(credit.start_date).getMonth() + 1; // Meses 1-12
        const day = new Date(credit.start_date).getDate();

        if (!acc[year]) acc[year] = {};
        if (!acc[year][month]) acc[year][month] = {};
        if (!acc[year][month][day]) acc[year][month][day] = { totalInterest: 0, count: 0 };

        acc[year][month][day].totalInterest += parseFloat(credit.interest_rate);
        acc[year][month][day].count += 1;

        return acc;
    }, {});

    return yearData;
};


// eslint-disable-next-line react/prop-types
const InterestRatesChart = ({ data }) => {
    const yearData = processData(data);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);

    const years = Object.keys(yearData);
    const months = selectedYear ? Object.keys(yearData[selectedYear]) : [];
    const days = selectedYear && selectedMonth ? Object.keys(yearData[selectedYear][selectedMonth]) : [];

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
        setSelectedMonth(null);
        setSelectedDay(null);
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
        setSelectedDay(null);
    };

    const getChartData = () => {
        let chartData = [];
        if (selectedYear) {
            if (selectedMonth) {
                if (selectedDay) {
                    chartData = [yearData[selectedYear][selectedMonth][selectedDay].totalInterest / yearData[selectedYear][selectedMonth][selectedDay].count];
                } else {
                    chartData = Object.values(yearData[selectedYear][selectedMonth]).map(item => item.totalInterest / item.count);
                }
            } else {
                chartData = Object.values(yearData[selectedYear]).flatMap(month =>
                    Object.values(month).map(item => item.totalInterest / item.count)
                );
            }
        }

        return {
            labels: selectedDay
                ? [`Day ${selectedDay}`]
                : selectedMonth
                    ? Array.from({ length: days.length }, (_, i) => `Día ${i + 1}`)
                    : selectedYear
                        ? Array.from({ length: months.length }, (_, i) => `Mes ${i + 1}`)
                        : Array.from({ length: years.length }, (_, i) => `Año ${i + 1}`),
            datasets: [{
                label: 'Promedio tasas de interés',
                data: chartData,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            }],
        };
    };

    return (
        <div className='promTasasContainer'>
            <h2>Pomedio tasas de intereses</h2>
            <div>
                <label htmlFor="year">Año:</label>
                <select id="year" onChange={handleYearChange} value={selectedYear || ''}>
                    <option value="">Seleccione Año</option>
                    {years.map(year => <option key={year} value={year}>{year}</option>)}
                </select>
            </div>

            {selectedYear && (
                <div>
                    <label htmlFor="month">Mes:</label>
                    <select id="month" onChange={handleMonthChange} value={selectedMonth || ''}>
                        <option value="">Selecione mes</option>
                        {months.map(month => <option key={month} value={month}>{month}</option>)}
                    </select>
                </div>
            )}

            <Bar data={getChartData()} options={{ responsive: true }} />
        </div>
    );
};

export default InterestRatesChart;
