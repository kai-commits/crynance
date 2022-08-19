import axios from 'axios';

export const axiosFetcher = async (url: string) => {
  return await axios.get(url).then((res) => res.data);
};
