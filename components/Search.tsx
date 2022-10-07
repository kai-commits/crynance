import { auth } from '@/firebase';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Search as SearchIcon } from 'react-feather';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ParsedMarkets } from '../pages';

interface SearchProps {
  filterMarket: (marketData: ParsedMarkets[], query: string) => void;
}

export const Search = ({ filterMarket }: SearchProps) => {
  const [user] = useAuthState(auth);
  const [marketsResponse, setMarketsResponse] = useState();
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    const getMarketsResponse = async () => {
      await axios.get(`/api/markets?user=${user?.email}`).then((res) => setMarketsResponse(res.data));
    }
    getMarketsResponse();
  }, [user]);

  useEffect(() => {
    if (marketsResponse) {
      filterMarket(marketsResponse, value);
    }
  }, [value, marketsResponse, filterMarket]);

  return (
    <div className='bg-blackeye-blue px-5'>
      <form>
        <div className='max-w-4xl mx-auto'>
          <div className='flex justify-between items-center py-2'>
            <div className='flex grow mr-2'>
              <SearchIcon className='text-lightblue' />
              <input
                type='search'
                className=' w-full text-sm pl-2 text-offwhite bg-blackeye-blue focus-visible:outline-none placeholder:text-lightblue placeholder:italic mx-auto'
                placeholder='Search coins...'
                autoComplete='off'
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
