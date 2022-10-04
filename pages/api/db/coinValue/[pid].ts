import { db } from '@/firebase';
import { TransactionLog } from '@/types';
import { doc, getDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { pid, user } = request.query;
  let totalUSDValue = 0;
  let totalAmount = 0;

  try {
    if (typeof user === 'string') {
      const docRef = (await getDoc(doc(db, 'users', user))).data();
      docRef?.transactions.map((transaction: TransactionLog) => {
        if (transaction.name === pid) {
          if (transaction.buyOrSell === 'buy') {
            totalUSDValue += transaction.usdAmount;
            totalAmount += transaction.coinAmount;
          }
          if (transaction.buyOrSell === 'sell') {
            totalUSDValue -= transaction.usdAmount;
            totalAmount -= transaction.coinAmount;
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
    response.statusCode = 500;
    response.send({});
    return;
  }
  response.status(200).send({ totalUSDValue, totalAmount });
}
