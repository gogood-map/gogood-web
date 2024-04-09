import { useEffect, useState } from 'react';
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

    useEffect(() => {
        loader.load().then(() => {
            const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
                center: { lat: -23.7128, lng: -47.006 },
                zoom: 8,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
            });
            setMap(map);
        });
    }, []);

    useEffect(() => {
        if (map) {
            lazyLoadData();
        }
    }, [map]);

    useEffect(() => {
        if (map && data.length) {
            if (heatmap) {
                heatmap.setMap(null); // Remove the existing heatmap
            }
            const newHeatmap = new google.maps.visualization.HeatmapLayer({
                data,
                map,
                maxIntensity: 7,
            });
            setHeatmap(newHeatmap);
        }
    }, [data, map]);

    const lazyLoadData = async () => {
        const batches = 9; // Total requests divided by 5 (rounded up if not a whole number)
        for (let batch = 0; batch < batches; batch++) {
            const promises = [];
            for (let i = 1 + batch * 5; i <= Math.min((batch + 1) * 5, 45); i++) {
                promises.push(loadData(i));
            }
            const results = await Promise.all(promises);
            const newData = results.flat();
            setData((prevData) => [...prevData, ...newData]);
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait a bit before loading the next batch (optional)
        }
    };

    const loadData = async (i: number) => {
        try {
            const response = await fetch(`http://52.226.122.160:8080/consultar/parte:lista${i}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            return json.mapData.map((item) => new google.maps.LatLng(item.latitude, item.longitude));
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    return <div id="map" style={{ width: '100%', height: '100%' }}></div>;
}
