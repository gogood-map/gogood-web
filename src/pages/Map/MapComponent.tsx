import { useEffect, useRef, useState } from "react"
import { Status, Wrapper } from '@googlemaps/react-wrapper'

export function MapComponent() {
    const [map, setMap] = useState<google.maps.Map>()
    
    const ref = useRef<HTMLDivElement>()

    const render = (status: Status) => (
        <h1>
            {status === Status.LOADING ? 'Loading...' : 'Loaded!'}
        </h1>
    )

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 10,
                mapTypeControl: false
            }))
        }
    }, [map])

    return (
        <Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string} render={render}>
            <div ref={ref as any}
                style={{
                    height: '100%',
                    width: '100%'
                }}
            />
        </Wrapper>
    )
}

