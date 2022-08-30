import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { LineChart } from '../components/graphs/LineChart';
import { Nav } from '../components/Nav';
import { useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

interface TimeRangeButton {
  name: string;
  queryString: string;
}

const { today, oneDayAgo, oneWeekAgo, oneMonthAgo, oneYearAgo } = {
  today: dayjs().unix(),
  oneDayAgo: dayjs().subtract(1, 'day').unix(),
  oneWeekAgo: dayjs().subtract(1, 'week').unix(),
  oneMonthAgo: dayjs().subtract(1, 'month').unix(),
  oneYearAgo: dayjs().subtract(1, 'year').unix(),
};

const timeRangeButtons: TimeRangeButton[] = [
  {
    name: '1D',
    queryString: `?from=${oneDayAgo}&to=${today}`,
  },
  {
    name: '1W',
    queryString: `?from=${oneWeekAgo}&to=${today}`,
  },
  {
    name: '1M',
    queryString: `?from=${oneMonthAgo}&to=${today}`,
  },
  {
    name: '1Y',
    queryString: `?from=${oneYearAgo}&to=${today}`,
  },
];

const CoinPage: NextPage = () => {
  const { pid } = useRouter().query;
  const [activeTimeButton, setActiveTimeButton] = useState('1D');
  const [queryParams, setQueryParams] = useState(
    timeRangeButtons[0].queryString
  );

  const timeRangeButtonClasses = (button: TimeRangeButton): string => {
    return classNames('text-bold border-2 px-2 rounded', {
      'border-darkblue': activeTimeButton === button.name,
      'border-lightblue': activeTimeButton !== button.name,
    });
  };

  const timeButtonHandler = (button: TimeRangeButton) => {
    setActiveTimeButton(button.name);
    setQueryParams(button.queryString);
  };

  return (
    <div className='flex flex-col justify-between h-screen'>
      <div className='flex grow bg-lightblue'>
        <div className='flex flex-col mx-auto w-full max-w-3xl'>
          <div className='flex justify-center text-darkblue text-3xl font-bold cursor-pointer p-4'>
            {pid}
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
        </div>
      </div>
      <Nav />
    </div>
  );
};

export default CoinPage;
