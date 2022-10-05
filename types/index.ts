export interface TransactionLog {
  buyOrSell: string;
  coinAmount: number;
  date: string;
  name: string;
  symbol: string;
  usdAmount: number;
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