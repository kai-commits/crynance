import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
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
  const [purchaseAmount, setPurchaseAmount] = useState<string>('0');
  const [equivalentValue, setEquivalentValue] = useState<number>(0);
  const [usdInput, setUsdInput] = useState<boolean>(false);

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 0) {
      setEquivalentValue(0);
    } else {
      setEquivalentValue(event.target.valueAsNumber * currentMarketValue);
    }
    setPurchaseAmount(event.target.value);
  };

  return (
    <div className='fixed z-[500] h-2/4 bottom-0 right-0 left-0 bg-offwhite rounded-t-lg max-w-3xl mx-auto'>
      <div className='flex flex-col items-center'>
        <button
          onClick={() => setModalActive(false)}
          className='absolute top-0 right-0 pr-2 pt-1'
        >
          X
        </button>
        <div className='text-xl text-darkblue font-semibold p-3'>
          Buy {name}
        </div>
        <div className=''>
          <form className='flex'>
            <AutoWidthInput
              type='number'
              min='0'
              value={purchaseAmount}
              inputHandler={inputHandler}
              className='focus-visible:outline-none text-center text-3xl text-lightpink'
            />
            <label className=''>{symbol.toUpperCase()}</label>
          </form>
        </div>
        <div className='text-xl text-darkblue p-3'>
          ${roundNumber(equivalentValue, 2)}
        </div>
        <button>Swap</button>
      </div>
    </div>
  );
};
