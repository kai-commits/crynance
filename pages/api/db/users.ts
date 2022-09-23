import { setDoc, doc, arrayUnion } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebase';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { user, name, buyOrSell, date, coinAmmount, usdAmmount } = request.body;
  try {
    await setDoc(doc(db, 'users', user), {
      transactions: arrayUnion({
        name,
        buyOrSell,
        date,
        coinAmmount,
        usdAmmount,
      }),
    });
  } catch (error) {
    console.log('error writing to database: ', error);
  }

  response.status(200).send('success');
}

// await setDoc(doc(db, 'users', `${user.email}`), {
//   transactions: arrayUnion({
//     name: name,
//     buyOrSell: modalBuySell,
//     date: today,
//     coinAmmount: Number(coinValue),
//     usdAmmount: usdValue,
//   }),
// });
