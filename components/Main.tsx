import { ParsedMarkets } from '@/types';
import { Coin } from './Coin';

interface MainProps {
  filteredMarket: ParsedMarkets[];
}

export const Main = ({ filteredMarket }: MainProps): JSX.Element => {
  return (
    <div className='flex items-center flex-col bg-lightblue px-5 h-max pb-3 min-h-screen'>
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
