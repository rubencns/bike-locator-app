import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import BikeIcon from '../../assets/svg/bicycle-solid.svg';
import 'leaflet/dist/leaflet.css';
import './map-style.scss';
import { useEffect } from 'react';
import {
  hideDetails,
  useMapContext,
} from '../../context/map-context/map-context';

interface MapProps {
  networkDetails: any;
  networkStation: any;
  setNetworkStation: any;
}

const LATLNG_ES: [number, number] = [40.463667, -3.74922];

const Map: React.FC<MapProps> = ({
  networkDetails,
  networkStation,
  setNetworkStation,
}) => {
  const { state, dispatch } = useMapContext();

  const MapComponent: React.FC<{
    center: any;
    zoom: any;
  }> = ({ center, zoom }) => {
    const map = useMap();
    map.flyTo(center, zoom);
    return null;
  };

  const markerIcon = new Icon({
    iconUrl: BikeIcon,
    iconRetinaUrl: BikeIcon,
    popupAnchor: [2, -20],
    iconSize: [24, 24],
    className: 'map-marker-icon',
  });

  const centerPosition = () => {
    if (!!Object.keys(networkDetails).length) {
      if (!!Object.keys(networkStation).length) {
        return [networkStation.latitude, networkStation.longitude];
      }
      return [
        networkDetails.location.latitude,
        networkDetails.location.longitude,
      ];
    }
    return LATLNG_ES;
  };

  const zoomPosition = () => {
    if (!!Object.keys(networkDetails).length) {
      if (Object.keys(networkStation).length) return 14;
      return 15;
    }
    return 6;
  };

  const openPopup = (station: {}) => {
    setNetworkStation({ ...station });
    dispatch(hideDetails(false));
  };

  const handleHideDetails = () => {
    dispatch(hideDetails(!state.hideDetails));
  };

  useEffect(() => {
    /* console.log(networkStation);
    if (Object.keys(networkStation).length !== 0) setDetailsVisible(false); */
  }, [networkStation]);

  return (
    <div className="map-wrapper">
      <MapContainer
        className="map"
        center={
          !!Object.keys(networkDetails).length
            ? [
                networkDetails.location.latitude,
                networkDetails.location.longitude,
              ]
            : LATLNG_ES
        }
        zoom={Object.keys(networkDetails).length ? 15 : 6}
        scrollWheelZoom={false}
      >
        <MapComponent center={centerPosition()} zoom={zoomPosition()} />
        {!!Object.keys(networkDetails).length &&
          networkDetails.stations.map((station: any) => (
            <Marker
              key={station.id}
              position={[station.latitude, station.longitude]}
              icon={markerIcon}
            >
              <Popup onOpen={() => openPopup(station)}>{station.name}</Popup>
            </Marker>
          ))}

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png"
        />
        {/*  <TileLayer
          attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}{r}.png"
        /> */}
      </MapContainer>

      <div className={`map-details${state.hideDetails ? ' hide' : ''}`}>
        <button className="map-details-button" onClick={handleHideDetails}>
          <p className={state.hideDetails ? 'inverted' : ''}>v</p>
        </button>
        <div className="map-details-container">
          {!!Object.keys(networkDetails).length ? (
            !!Object.keys(networkStation).length ? (
              <>
                <div className="map-details-container__heading">
                  <h3>{networkStation.name}</h3>
                </div>
                <p>Empty slots: {networkStation.empty_slots}</p>
                <p>Free bikes: {networkStation.free_bikes}</p>
              </>
            ) : (
              !state.hideDetails && (
                <p>No station selected. Please, choose one.</p>
              )
            )
          ) : (
            !state.hideDetails && <p>No city selected. Please, choose one.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;
