import { NextPage } from 'next';
import axios from 'axios';
import useSwr from 'swr';
import { Nav } from '../components/Nav';
import { Main } from '../components/Main';

const axiosFetcher = (url: string) => axios.get(url).then((res) => res.data);

const BuyMain: NextPage = () => {
  const response = useSwr('/api/hello', axiosFetcher);
  console.log(response.data);
  return (
    <div className='min-w-fit'>
      <div className='w-full py-6 bg-darkblue text-center text-offwhite font-bold text-xl sticky top-0'>
        Which coin did you buy?
      </div>
      <Main />
      <Nav />
    </div>
  );
};

export default BuyMain;
