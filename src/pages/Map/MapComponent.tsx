import { useEffect, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

export function MapComponent() {
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [heatmap, setHeatmap] = useState<google.maps.visualization.HeatmapLayer | null>(null)
    const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['visualization'],
    })

    useEffect(() => {
        loader.load().then(() => {
            const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
                center: { lat: -23.7128, lng: -47.006 },
                zoom: 8,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
            })
            setMap(map)
        })
    }, [])

    const [data, setData] = useState<google.maps.LatLng[]>([])

    useEffect(() => {
        lazyLoadData()
        if (map) {
            const heatmap = new google.maps.visualization.HeatmapLayer({
                data,
                map,
            })
            setHeatmap(heatmap)
        }
    }, [map, data])

    const lazyLoadData = async () => {
        const promises = []
        for (let i = 0; i < 45; i++) {
            promises.push(loadData(i))
        }
    }

    const loadData = async (i: number) => {
        try {
            const response = await fetch(`http://localhost:8080/consultar/parte:lista${i}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }) as Response & { json: () => Promise<google.maps.LatLng[]> }
            
            setData((prevData) => [...prevData, ...data])
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div id="map" style={{ width: '100%', height: '100%' }}></div>
    )
}
