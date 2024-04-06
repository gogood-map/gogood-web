import { designTokens } from 'design-tokens'
import { useEffect, useState } from 'react'

export function MapComponent() {
    const [map, setMap] = useState<google.maps.Map | undefined>()
    const [heatmap, setHeatmap] = useState<google.maps.visualization.HeatmapLayer>()
    const [todosPoints, setTodosPoints] = useState<google.maps.LatLng[]>([])
    const [_latCache, _setLatCache] = useState<number | null>(null)
    const [_lonCache, _setLonCache] = useState<number | null>(null)

    useEffect(() => {
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=visualization&v=weekly`
        script.async = true
        script.defer = true
        script.onload = initMap
        document.head.appendChild(script)

        return () => {
            document.head.removeChild(script)
        }
    }, [])

    const initMap = () => {
        const mapElement = document.getElementById('map') as HTMLElement
        const mapInstance = new google.maps.Map(mapElement, {
            zoom: 8,
            center: { lat: -23.5325011, lng: -46.4013353 },
            mapTypeId: 'roadmap',
            mapTypeControl: false,
        })

        setMap(mapInstance)

        document.getElementById('toggle-heatmap')?.addEventListener('click', toggleHeatmap)
        document.getElementById('change-gradient')?.addEventListener('click', changeGradient)
        document.getElementById('change-opacity')?.addEventListener('click', changeOpacity)
        document.getElementById('change-radius')?.addEventListener('click', changeRadius)

        const lat = mapInstance?.getCenter()?.lat()
        const lon = mapInstance?.getCenter()?.lng()
        if (lat !== undefined && lon !== undefined) {
            lazyLoad(lat, lon)
        }
    }

    const lazyLoad = async (lat: number, lon: number) => {
        const promises = []
        for (let i = 1; i <= 45; i++) {
            promises.push(trazerDados(i, lat, lon))
        }

        await Promise.all(promises)
    }

    const trazerDados = async (i: number, _lat: number, _lon: number) => {
        try {
            const response = await fetch(`http://localhost:8080/consultar/parte:lista${i}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                throw new Error(`Erro ao trazer dados: ${response.status}`)
            }

            const data = await response.json()
            const points = data.mapData.map((obj: { latitude: number, longitude: number }) => new google.maps.LatLng(obj.latitude, obj.longitude))
            setTodosPoints([...todosPoints, ...points])
            addHeatmapLayer(points)
        } catch (error) {
            console.error('Erro ao trazer dados:', error)
        }
    }

    const addHeatmapLayer = (points: google.maps.LatLng[]) => {
        if (heatmap) {
            heatmap.setData(todosPoints)
        } else {
            const heatmapInstance = new google.maps.visualization.HeatmapLayer({
                data: points,
                maxIntensity: 5,
                map,
            })
            setHeatmap(heatmapInstance)
        }
    }

    const toggleHeatmap = () => {
        heatmap?.setMap(heatmap?.getMap() ? null : map || null)
    }

    const changeGradient = () => {
        const gradient = [
            'rgba(0, 255, 255, 0)',
            'rgba(0, 255, 255, 1)',
            'rgba(0, 191, 255, 1)',
            'rgba(0, 127, 255, 1)',
            'rgba(0, 63, 255, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(0, 0, 223, 1)',
            'rgba(0, 0, 191, 1)',
            'rgba(0, 0, 159, 1)',
            'rgba(0, 0, 127, 1)',
            'rgba(63, 0, 91, 1)',
            'rgba(127, 0, 63, 1)',
            'rgba(191, 0, 31, 1)',
            'rgba(255, 0, 0, 1)',
        ]

        heatmap?.set('gradient', heatmap?.get('gradient') ? null : gradient)
    }

    const changeRadius = () => {
        heatmap?.set('radius', heatmap?.get('radius') ? null : 60)
    }

    const changeOpacity = () => {
        heatmap?.set('opacity', heatmap?.get('opacity') ? null : 1)
    }

    const buttonStyle = {
        margin: designTokens.spacing.tiny,
        padding: designTokens.spacing.tiny,
        backgroundColor: designTokens.color.background,
        borderRadius: designTokens.borderRadius.small,
        border: '1px solid #999',
        cursor: 'pointer',
    } as React.CSSProperties

    return (
        <>
            <div id="floating-panel" style={{
                position: 'absolute',
                top: '10px',
                left: '25%',
                zIndex: 1,
                backgroundColor: designTokens.color.white,
                borderRadius: designTokens.borderRadius.small
            }}>
                <button id="toggle-heatmap" style={buttonStyle}>Toggle Heatmap</button>
                <button id="change-gradient" style={buttonStyle}>Change gradient</button>
                <button id="change-radius" style={buttonStyle}>Change radius</button>
                <button id="change-opacity" style={buttonStyle}>Change opacity</button>
            </div>
            <div id="map" style={{ width: '100%', height: '100%' }}></div>
        </>
    )
}
