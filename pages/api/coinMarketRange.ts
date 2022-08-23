import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { data: marketData } = await axios.get(
    'https://api.coingecko.com/api/v3/coins/'
  );

  response.status(200).send(marketData.prices);
}
