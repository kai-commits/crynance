// bought, sold, date, ammount, ammount in usd

export const Transaction = (): JSX.Element => {
  return (
    <div className='w-full bg-offwhite max-w-3xl py-2 mt-3 rounded cursor-pointer'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center mx-3'>
          <div className='flex flex-col font-medium'>
            <div className='text-lg text-blackeye-blue'>Bought</div>
            <div className='flex'>
              <div className='text-sm text-darkblue'>Sep 6</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-end mx-3 font-medium'>
          <div className='text-lg'>0.146 BTC</div>
          <div className='text-sm text-darkblue'>$1000</div>
        </div>
      </div>
    </div>
  );
};
