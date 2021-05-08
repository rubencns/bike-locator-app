import { Dispatch } from 'react';
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

  const goBack = () => {
    setNetworkStation({});
    setNetworkDetails({});
    history.push('/');
    dispatch(hideDetails(true));
  };

  const heading =
    location.pathname === '/' ? 'Choose a city' : 'Choose a station';

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-logo">
          <h1>Bike Locator App</h1>
        </div>
        <h2>{heading}</h2>
      </div>

      <div className="sidebar-main">
        <Switch>
          <Route exact path="/">
            <Cities networks={networks} getNetworkDetails={getNetworkDetails} />
          </Route>
          <Route path="/stations/:id">
            <Stations
              networkDetails={networkDetails}
              setNetworkStation={setNetworkStation}
              getNetworkDetails={getNetworkDetails}
            />
          </Route>
        </Switch>
      </div>
      <div className="sidebar-footer">
        <button className="sidebar-footer-button" onClick={goBack}>
          <p>Volver atrás</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
