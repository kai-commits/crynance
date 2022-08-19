import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { LineChart } from '../components/graphs/LineChart';
import { Nav } from '../components/Nav';

const CoinPage: NextPage = () => {
  const { pid } = useRouter().query;

  return (
    <div className='flex flex-col justify-between h-screen'>
      <div className='flex grow bg-lightblue'>
        <div className='flex flex-col mx-auto w-full max-w-3xl'>
          <div className='flex justify-center bg-lightpink text-darkblue text-3xl font-bold cursor-pointer p-4'>
            {pid}
          </div>
          <LineChart />
        </div>
      </div>
      <Nav />
    </div>
  );
};

export default CoinPage;
