import { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { Nav } from '../components/Nav';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { ParsedMarkets } from '@/types';

const Home: NextPage = () => {
  const [user] = useAuthState(auth);
  const [initialPortfolioValue, setInitialPortfolioValue] = useState(0);
  const [currentPortfolioValue, setCurrentPortfolioValue] = useState(0);
  const [marketsResponse, setMarketsResponse] = useState<ParsedMarkets[]>([]);
  const [filteredMarket, setFilteredMarket] = useState<ParsedMarkets[]>([]);

  const filterMarket = useCallback(
    (marketData: ParsedMarkets[], query: string) => {
      setFilteredMarket(
        marketData.filter((coin: ParsedMarkets) => {
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

  useEffect(() => {
    const getMarketsResponse = async () => {
      await axios
        .get(`/api/markets?user=${user?.email}`)
        .then((res) => setMarketsResponse(res.data));
    };
    getMarketsResponse();
  }, [user]);

  useEffect(() => {
    if (marketsResponse) {
      setCurrentPortfolioValue(
        marketsResponse
          .map((res) => res.totalAmount * res.currentMarketValue)
          .reduce((prev, curr) => prev + curr, 0)
      );
      setInitialPortfolioValue(
        marketsResponse
          .map((res) => res.totalUSDValue)
          .reduce((prev, curr) => prev + curr, 0)
      );
    }
  }, [marketsResponse]);

  return (
    <>
      <Head>
        <title>Crynance</title>
        <meta name='crypto finance tracker' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='w-full h-full bg-blackeye-blue'>
        <div className='flex flex-col justify-between h-max mx-auto min-w-fit max-w-4xl'>
          <Header
            filterMarket={filterMarket}
            initialPortfolioValue={initialPortfolioValue}
            currentPortfolioValue={currentPortfolioValue}
            marketsResponse={marketsResponse}
          />
          <Main filteredMarket={filteredMarket} />
          <Nav />
        </div>
      </div>
    </>
  );
};

export default Home;
