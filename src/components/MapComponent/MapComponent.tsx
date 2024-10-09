/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { RoutesResponse, routesColors } from '../../pages/Map/components/RoutesSelection/RoutesSelection'
import axios from 'axios'
import { getCitySuburb } from '../../utils/requests/dashboard'

export type MapComponentProps = {
    routes?: RoutesResponse[],
    onCenterMapChange: (lat: number, lng: number) => void
    onZoomChange: (zoom: number) => void
}

export function MapComponent(props: MapComponentProps) {
    const { routes, onCenterMapChange } = props
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [heatmap, setHeatmap] = useState<google.maps.visualization.HeatmapLayer | null>(null)
    const [polyline, setPolyline] = useState<google.maps.Polyline[] | null>(null)
    const [data, setData] = useState<google.maps.LatLng[]>([])
    const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['visualization'],
    })

    const debounce = (func: (...args: any[]) => void, wait: number) => {
        let timeout: NodeJS.Timeout
        return function executedFunction(...args: any[]) {
            const later = () => {
                clearTimeout(timeout)
                func(...args)
            }
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
        }
    }

    const debouncedLoadData = useCallback(debounce((lat, lng, radius) => {
        loadData(lat, lng, radius).then(newData => setData(newData))
    }, 500), [])

    useEffect(() => {
        loader.load().then(() => {

            const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
                center: { lat: -23.5581213, lng: -46.661614 },
                zoom: 16,
                maxZoom: 16 + 3,
                minZoom: 7,
                mapTypeControl: true,
                streetViewControl: false,
                fullscreenControl: true,
                zoomControl: true,
                scaleControl: true,
            })

            map.addListener('center_changed', () => {
                const center = map.getCenter()
                const radius = loadRadius(map.getZoom())

                console.log('listener center_changed: center - ', center, ', radius - ', radius)

                if (center && radius) {
                    debouncedLoadData(center.lat(), center.lng(), radius)
                }
            })

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {

                    onCenterMapChange(position.coords.latitude, position.coords.latitude)

                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                    getCitySuburb(pos.lat, pos.lng).then(({ data }) => {
                        if (data.address.country === 'Brasil') {
                            map.setCenter(pos)
                        }
                    })
                }, () => {
                    map.setCenter({ lat: -23.5581213, lng: -46.661614 })
                })
            } else {
                map.setCenter({ lat: -23.5581213, lng: -46.661614 })
            }

            setMap(map)
        })
    }, [])


    useEffect(() => {

        if (map && data.length) {
            if (heatmap) {
                heatmap.setMap(null)
            }
            const newHeatmap = new google.maps.visualization.HeatmapLayer({
                data,
                map,
                maxIntensity: 7,
                gradient: [
                    'rgba(0,0,0,0)',
                    'yellow',
                    'rgba(255, 165, 0, 100)',
                    'rgba(255, 165, 0, 100)',
                    'red'
                ]
            })
            setHeatmap(newHeatmap)
        }
    }, [data, map])

    useEffect(() => {
        if (polyline && polyline?.length > 0) {
            polyline.forEach(polyline => {
                polyline.setMap(null)
            })
        }
        if (routes) {
            const listaPolyline: google.maps.Polyline[] = []

            for (let i = routes.length - 1; i >= 0; i--) {
                createPolyline(routes[i], i)
            }

            async function createPolyline(route: RoutesResponse, index: number) {
                if (routes) {
                    const { encoding } = await google.maps.importLibrary("geometry") as google.maps.GeometryLibrary
                    const caminho = encoding.decodePath(route.polyline)
                    const polylineRota = new google.maps.Polyline({
                        path: caminho,
                        geodesic: true,
                        strokeColor: routesColors(routes)[index],
                        strokeOpacity: 1.0,
                        strokeWeight: 5,
                    })
                    listaPolyline.push(polylineRota)
                    polylineRota.setMap(map)
                    map?.setCenter(caminho[0])
                }
            }

            setPolyline(listaPolyline)
        }
    }, [routes])

    const loadRadius = (zoom?: number) => {
        let radius = 5

        if (zoom) {
            radius = 5 / Math.pow(2, zoom - 14);
        }

        return Math.min(radius, 10)
    }

    const loadData = async (lat: number, lng: number, radius: number) => {
        const baseUrl = import.meta.env.VITE_BASE_URL

        const response = await axios.get(`${baseUrl}/consultar/local/${lat}/${lng}?raio=${radius}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })

        if (response.status !== 200) {
            return Promise.reject('Erro ao consultar local')
        }

        return response.data.ocorrencias.map((item: { localizacao: { coordinates: [number, number] } }) => {
            const [long, lat] = item.localizacao.coordinates
            return new google.maps.LatLng(lat, long)
        })
    }

    return <div id="map" style={{ width: '100%', height: '100%' }} />
}
