import { Smile } from 'react-feather';

export const Coin = ({
  name,
  marketValue,
  amountOwned,
  ownedValue,
}: {
  name: string;
  marketValue: number;
  amountOwned: number;
  ownedValue: number;
}): JSX.Element => {
  return (
    <div className='w-full bg-offwhite max-w-3xl py-2 mt-3 rounded'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center mx-1'>
          <Smile className='mx-2 h-9 w-9' />
          <div className='flex flex-col font-medium'>
            <div className='text-lg text-blackeye-blue'>{name}</div>
            <div className='text-sm text-darkblue'>${marketValue}</div>
          </div>
        </div>
        <div className='flex flex-col items-end mx-3 font-medium'>
          <div className='text-lg'>{amountOwned}</div>
          <div className='text-sm text-darkblue'>${ownedValue}</div>
        </div>
      </div>
    </div>
  );
};
