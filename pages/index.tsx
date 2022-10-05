import { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { Nav } from '../components/Nav';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

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
  const [initialPortfolioValue, setInitialPortfolioValue] = useState(0);
  const [currentPortfolioValue, setCurrentPortfolioValue] = useState(0);
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

  const coinValue = useCallback((coinAmount: number, usdValue: number) => {
    setCurrentPortfolioValue((prev) => (prev += coinAmount * usdValue));
  }, []);

  useEffect(() => {
    if (user?.email) {
      axios.get(`api/db/totalStartValue?user=${user?.email}`).then((res) => {
        setInitialPortfolioValue(res.data);
      });
    }
  }, [user?.email]);

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
          />
          <Main
            filteredMarket={filteredMarket}
            user={user?.email}
            coinValue={coinValue}
          />
          <Nav />
        </div>
      </div>
    </>
  );
};

export default Home;
