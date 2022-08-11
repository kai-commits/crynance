import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Nav } from '../../components/Nav';

const Bought: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (value === NaN) {
      setValue(0);
    }
    console.log(value);
  }, [value]);

  return (
    <div className='flex flex-col justify-between min-w-fit'>
      <div className='w-full sticky top-0 z-[100]'>
        <div className='py-6 bg-darkblue text-center text-offwhite font-bold text-xl'>
          How much did you buy?
        </div>
      </div>
      <div className='flex grow bg-lightblue'>
        <form className=''>
          <label>{pid}</label>
          <input
            className='w-full bg-blackeye-blue text-offwhite'
            type='number'
            value={value}
            onChange={(event) => {
              if (event.target.value.length > 7) return false;
              setValue(event.target.valueAsNumber);
            }}
          />
        </form>
      </div>
      <Nav />
    </div>
  );
};

export default Bought;
