import { NextPage } from 'next';
import { Nav } from '../../components/Nav';
import { Main } from '../../components/Main';
import { Search } from '../../components/Search';

const Index: NextPage = () => {
  return (
    <div className='min-w-fit'>
      <div className='w-full sticky top-0 z-[100]'>
        <div className='py-6 bg-darkblue text-center text-offwhite font-bold text-xl'>
          Which coin did you buy?
        </div>
        <Search />
      </div>
      <Main />
      <Nav />
    </div>
  );
};

export default Index;
