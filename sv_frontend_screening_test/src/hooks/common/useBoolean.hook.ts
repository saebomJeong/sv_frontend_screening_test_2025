import { useState } from 'react';

const useBoolean = (val: boolean) => {
  const [isActive, setIsActive] = useState<boolean>(val);

  const activate = () => {
    setIsActive(true);
  };

  const deactivate = () => {
    setIsActive(false);
  };

  const toggle = () => {
    setIsActive((prev) => !prev);
  };

  return {
    isActive,
    activate,
    deactivate,
    toggle,
  };
};

export default useBoolean;
