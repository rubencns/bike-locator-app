import { useHistory } from 'react-router';

interface CitiesProps {
  networks: any[];
  getNetworkDetails: (id: string) => void;
}

const Cities: React.FC<CitiesProps> = ({ networks, getNetworkDetails }) => {
  const history = useHistory();

  const handleCitySelection = (id: string) => {
    getNetworkDetails(id);
    history.push(`/stations/:${id}`);
  };

  return (
    <ul className="sidebar-main-results">
      {networks.map(({ id, location: { city } }) => (
        <li
          key={id}
          className="sidebar-main-results__item"
          onClick={() => handleCitySelection(id)}
        >
          <p>{city}</p>
        </li>
      ))}
    </ul>
  );
};

export default Cities;
