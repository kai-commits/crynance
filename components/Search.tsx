import { useEffect, useState } from 'react';
import { Search as SearchIcon } from 'react-feather';
import useSWR from 'swr';
import { axiosFetcher } from '../helpers/axiosFetcher';
import { ParsedMarkets } from '../pages';

interface SearchProps {
  filterMarket: (marketData: ParsedMarkets[], query: string) => void;
}

export const Search = ({ filterMarket }: SearchProps) => {
  const { data: marketsResponse } = useSWR<ParsedMarkets[]>('/api/markets', axiosFetcher);
  const [value, setValue] = useState<string>('');

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
