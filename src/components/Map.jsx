import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const Map = () => {
  return ( 
    <MapContainer center={[-0.789275, 113.921327]} zoom={6} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
    </MapContainer>
   );
}
 
export default Map;