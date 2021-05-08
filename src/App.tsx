import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import { ES } from './constants/country-codes';
import Map from './containers/map/map';
import Sidebar from './containers/sidebar/sidebar';
import { fetchNetworkDetails, fetchNetworks } from './services/citybik-api';

const App: React.FC = () => {
  const [networks, setNetworks] = useState<any[]>([]);
  const [networkDetails, setNetworkDetails] = useState<any>({});
  const [networkStation, setNetworkStation] = useState<any>({});

  const getNetworks = async () => {
    const data = await fetchNetworks(ES);
    setNetworks([...data]);
  };

  const getNetworkDetails = async (id: string) => {
    const data = await fetchNetworkDetails(id);
    setNetworkDetails({ ...data });
    setNetworkStation({});
  };

  useEffect(() => {
    getNetworks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Router>
        <Sidebar
          networks={networks}
          networkDetails={networkDetails}
          getNetworkDetails={getNetworkDetails}
          setNetworkStation={setNetworkStation}
          setNetworkDetails={setNetworkDetails}
        />
      </Router>
      <Map
        networkDetails={networkDetails}
        networkStation={networkStation}
        setNetworkStation={setNetworkStation}
      />
    </div>
  );
};

export default App;
