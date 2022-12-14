import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { pid, from, to } = request.query;

  const { data: marketData } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${pid}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`
  );

  response.status(200).send(marketData.prices);
}
