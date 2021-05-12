import { useHistory } from 'react-router';

interface CitiesProps {
  networks: any[];
  getNetworkDetails: (id: string) => void;
  clearSearchInput: () => void;
}

const Cities: React.FC<CitiesProps> = ({
  networks,
  getNetworkDetails,
  clearSearchInput,
}) => {
  const history = useHistory();

  const handleCitySelection = (id: string) => {
    clearSearchInput();
    getNetworkDetails(id);
    history.push(`/stations/:${id}`);
  };

  return (
    <ul className="sidebar-main-results">
      {networks.length ? (
        networks.map(({ id, location: { city } }) => (
          <li
            key={id}
            className="sidebar-main-results__item"
            onClick={() => handleCitySelection(id)}
          >
            <p>{city}</p>
          </li>
        ))
      ) : (
        <p>No results…</p>
      )}
    </ul>
  );
};

export default Cities;
