import axios from 'axios';
import useSWR from 'swr';
import { Coin } from './Coin';

interface ParsedMarkets {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  currentMarketValue: number;
  priceChangePercentage: number;
}

const axiosFetcher = async (url: string) => {
  return await axios.get(url).then((res) => res.data);
};

export const Main = (): JSX.Element => {
  const { data: marketsResponse } = useSWR('/api/markets', axiosFetcher);
  console.log(marketsResponse);
  return (
    <div className='flex items-center flex-col bg-lightblue px-5 h-max pb-3 min-h-screen'>
      {marketsResponse?.map((coin: ParsedMarkets) => (
        <Coin
          key={coin.id}
          name={coin.name}
          symbol={coin.symbol}
          logo={coin.logo}
          currentMarketValue={coin.currentMarketValue}
          priceChangePercentage={coin.priceChangePercentage}
        />
      ))}
    </div>
  );
};
