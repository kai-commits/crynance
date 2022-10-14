import { doc, getDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/firebase';
import { TransactionLog } from '@/types';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { user, coin } = request.query;
  const transactionData: TransactionLog[] = [];
  try {
    if (typeof user === 'string') {
      const docRef = await getDoc(doc(db, 'users', user));
      docRef.data()?.transactions.map((transaction: TransactionLog) => {
        if (transaction.name === coin) {
          transactionData.push(transaction);
        }
      });
    }
  } catch (error) {
    console.log('error reading from database: ', error);
    response.statusCode = 500;
    response.send({});
    return;
  }
  const sortedTransactionData = transactionData.reverse();
  response.status(200).send(sortedTransactionData);
}
