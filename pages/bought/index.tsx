import { NextPage } from 'next';
import axios from 'axios';
import useSwr from 'swr';
import { Nav } from '../../components/Nav'
import { Main } from '../../components/Main';
import { Search } from '../../components/Search';

const axiosFetcher = (url: string) => axios.get(url).then((res) => res.data);

const Index: NextPage = () => {
  const response = useSwr('/api/hello', axiosFetcher);
  console.log(response.data);
  return (
    <div className='min-w-fit'>
      <div className='w-full py-6 bg-darkblue text-center text-offwhite font-bold text-xl sticky top-0'>
        Which coin did you buy?
      </div>
      <Search />
      <Main />
      <Nav />
    </div>
  );
};

export default Index;
