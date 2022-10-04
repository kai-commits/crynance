import { doc, getDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/firebase';
import { TransactionLog } from '@/types';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { user } = request.query;
  let totalUSDValue = 0;

  try {
    if (typeof user === 'string') {
      const docRef = (await getDoc(doc(db, 'users', user))).data();
      docRef?.transactions.map((transaction: TransactionLog) => {
        if (transaction.buyOrSell === 'buy') {
          totalUSDValue += transaction.usdAmount;
        }
        if (transaction.buyOrSell === 'sell') {
          totalUSDValue -= transaction.usdAmount;
        }
      });
    }
  } catch (error) {
    console.log('database error: ', error);
    response.statusCode = 500;
    response.send({});
    return;
  }

  response.status(200).send(totalUSDValue);
}
