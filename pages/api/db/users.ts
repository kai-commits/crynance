import { setDoc, doc, arrayUnion } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebase';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { user, name, symbol, buyOrSell, date, coinAmmount, usdAmmount } = request.body;
  try {
    await setDoc(doc(db, 'users', user), {
      transactions: arrayUnion({
        name,
        symbol,
        buyOrSell,
        date,
        coinAmmount,
        usdAmmount,
      }),
    }, {merge: true});
  } catch (error) {
    console.log('error writing to database: ', error);
    response.statusCode = 500;
    response.send({});
    return;
  }

  response.send({});
}
