import { Dispatch, useEffect, useState } from 'react';
import { useParams } from 'react-router';

interface StationsProps {
  networkDetails: any;
  setNetworkStation: Dispatch<any>;
  getNetworkDetails: (id: string) => void;
  clearSearchInput: () => void;
}

const Stations: React.FC<StationsProps> = ({
  networkDetails,
  setNetworkStation,
  getNetworkDetails,
  clearSearchInput,
}) => {
  const { id }: { id: string } = useParams();
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    const normalizedId = id.slice(1);
    getNetworkDetails(normalizedId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <ul className="sidebar-main-results">
      {Object.keys(networkDetails).length &&
      networkDetails.stations.length !== 0 ? (
        networkDetails.stations.map((station: any) => (
          <li
            key={station.id}
            className={`sidebar-main-results__item${
              activeId === station.id ? ' active' : ''
            }`}
            onClick={() => {
              setActiveId(station.id);
              setNetworkStation({ ...station });
              clearSearchInput();
            }}
          >
            <p>{station.name}</p>
          </li>
        ))
      ) : (
        <p>No results…</p>
      )}
    </ul>
  );
};

export default Stations;
