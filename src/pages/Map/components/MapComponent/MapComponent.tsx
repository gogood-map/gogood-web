import { useEffect, useState, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export function MapComponent() {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [heatmap, setHeatmap] = useState<google.maps.visualization.HeatmapLayer | null>(null);
    const [data, setData] = useState<google.maps.LatLng[]>([]);
    const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['visualization'],
    });

    // Função de debounce
    const debounce = (func: (...args: any[]) => void, wait: number) => {
        let timeout: NodeJS.Timeout;
        return function executedFunction(...args: any[]) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };


    const debouncedLoadData = useCallback(debounce((lat, lng) => {
        loadData(lat, lng).then(newData => setData(newData));
    }, 500), []);

    useEffect(() => {
        loader.load().then(() => {
            const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
                center: { lat: -23.5581213, lng: -46.661614 },
                zoom: 15,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
            });

            map.addListener('center_changed', () => {
                const center = map.getCenter();
                if (center) {
                    debouncedLoadData(center.lat(), center.lng());
                }
            });

            setMap(map);
        });
    }, []);

    useEffect(() => {
        if (map && data.length) {
            if (heatmap) {
                heatmap.setMap(null);
            }
            const newHeatmap = new google.maps.visualization.HeatmapLayer({
                data,
                map,
                maxIntensity: 7,
            });
            setHeatmap(newHeatmap);
        }
    }, [data, map]);

    const loadData = async (lat: number, lng: number) => {
        try {
            const response = await fetch(`http://52.226.122.160:8080/consultar/local/${lat}/${lng}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            return json.mapData.map((item: { latitude: number; longitude: number; }) => new google.maps.LatLng(item.latitude, item.longitude));
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    return <div id="map" style={{ width: '100%', height: '100%' }}></div>;
}