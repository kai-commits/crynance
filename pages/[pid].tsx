import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { LineChart } from '../components/graphs/LineChart';
import { Nav } from '../components/Nav';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import useSWR from 'swr';
import { axiosFetcher } from '../helpers/axiosFetcher';
import { ParsedCoin } from './api/coins/[pid]';
import Link from 'next/link';
import { Transaction } from '../components/Transaction';

interface TimeRangeButton {
  name: string;
  queryString: string;
  percentageChange: number;
}

const { today, oneDayAgo, oneWeekAgo, oneMonthAgo, oneYearAgo } = {
  today: dayjs().unix(),
  oneDayAgo: dayjs().subtract(1, 'day').unix(),
  oneWeekAgo: dayjs().subtract(1, 'week').unix(),
  oneMonthAgo: dayjs().subtract(1, 'month').unix(),
  oneYearAgo: dayjs().subtract(1, 'year').unix(),
};

const CoinPage: NextPage = () => {
  const { pid } = useRouter().query;
  const { data } = useSWR(`/api/coins/${pid}`, axiosFetcher);
  const coinDataResponse: ParsedCoin = data;
  const timeRangeButtons: TimeRangeButton[] = [
    {
      name: '1D',
      queryString: `?from=${oneDayAgo}&to=${today}`,
      percentageChange:
        Math.round(coinDataResponse?.priceChangePercentage1D * 100) / 100,
    },
    {
      name: '1W',
      queryString: `?from=${oneWeekAgo}&to=${today}`,
      percentageChange:
        Math.round(coinDataResponse?.priceChangePercentage1W * 100) / 100,
    },
    {
      name: '1M',
      queryString: `?from=${oneMonthAgo}&to=${today}`,
      percentageChange:
        Math.round(coinDataResponse?.priceChangePercentage1M * 100) / 100,
    },
    {
      name: '1Y',
      queryString: `?from=${oneYearAgo}&to=${today}`,
      percentageChange:
        Math.round(coinDataResponse?.priceChangePercentage1Y * 100) / 100,
    },
  ];

  const [activeTimeButton, setActiveTimeButton] = useState('1D');
  const [percentageChange, setPercentageChange] = useState(
    timeRangeButtons[0].percentageChange
  );
  const [queryParams, setQueryParams] = useState(
    timeRangeButtons[0].queryString
  );

  const timeRangeButtonClasses = (button: TimeRangeButton): string => {
    return classNames('text-bold border-2 px-2 rounded', {
      'border-darkblue text-lightblue': activeTimeButton !== button.name,
      'border-offwhite text-offwhite': activeTimeButton === button.name,
    });
  };

  const timeButtonHandler = (button: TimeRangeButton) => {
    setActiveTimeButton(button.name);
    setQueryParams(button.queryString);
    setPercentageChange(button.percentageChange);
  };

  return (
    <div className='flex flex-col justify-between bg-darkblue h-screen'>
      <div className='flex flex-col items-center px-5'>
        <div className='w-full max-w-3xl'>
          <div className='flex flex-col'>
            <div className='flex justify-center text-lightpink text-3xl font-bold cursor-pointer p-4'>
              {coinDataResponse?.name}
            </div>
            <div className='flex justify-evenly text-xl'>
              <div className='text-offwhite pr-3'>
                $
                {Math.round(coinDataResponse?.currentMarketValue * 100000) /
                  100000}
              </div>
              {percentageChange >= 0 ? (
                <div className='text-green-500 pl-3'>{percentageChange}%</div>
              ) : (
                <div className='text-red-500 pl-3'>{percentageChange}%</div>
              )}
            </div>
          </div>
          {pid && <LineChart queryParams={queryParams} pid={pid} />}
          <div className='flex justify-between'>
            {timeRangeButtons.map((button, index) => (
              <button
                key={index}
                className={timeRangeButtonClasses(button)}
                onClick={() => timeButtonHandler(button)}
              >
                {button.name}
              </button>
            ))}
          </div>
          <div className='flex flex-col'>
            <div className='flex justify-center text-lightpink text-xl my-5'>
              0.146 {coinDataResponse?.symbol.toUpperCase()}
            </div>
            <div className='flex justify-between text-offwhite'>
              <div>Current Balance</div>
              <div>$500</div>
            </div>
            <div className='flex justify-between text-lightblue'>
              <div>Starting Balance</div>
              <div>$400</div>
            </div>
          </div>
          <div className='flex justify-between w-full my-8'>
            <Link href='/bought'>
              <button className='bg-lightpink px-4 py-2 rounded font-bold text-darkblue cursor-pointer flex-1 mr-5'>
                Buy
              </button>
            </Link>
            <Link href='/sold'>
              <button className='bg-lightpink px-4 py-2 rounded font-bold text-darkblue cursor-pointer flex-1 ml-5'>
                Sell
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className='flex flex-col grow bg-lightblue'>
        <div className='flex flex-col items-center px-5 pb-3'>
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
        </div>
      </div>
      <Nav />
    </div>
  );
};

export default CoinPage;
