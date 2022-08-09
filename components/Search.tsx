import { Search as SearchIcon } from 'react-feather';

export const Search = () => {
  return (
    <div className='bg-blackeye-blue'>
      <form>
        <div className='max-w-3xl mx-auto'>
          <div className='flex justify-between items-center py-2 mx-3'>
            <div className='flex grow mx-2'>
              <SearchIcon className='text-lightblue' />
              <input
                type='search'
                id='default-search'
                className=' w-full text-sm pl-2 text-offwhite bg-blackeye-blue focus-visible:outline-none placeholder:text-lightblue placeholder:italic mx-auto'
                placeholder='Search coins...'
                required
              />
            </div>
          <button
            type='submit'
            className='text-offwhite right-2.5 bottom-2.5 bg-blackeye-blue border-lightpink border-2 font-medium rounded text-sm px-3 py-1 mx-3'
          >
            Search
          </button>
          </div>
        </div>
      </form>
    </div>
  );
};
