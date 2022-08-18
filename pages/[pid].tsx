import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Header } from '../components/Header';
import { Nav } from '../components/Nav';

const Coin: NextPage = () => {
  const { pid } = useRouter().query;

  return (
    <div className='flex flex-col justify-between min-w-fit'>
      <div className='flex grow bg-lightblue h-screen'>
        <div className='flex justify-center mx-auto'>
          <div className='text-darkblue text-3xl font-bold cursor-pointer p-4'>{pid}</div>
        </div>
      </div>
      <Nav />
    </div>
  );
};

export default Coin;
