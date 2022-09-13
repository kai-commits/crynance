import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';

interface AutoWidthInputProps {
  type: string;
  min: string;
  value: string;
  inputHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  className: string;
}

export const AutoWidthInput = ({
  type,
  min,
  value,
  inputHandler,
  className,
}: AutoWidthInputProps) => {
  const [content, setContent] = useState('0');
  const [width, setWidth] = useState(0);
  const span = useRef();

  useEffect(() => {
    setWidth(span.current.offsetWidth);
  }, [content]);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
    inputHandler(event);
  };
  return (
    <>
      <span ref={span} className='absolute opacity-0 -z-50 whitespace-pre p-5 text-3xl'>
        {content}
      </span>
      <input
        type={type}
        min={min}
        value={value}
        onChange={(event) => changeHandler(event)}
        className={className}
        style={{ width }}
        autoFocus
      ></input>
    </>
  );
};
