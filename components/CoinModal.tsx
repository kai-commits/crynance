import axios from 'axios';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { X } from 'react-feather';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { roundNumber } from '../helpers/math';
import { AutoWidthInput } from './AutoWidthInput';

interface ModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  modalActive: boolean;
  modalOpen: boolean;
  modalBuySell: string;
  name: string;
  symbol: string;
  totalAmount: number;
  coinAmount?: number;
  usdAmount?: number;
  dateString?: string;
  remove?: boolean;
}

interface IDate {
  year: string;
  month: string;
  day: string;
}

export const CoinModal = ({
  setModalOpen,
  modalActive,
  modalOpen,
  modalBuySell,
  name,
  symbol,
  totalAmount,
  coinAmount,
  usdAmount,
  dateString,
  remove,
}: ModalProps) => {
  const [coinValue, setCoinValue] = useState<string>(
    coinAmount ? coinAmount.toString() : '0'
  );
  const [usdValue, setUsdValue] = useState<number>(usdAmount ? usdAmount : 0);
  const [date, setDate] = useState<IDate>(
    dateString
      ? {
          year: dayjs(dateString).year().toString(),
          month: dayjs(dateString).month().toString().padStart(2, '0'),
          day: dayjs(dateString).day().toString().padStart(2, '0'),
        }
      : {
          year: '0000',
          month: '00',
          day: '00',
        }
  );
  const [user] = useAuthState(auth);

  const purchaseDate = dayjs(`${date.year}-${date.month}-${date.day}`).format(
    'MMM D, YYYY'
  );

  const coinInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setCoinValue(event.target.value);
  };

  const usdInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUsdValue(event.target.valueAsNumber);
  };

  const transactionHandler = async () => {
    if (user?.email) {
      try {
        const response = await axios.put('api/db/users', {
          user: user.email,
          name: name,
          symbol: symbol.toUpperCase(),
          buyOrSell: modalBuySell,
          date: purchaseDate,
          coinAmount: Number(coinValue),
          usdAmount: usdValue,
        });
        if (response.status === 500) {
          alert('FAIL');
        }
      } catch (error) {
        console.log('error sending transaction data: ', error);
      }
    } else {
      alert('Must be signed in to make a transaction');
    }
    setModalOpen(false);
    window.location.reload();
  };

  const dateHandler = (event: ChangeEvent<HTMLInputElement>, type: string) => {
    switch (type) {
      case 'year':
        setDate({ ...date, year: event.target.value });
        break;
      case 'month':
        setDate({ ...date, month: event.target.value });
        break;
      case 'day':
        setDate({ ...date, day: event.target.value });
        break;
      default:
        break;
    }
  };

  if (!modalActive) {
    return <></>;
  }

  return (
    <>
      <div className='sm:fixed absolute sm:left-1/2 sm:top-9 top-0 sm:bottom-9 sm:rounded-[3.5rem] sm:-ml-[12.5rem] z-40 sm:w-[25rem] w-full h-full sm:h-auto bg-black opacity-60' />
      <div className='fixed z-50 sm:bottom-11 bottom-0 right-0 left-0 bg-offwhite sm:rounded-t-3xl sm:rounded-b-[3.5rem] sm:w-[25rem] rounded-t-xl w-full mx-auto pb-6'>
        <div className='flex flex-col items-center px-5'>
          <button
            onClick={() => setModalOpen(false)}
            className='absolute top-0 right-0 p-2 text-darkblue'
          >
            <X />
          </button>
          <div className='p-3 text-2xl font-semibold text-darkblue'>
            {modalBuySell === 'buy' ? 'Bought' : 'Sold'} {name}
          </div>
          <form className='flex text-green-500'>
            <AutoWidthInput
              type='number'
              min='0'
              inputHandler={coinInputHandler}
              textSize='text-4xl'
              className='text-4xl text-center underline focus-visible:outline-none bg-offwhite'
              autoFocus={true}
              value={coinValue}
            />
            <label className='flex items-center pl-2 text-xl'>
              {symbol.toUpperCase()}
            </label>
          </form>
          <form className='flex p-4 text-xl text-darkblue'>
            <label>$</label>
            <AutoWidthInput
              type='number'
              min='0'
              inputHandler={usdInputHandler}
              textSize='text-xl'
              className='text-xl text-center focus-visible:outline-none bg-offwhite'
              autoFocus={false}
              value={usdValue.toString()}
            />
            <label className='flex items-center text-base'>USD</label>
          </form>
          <form className='flex justify-center font-mono focus-visible:outline-none text-darkblue bg-offwhite focus:outline-none'>
            <input
              type='number'
              value={dateString && date.year}
              onChange={(event) => dateHandler(event, 'year')}
              placeholder='YYYY'
              className='px-1 mx-1 text-center w-14 bg-offwhite placeholder-lightblue focus-visible:outline-lightblue'
            ></input>
            <label className='text-lightblue'>/</label>
            <input
              type='number'
              value={dateString && date.month}
              onChange={(event) => dateHandler(event, 'month')}
              placeholder='MM'
              className='px-1 mx-1 text-center w-9 bg-offwhite placeholder-lightblue focus-visible:outline-lightblue'
            ></input>
            <label className='text-lightblue'>/</label>
            <input
              type='number'
              value={dateString && date.day}
              onChange={(event) => dateHandler(event, 'day')}
              placeholder='DD'
              className='px-1 mx-1 text-center w-9 bg-offwhite placeholder-lightblue focus-visible:outline-lightblue'
            ></input>
          </form>
          <div className='flex justify-between w-full py-4 text-blackeye-blue'>
            <div>Current Balance</div>
            <div>
              {roundNumber(totalAmount, 4)} {symbol.toUpperCase()}
            </div>
          </div>
          <button
            className='w-full px-4 py-2 font-bold rounded-lg cursor-pointer sm:rounded-full bg-lightpink text-darkblue'
            onClick={() => transactionHandler()}
          >
            Log Transaction
          </button>
        </div>
      </div>
    </>
  );
};
