import React, { useEffect, useState } from 'react';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMapEvent, useMapEvents } from '@monsonjeremy/react-leaflet';
import icon from '../../assets/pin.svg';
import { useApplicationStore } from '../../global-stores/useApplicationStore';
import useLocalStorage from '../../hooks/useLocalStorage';

const marker = new L.Icon({
  iconUrl: icon,
  popupAnchor: [0, 0],
  iconRetinaUrl: icon,
  iconSize: [15, 15],
});

const MapInteraction = ({ callback }: { callback: Function }) => {
  const setGeolocation = useApplicationStore((state: any) => state.setGeolocation);
  const [storageGeolocation, setStorageGeolocation] = useLocalStorage('geolocation', null);

  useMapEvent('click', (e) => {
    callback(e.latlng)
    setGeolocation({
      latitude: e.latlng.wrap().lat,
      longitude: e.latlng.wrap().lng,
    });
    setStorageGeolocation({
      latitude: e.latlng.wrap().lat,
      longitude: e.latlng.wrap().lng,
    })
  })

  return null;
}

export const LocationModal: React.FC = () => {
  const geolocation = useApplicationStore(state => state.geolocation);
  const [position, setPosition] = useState<L.LatLngTuple>([0, 0]);

  useEffect(() => {
    setPosition([geolocation.latitude, geolocation.longitude]);
  }, [geolocation]);


  return (
    <>
      <div className="-mx-10 mt-7">
        <MapContainer
          center={[50, 0]}
          zoom={4}
          scrollWheelZoom={true}
          style={{ height: '370px', backgroundColor: '#262626' }}
          maxZoom={15}
          minZoom={2}
          zoomControl={false}
          attributionControl={false}
        >
          <MapInteraction callback={setPosition}/>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          />
          <Marker position={position} icon={marker} draggable={true}/>
        </MapContainer>
      </div>
      <div className="mt-7">
        <span className="text-sm">Current Location Information</span>
        <div className="mt-4 flex">
          <div className="w-1/3">
            <span className="text-sm">Latitude</span>
            <p className="text-sm text-gray">{position[0]}°</p>
          </div>
          <div className="w-1/3">
            <span className="text-sm">Latitude</span>
            <p className="text-sm text-gray">{position[1]}°</p>
          </div>
          <div className="w-1/3">
            <span className="text-sm">Altitude</span>
            <p className="text-sm text-gray">0m</p>
          </div>
        </div>
      </div>
    </>
  )
}
