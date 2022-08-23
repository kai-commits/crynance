import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { LineChart } from '../components/graphs/LineChart';
import { Nav } from '../components/Nav';
import { useState } from 'react';
import classNames from 'classnames';

interface TimeRangeButton {
  name: string;
  queryString: string;
}

const CoinPage: NextPage = () => {
  const { pid } = useRouter().query;
  const [activeTimeButton, setActiveTimeButton] = useState('1H');
  const [queryParams, setQueryParams] = useState('?vs_currency=usd&from=1660299560&to=1660904360');

  const timeRangeButtons: TimeRangeButton[] = [
    { name: '1H', queryString: `?vs_currency=usd&from=1660299560&to=1660904360` },
    { name: '1D', queryString: `?vs_currency=usd&from=1660299560&to=1660303160` },
    { name: '1W', queryString: `?vs_currency=usd&from=1660299560&to=1660904360` },
    { name: '1M', queryString: `?vs_currency=usd&from=1660299560&to=1660904360` },
    { name: '1Y', queryString: `?vs_currency=usd&from=1660299560&to=1660904360` },
  ];

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
          <LineChart queryParams={queryParams} pid={pid} />
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
