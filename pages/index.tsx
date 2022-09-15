import { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { Nav } from '../components/Nav';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCallback, useState } from 'react';

export interface ParsedMarkets {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  currentMarketValue: number;
  priceChangePercentage: number;
}

const Home: NextPage = () => {
  const [user] = useAuthState(auth);
  console.log('user: ', user);

  const [filteredMarket, setFilteredMarket] = useState<ParsedMarkets[]>([]);

  const filterMarket = useCallback(
    (marketData: ParsedMarkets[], query: string) => {
      setFilteredMarket(
        marketData?.filter((coin: ParsedMarkets) => {
          if (
            coin.id.includes(query.toLowerCase()) ||
            coin.symbol.includes(query.toLowerCase())
          ) {
            return coin;
          }
        })
      );
    },
    []
  );

  return (
    <>
      <Head>
        <title>Crynance</title>
        <meta name='crypto finance tracker' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='w-full h-full bg-blackeye-blue'>
        <div className='flex flex-col justify-between h-max mx-auto min-w-fit max-w-3xl'>
          <Header filterMarket={filterMarket} />
          <Main filteredMarket={filteredMarket} />
          <Nav />
        </div>
      </div>
    </>
  );
};

export default Home;
