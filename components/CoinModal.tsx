import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { X } from 'react-feather';
import { roundNumber } from '../helpers/math';
import { AutoWidthInput } from './AutoWidthInput';

interface ModalProps {
  setModalActive: Dispatch<SetStateAction<boolean>>;
  name: string;
  symbol: string;
  currentMarketValue: number;
}

export const CoinModal = ({
  setModalActive,
  name,
  symbol,
  currentMarketValue,
}: ModalProps) => {
  const [usdValue, setUsdValue] = useState<string>('0');
  const [coinValue, setCoinValue] = useState<number>(0);

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 0) {
      setCoinValue(0);
    } else {
      setCoinValue(event.target.valueAsNumber * currentMarketValue);
    }
    setUsdValue(event.target.value);
  };

  return (
    <div className='fixed z-[500] bottom-0 right-0 left-0 bg-offwhite rounded-t-lg max-w-3xl mx-auto pb-5'>
      <div className='flex flex-col items-center px-5'>
        <button
          onClick={() => setModalActive(false)}
          className='absolute top-0 right-0 p-2 text-darkblue'
        >
          <X />
        </button>
        <div className='text-2xl text-darkblue font-semibold p-3'>
          Buy {name}
        </div>
        <form className='flex text-green-500'>
          <AutoWidthInput
            type='number'
            min='0'
            inputHandler={inputHandler}
            textSize='text-4xl'
            className='focus-visible:outline-none text-center text-4xl bg-offwhite underline'
          />
          <label className='flex items-center text-xl pl-3'>
            {symbol.toUpperCase()}
          </label>
        </form>
        <div className='flex text-xl text-darkblue p-4'>
          ${roundNumber(coinValue, 2)}
          <label className='flex text-sm pl-1 items-center'>USD</label>
        </div>
        <button className='bg-lightpink px-4 py-2 rounded font-bold text-darkblue cursor-pointer w-full'>Purchase</button>
      </div>
    </div>
  );
};
