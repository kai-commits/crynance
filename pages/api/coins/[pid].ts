import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

interface CoinGeckoCoins {
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  circulating_supply: number;
  current_price: number;
  fully_diluted_valuation: number;
  high_24h: number;
  id: string;
  image: string;
  last_updated: string;
  low_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number;
  max_supply: number;
  name: string;
  price_change_24h: number;
  price_change_percentage_1y_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  price_change_percentage_24h: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_30d_in_currency: number;
  roi: null;
  symbol: string;
  total_supply: number;
  total_volume: number;
}

export interface ParsedCoin {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  currentMarketValue: number;
  priceChangePercentage1D: number;
  priceChangePercentage1W: number;
  priceChangePercentage1M: number;
  priceChangePercentage1Y: number;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { pid } = request.query;

  const { data: coinData } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${pid}&order=market_cap_desc&per_page=1&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C30d%2C1y`
  );

  const parsedData: ParsedCoin[] = coinData.map((coin: CoinGeckoCoins) => {
    return {
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      logo: coin.image,
      currentMarketValue: coin.current_price,
      priceChangePercentage1D: coin.price_change_percentage_24h_in_currency,
      priceChangePercentage1W: coin.price_change_percentage_7d_in_currency,
      priceChangePercentage1M: coin.price_change_percentage_30d_in_currency,
      priceChangePercentage1Y: coin.price_change_percentage_1y_in_currency,
    };
  });

  response.status(200).send(parsedData[0]);
}

// ath: 69045
// ath_change_percentage: -70.69232
// ath_date: "2021-11-10T14:24:11.849Z"
// atl: 67.81
// atl_change_percentage: 29741.78742
// atl_date: "2013-07-06T00:00:00.000Z"
// circulating_supply: 19137868
// current_price: 20245
// fully_diluted_valuation: 424932059382
// high_24h: 20426
// id: "bitcoin"
// image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
// last_updated: "2022-08-31T21:26:53.152Z"
// low_24h: 19805.35
// market_cap: 387252079115
// market_cap_change_24h: 5381694140
// market_cap_change_percentage_24h: 1.4093
// market_cap_rank: 1
// max_supply: 21000000
// name: "Bitcoin"
// price_change_24h: 298.14
// price_change_percentage_1y_in_currency: -57.0389120843847
// price_change_percentage_7d_in_currency: -6.109505917850671
// price_change_percentage_24h: 1.49468
// price_change_percentage_24h_in_currency: 1.494678383978422
// price_change_percentage_30d_in_currency: -13.407392599738122
// roi: null
// symbol: "btc"
// total_supply: 21000000
// total_volume: 28516601498
