interface ConditionWrapperProps {
  condition: boolean;
  wrapper: (children: JSX.Element | JSX.Element[]) => JSX.Element;
  children: JSX.Element | JSX.Element[];
}

export const ConditionWrapper = ({ condition, wrapper, children }: ConditionWrapperProps): JSX.Element => {
  return <>{condition ? wrapper(children) : children}</>;
};
