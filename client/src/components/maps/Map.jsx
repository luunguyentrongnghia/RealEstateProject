import React, { useEffect, useState } from 'react'
import { apiGetLongtitudeAndLatitudeFromAddress } from '~/apis/beyound'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

const map = ({ address = '', zoom = 12 }) => {
    const [center, setCenter] = useState([])
    useEffect(() => {
        const fetchCenter = async () => {

            const response = await apiGetLongtitudeAndLatitudeFromAddress(address)
            if (response.status === 200 && response.data.features.length > 0) {
                setCenter([
                    response.data.features[0]?.geometry?.coordinates[1],
                    response.data.features[0]?.geometry?.coordinates[0],

                ])
            } else {
                window.navigator.geolocation.getCurrentPosition((position) => {
                    setCenter([
                        position.coords.latitude,
                        position.coords.longitude
                    ])
                })
            }
        }
        if (address) {
            fetchCenter()
        } else {
            window.navigator.geolocation.getCurrentPosition((position) => {
                setCenter([
                    position.coords.latitude,
                    position.coords.longitude
                ])
            })
        }
    }, [address])
    return (
        <div className='w-full h-[300px]'>
            {
                center && center.length > 0 &&
                <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className='w-full h-[300px]'>
                    <TileLayer
                        attribution={attribution}
                        url={url}
                    />
                    <Marker position={center}>
                        <Popup>
                            {address}
                        </Popup>
                    </Marker>
                </MapContainer>
            }
        </div>
    )
}

export default map