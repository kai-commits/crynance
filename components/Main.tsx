import { ParsedMarkets } from '@/types';
import { Coin } from './Coin';

interface MainProps {
  filteredMarket: ParsedMarkets[];
}

export const Main = ({ filteredMarket }: MainProps): JSX.Element => {
  return (
    <div className='flex flex-col items-center min-h-screen px-5 pb-12 overflow-y-hidden sm:border-black pt-9 bg-lightblue h-max sm:border-x-8'>
      {filteredMarket?.map((coin: ParsedMarkets) => (
        <Coin
          key={coin.id}
          id={coin.id}
          name={coin.name}
          symbol={coin.symbol}
          logo={coin.logo}
          currentMarketValue={coin.currentMarketValue}
          priceChangePercentage={coin.priceChangePercentage}
          totalUSDValue={coin.totalUSDValue}
          totalAmount={coin.totalAmount}
        />
      ))}
    </div>
  );
};
