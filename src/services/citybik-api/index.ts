import axios from '../axios';

export const fetchNetworks = async (country?: string) => {
  const {
    data: { networks },
  }: any = await axios('/');
  if (country) {
    return networks.filter(
      (network: any) => network.location.country === country
    );
  }
  return networks;
};

export const fetchNetworkDetails = async (id: string) => {
  const {
    data: { network },
  }: any = await axios(id);

  return network;
};

export const fetchNetworksByCity = async (city: string) => {
  const networks = await fetchNetworks();
  return networks.filter((network: any) => network.location.city === city);
};
