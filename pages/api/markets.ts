import axios from 'axios';
import { getDoc, doc, DocumentData } from 'firebase/firestore';
import { db } from '@/firebase';
import type { NextApiRequest, NextApiResponse } from 'next';
import { TransactionLog } from '@/types';

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
  id: string;
  symbol: string;
  name: string;
  logo: string;
  currentMarketValue: number;
  priceChangePercentage: number;
  totalAmount: number;
  totalUSDValue: number;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { user } = request.query;
  const { data: marketData } = await axios.get(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  );
  let docRef: DocumentData | undefined;

  if (typeof user === 'string') {
    docRef = (await getDoc(doc(db, 'users', user))).data();
  }

  const getTotals = async (coinName: string) => {
    let totalUSDValue = 0;
    let totalAmount = 0;
      
      docRef?.transactions.map((transaction: TransactionLog) => {
        if (transaction.name === coinName) {
          if (transaction.buyOrSell === 'buy') {
            totalUSDValue += transaction.usdAmount;
            totalAmount += transaction.coinAmount;
          }
          if (transaction.buyOrSell === 'sell') {
            totalUSDValue -= transaction.usdAmount;
            totalAmount -= transaction.coinAmount;
          }
        }
      })
    return { totalAmount, totalUSDValue };
  };

  const parsedData = async (): Promise<ParsedMarkets[]> => 
    Promise.all(
      marketData.map(async (coin: CoinGeckoMarkets) => {
        const { totalAmount, totalUSDValue } = await getTotals(coin.name);
        return {
          id: coin.id,
          symbol: coin.symbol,
          name: coin.name,
          logo: coin.image,
          currentMarketValue: coin.current_price,
          priceChangePercentage: coin.price_change_percentage_24h,
          totalAmount,
          totalUSDValue,
        };
      })
    );
  const sortedData = (await parsedData()).sort((a, b) => b.totalUSDValue - a.totalUSDValue);
  response.status(200).send(sortedData);
}
