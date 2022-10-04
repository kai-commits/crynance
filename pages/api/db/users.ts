import { TransactionLog } from '@/types';
import { map } from '@firebase/util';
import { setDoc, doc, arrayUnion, getDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebase';

interface DatabaseInputs {
  user: string;
  name: string;
  symbol: string;
  buyOrSell: string;
  date: string;
  coinAmount: number;
  usdAmount: number;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const {
    user,
    name,
    symbol,
    buyOrSell,
    date,
    coinAmount,
    usdAmount,
  }: DatabaseInputs = request.body;

  try {
    await setDoc(
      doc(db, 'users', user),
      {
        transactions: arrayUnion({
          name,
          symbol,
          buyOrSell,
          date,
          coinAmount,
          usdAmount,
        }),
      },
      { merge: true }
    );
    const docRef = (await getDoc(doc(db, 'users', user))).data();
    let totalUSDValue = 0;
    let totalAmount = 0;

    docRef?.transactions.map((transaction: TransactionLog) => {
      if (transaction.name === name) {
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
    console.log('total value and amount: ', totalUSDValue, totalAmount);

  } catch (error) {
    console.log('error writing to database: ', error);
    response.statusCode = 500;
    response.send({});
    return;
  }

  response.send({});
}
