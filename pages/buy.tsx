import { NextPage } from 'next';
import axios from 'axios';
import useSwr from 'swr';

const axiosFetcher = (url: string) => axios.get(url).then((res) => res.data);

const Buy: NextPage = () => {
  const response = useSwr('/api/hello', axiosFetcher);
  console.log(response.data);
  return <div>{JSON.stringify(response.data)}</div>;
};

export default Buy;
