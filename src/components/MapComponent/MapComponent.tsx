import { useEffect, useState, useCallback } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { RoutesResponse, routesColors } from '../../pages/Map/components/RoutesSelection/RoutesSelection'
import axios from 'axios'
import { getCitySuburb } from '../../utils/requests/dashboard'

export type MapComponentProps = {
    routes?: RoutesResponse[],
    onCenterMapChange?: (lat: number, lng: number) => void
    onRadiusChange?: (radius: number) => void
    queryLocalSearch?: string
}

export function MapComponent(props: MapComponentProps) {
    const { routes, onCenterMapChange, onRadiusChange, queryLocalSearch } = props
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [heatmap, setHeatmap] = useState<google.maps.visualization.HeatmapLayer | null>(null)
    const [polyline, setPolyline] = useState<google.maps.Polyline[] | null>(null)
    const [data, setData] = useState<google.maps.LatLng[]>([])
    const [placesService, setPlacesService] = useState<google.maps.places.PlacesService>()


    const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['visualization', 'places', 'marker'],
    })


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const debounce = (func: (...args: any[]) => void, wait: number) => {
        let timeout: NodeJS.Timeout
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return function executedFunction(...args: any[]) {
            const later = () => {
                clearTimeout(timeout)
                func(...args)
            }
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
        }
    }


    const debouncedLoadData = useCallback(debounce((lat, lng, zoom) => {
        loadData(lat, lng, zoom).then(newData => setData(newData))
    }, 500), [])

    useEffect(() => {
        loader.load().then(() => {
            const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
                center: { lat: -23.5581213, lng: -46.661614 },
                zoom: 16,
                maxZoom: 16 + 3,
                minZoom: 7,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                zoomControl: true,
                scaleControl: false,
            })



            map.addListener('center_changed', () => {
                const center = map.getCenter()
                const zoom = map.getZoom()

                if (center && zoom) {

                    debouncedLoadData(center.lat(), center.lng(), zoom)
                }
            })
            map.addListener('zoom_changed', () => {
                const center = map.getCenter()
                const zoom = map.getZoom()

                if (center && zoom) {

                    debouncedLoadData(center.lat(), center.lng(), zoom)
                }
            })
            const placesService = new google.maps.places.PlacesService(map)
            setPlacesService(placesService)



            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {

                    onCenterMapChange && onCenterMapChange(position.coords.latitude, position.coords.latitude)

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
                    const { encoding } = await google.maps.importLibrary('geometry') as google.maps.GeometryLibrary
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

    useEffect(() => {
        searchPlace(queryLocalSearch || '')
    }, [queryLocalSearch])


    const loadRadius = (zoom?: number) => {
        let radius = 5.0
        if (zoom && zoom <= 13) {
            return radius
        }
        else if (zoom && zoom <= 15) {
            radius = 2.5
        } else if (zoom && zoom <= 17) {
            radius = 1.25
        } else {
            radius = 0.575
        }
        return radius

    }

    const loadData = async (lat: number, lng: number, zoom: number) => {
        const baseUrl = import.meta.env.VITE_BASE_URL
        const radius = loadRadius(zoom)
        const response = await axios.get(`${baseUrl}/consultar/local/${lat}/${lng}?raio=${radius}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })

        onRadiusChange && onRadiusChange(radius)

        onCenterMapChange && onCenterMapChange(lat, lng)

        if (response.status !== 200) {
            return Promise.reject('Erro ao consultar local')
        }

        return response.data.coordenadasOcorrencias.map((item: [number, number]) => {
            const [long, lat] = item

            return new google.maps.LatLng(lat, long)
        })
    }


    const searchPlace = (query: string) => {

        if (query === '') {
            console.log('vazio')
        } else {

            const request = {
                query: query,
                fields: ['geometry'],
            }

            placesService?.findPlaceFromQuery(request, (response) => {

                if (response) {
                    const itemResponse = response[0]

                    if (itemResponse.geometry?.location) {
                        const coordenate = new google.maps.LatLng(itemResponse.geometry?.location?.lat(), itemResponse.geometry?.location?.lng())
                        map?.setCenter(coordenate)
                        const marker = new google.maps.Marker({
                            position: coordenate,
                            title: query,
                        })
                        marker.setMap(map)
                    } else {
                        return
                    }


                }


            })
        }




    }
    return <div id='map' style={{ width: '100%', height: '100%' }} />
}
