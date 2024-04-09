import { useEffect, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import axios from 'axios'

export function MapComponent() {
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [heatmap, setHeatmap] = useState<google.maps.visualization.HeatmapLayer | null>(null)
    const [data, setData] = useState<google.maps.LatLng[]>([])
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

    
    const lazyLoadData = () => {
        for (let i = 1; i <= 45; i++) {
            loadData(i)
        }
    }
    
    type ResponseAxios = {
        id: string,
        mapData: {
            id: string,
            latitude: number,
            longitude: number,
        }[]
    }

    const loadData = async (i: number) => {
        axios.get(`http://localhost:8080/consultar/parte:lista${i}`)
            .then((response) => {
                const data = response.data as ResponseAxios
                const newData = data.mapData.map((item) => new google.maps.LatLng(item.latitude, item.longitude))
                setData((prevData) => [...prevData, ...newData])
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <div id="map" style={{ width: '100%', height: '100%' }}></div>
    )
}
