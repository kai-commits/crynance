import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Header } from '../components/Header';
import { Nav } from '../components/Nav';

const Coin: NextPage = () => {
  const { pid } = useRouter().query;

  return (
    <div className='flex flex-col justify-between min-w-fit'>
      <Header title={`${pid}`} search={false} />
      <div className='flex grow bg-lightblue h-screen'></div>
      <Nav />
    </div>
  );
};

export default Coin;
