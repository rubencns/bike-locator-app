import React, { Dispatch, useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Cities from '../../components/cities/cities';
import Stations from '../../components/stations/stations';
import {
  hideDetails,
  useMapContext,
} from '../../context/map-context/map-context';
import './sidebar-style.scss';

export interface SidebarProps {
  networks: any[];
  networkDetails: any;
  getNetworkDetails: (id: string) => void;
  setNetworkStation: Dispatch<any>;
  setNetworkDetails: Dispatch<any>;
}

const Sidebar: React.FC<SidebarProps> = ({
  networks,
  networkDetails,
  getNetworkDetails,
  setNetworkStation,
  setNetworkDetails,
}) => {
  const history = useHistory();
  const location = useLocation();
  const { dispatch } = useMapContext();
  const [inputSearch, setInputSearch] = useState<string>('');
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [filteredNetworks, setFilteredNetworks] = useState<any[]>();
  const [filteredStations, setFilteredStations] = useState<any[]>();

  const goBack = () => {
    clearSearchInput();
    setNetworkStation({});
    setNetworkDetails({});
    history.push('/');
    dispatch(hideDetails(true));
  };

  const isHome = location.pathname === '/';

  const heading = isHome ? 'Choose a city' : 'Choose a station';

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputSearch(value);

    if (isHome) {
      const filteredResults = filterNetworkResults(value);
      return setFilteredNetworks(filteredResults);
    }

    const filteredResults = filterStationResults(value);
    setFilteredStations(filteredResults);
  };

  const clearSearchInput = () => {
    setInputSearch('');
  };

  const filterNetworkResults = (input: string) =>
    networks.filter((network) =>
      network.location.city.toLowerCase().includes(input)
    );

  const filterStationResults = (input: string) => {
    return {
      ...networkDetails,
      stations: networkDetails.stations.filter(({ name }: { name: string }) =>
        name.toLowerCase().includes(input)
      ),
    };
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-logo">
          <h1>Bike Locator App</h1>
        </div>
        <div className="sidebar-header-title">
          <h2>{heading}</h2>
        </div>
        <div
          className={`sidebar-header-search${inputFocus ? ' focus' : ''}${
            !!inputSearch ? '' : ' icon-hidden'
          }`}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        >
          <input
            value={inputSearch}
            onChange={handleSearchInput}
            placeholder={
              isHome ? 'Search for a city…' : 'Search for a station…'
            }
          />
          <div
            className="sidebar-header-search__icon"
            onClick={clearSearchInput}
          />
        </div>
      </div>

      <div className="sidebar-main">
        <Switch>
          <Route exact path="/">
            <Cities
              networks={filteredNetworks || networks}
              getNetworkDetails={getNetworkDetails}
              clearSearchInput={clearSearchInput}
            />
          </Route>
          <Route path="/stations/:id">
            <Stations
              networkDetails={filteredStations || networkDetails}
              setNetworkStation={setNetworkStation}
              getNetworkDetails={getNetworkDetails}
              clearSearchInput={clearSearchInput}
            />
          </Route>
        </Switch>
      </div>
      <div className="sidebar-footer">
        <button
          className={`sidebar-footer-button${isHome ? ' disabled' : ''}`}
          disabled={isHome}
          onClick={goBack}
        >
          <p>Volver atrás</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
