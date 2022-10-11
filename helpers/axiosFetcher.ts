import { ParsedCoin } from '@/types';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';

export const axiosFetcher = async (url: string) => {
  return await axios.get(url).then((res) => res.data);
};

export const axiosFetcherSetter = async (
  url: string,
  setter: Dispatch<SetStateAction<ParsedCoin>>
) => {
  return await axios.get(`${url}`).then((res) => setter(res.data));
};
