import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { designTokens } from 'design-tokens';
import axios from 'axios';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface DashboardProps {
    title?: string;
    subtitle?: string;
}

interface LocationData {
    suburb: string;
    city: string;
    city_district?: string; // Agora city_district é opcional
}

const Dashboard: React.FC<DashboardProps> = ({ title, subtitle }) => {
    const [locationData, setLocationData] = useState<{ suburb: string, city: string } | null>(null);
    const [months, setMonths] = useState<string[]>([]);
    const [qtyOccurrence, setQtyOccurrence] = useState<number[]>([]);

    useEffect(() => {
        const fetchLocationData = async (latitude: number, longitude: number) => {
            try {
                const response = await axios.get(`https://nominatim.openstreetmap.org/reverse.php?lat=${latitude}&lon=${longitude}&zoom=18&format=jsonv2`);
                const data = await response.data;
                console.log('Dados de localização completos:', data);

                // Extrair o nome do bairro (suburb)
                const suburb = data.address.village || data.address.suburb || 'Desconhecido';
                console.log('Subúrbio:', suburb);

                // Extrair o nome da cidade (city)
                const city = data.address.city || 'Desconhecido';
                console.log('Cidade:', city);

                const locationInfo = {
                    suburb,
                    city
                };
                setLocationData(locationInfo);
                sessionStorage.setItem('locationData', JSON.stringify(locationInfo));


            } catch (error) {
                console.error('Erro ao obter dados de localização:', error);
            }
        };


        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchLocationData(latitude, longitude);
                },
                (error) => {
                    console.error('Erro ao obter a localização:', error.message);
                }
            );
        } else {
            console.error('Geolocalização não é suportada pelo navegador.');
        }
    }, []);

    useEffect(() => {
        const locationData = sessionStorage.getItem('locationData');
        const parsedLocationData = locationData ? JSON.parse(locationData) : null;
        const baseURL = import.meta.env.VITE_BASE_URL;

        if (locationData) {
            axios.get(`${baseURL}/ocorrencias/regiao?cidade=${parsedLocationData.city}&bairro=${parsedLocationData.suburb}`)
            .then((response) => {
                setMonths([]);
                setQtyOccurrence([]);

                response.data.forEach((item: any) => {
                    const anomes = item.anoMes // 2021-01
                    const mes = Number(anomes.split('-')[1]); // 01
                    const qtd = Number(item.count); // 5

                    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

                    setMonths((months) => [...months, meses[mes - 1]]);
                    setQtyOccurrence((qtyOccurrence) => [...qtyOccurrence, qtd]);
                })

                console.log('Meses:', months);
                console.log('Quantidade de ocorrências:', qtyOccurrence);
            }).catch((error) => {
                console.error('Erro ao obter dados de ocorrências:', error);
            });
        }
    }, [locationData]);

    const data = {
        labels: months,
        datasets: [
            {
                label: 'Escala de crimes',
                data: qtyOccurrence,
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: '#14C38E',
                borderWidth: 3,
                tension: 0.4,
                pointBackgroundColor: '#14C38E',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: 'rgba(255, 255, 255, 0.8)',
                pointHoverBorderColor: '#14C38E',
                pointHoverRadius: 10,
                pointRadius: 6.5,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return ` ${context.parsed.y}`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 30,
                grid: {
                    color: '#E1E3E8',
                },
            },
            x: {
                grid: {
                    color: '#E1E3E8',
                },
            },
        },
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            margin: designTokens.spacing.large,
            padding: '32px',
            backgroundColor: '#fff',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
        }}>
            <div style={{
                color: "#334049",
                width: '100%',
                fontFamily: designTokens.font.family,
                fontSize: designTokens.font.size.large,
                fontWeight: designTokens.font.weight.medium,
                marginBottom: designTokens.spacing.small,
                marginTop: designTokens.spacing.medium,
                marginLeft: designTokens.spacing.large,
            }}>
                {title}
            </div>
            <div style={{
                color: "#334049",
                width: '100%',
                fontFamily: designTokens.font.family,
                fontSize: designTokens.font.size.extraLarge,
                fontWeight: designTokens.font.weight.bold,
                marginBottom: designTokens.spacing.large,
                marginLeft: designTokens.spacing.large,
            }}>
                {subtitle}
            </div>
            <div style={{ height: '400px', width: '90%' }}>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default Dashboard;
