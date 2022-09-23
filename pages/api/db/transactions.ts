import {
  setDoc,
  doc,
  arrayUnion,
  query,
  getDoc,
  collection,
  where,
  getDocs,
} from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { useRouter } from 'next/router';
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
  response.status(200).send(transactionData);
}
