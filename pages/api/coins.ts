import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

interface CoinGeckoMarkets {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: number | null;
  last_updated: string;
}

interface ParsedMarkets {
  id: number;
  symbol: string;
  name: string;
  currentMarketValue: number;
  priceChangePercentage: number;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { data: marketData } = await axios.get(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  );

  const parsedData: ParsedMarkets[] = marketData.map((coin: CoinGeckoMarkets) => {
    return {
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      currentMarketValue: coin.current_price,
      priceChangePercentage: coin.price_change_percentage_24h,
    };
  });
  response.status(200).send(parsedData);
}
