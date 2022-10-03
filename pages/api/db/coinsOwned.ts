import { doc, getDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/firebase';
import { TransactionLog } from '@/types';
import axios from 'axios';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {


  response.status(200);
}
