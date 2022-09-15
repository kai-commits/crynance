import { ChangeEvent, useEffect, useRef, useState } from 'react';

interface AutoWidthInputProps {
  type: string;
  min: string;
  textSize: string;
  inputHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  className: string;
}

export const AutoWidthInput = ({
  type,
  min,
  textSize,
  inputHandler,
  className,
}: AutoWidthInputProps) => {
  const [content, setContent] = useState<string>('0');
  const [width, setWidth] = useState<number>(0);
  const span = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (span.current) {
      setWidth(span.current.offsetWidth);
    }
  }, [content]);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
    inputHandler(event);
  };
  return (
    <>
      <span
        ref={span}
        className={'absolute opacity-0 -z-50 whitespace-pre px-1 ' + textSize}
      >
        {content}
      </span>
      <input
        type={type}
        min={min}
        value={content}
        onChange={(event) => changeHandler(event)}
        className={className}
        style={{ width }}
        autoFocus
      ></input>
    </>
  );
};
