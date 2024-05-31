import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { designTokens } from 'design-tokens';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface DashboardProps {
    title?: string;
    subtitle?: string;
}



const Dashboard: React.FC<DashboardProps> = ({ title, subtitle }) => {
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    useEffect(() => {
        // Verifica se o navegador suporta a API de Geolocalização
        if ('geolocation' in navigator) {
            // Obtém a localização do usuário
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const locationData = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    setUserLocation(locationData);
                    // Armazenar a localização no localStorage
                    localStorage.setItem('userLocation', JSON.stringify(locationData));
                },
                (error) => {
                    console.error('Erro ao obter a localização:', error.message);
                }
            );
        } else {
            console.error('Geolocalização não é suportada pelo navegador.');
        }
    }, []);


    const data = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
            {
                label: 'Escala de crimes',
                data: [5, 10, 15, 20, 25, 30, 16, 14, 20, 18, 22, 25],
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
