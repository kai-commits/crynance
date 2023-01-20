export interface TransactionLog {
  buyOrSell: string;
  coinAmount: number;
  date: string;
  name: string;
  symbol: string;
  usdAmount: number;
  totalAmount: number;
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

export interface ParsedMarkets {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  currentMarketValue: number;
  priceChangePercentage: number;
  totalAmount: number;
  totalUSDValue: number;
}