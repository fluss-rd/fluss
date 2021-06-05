import { useState } from "react";

export default function useBoolean(defaultValue = false): [boolean, () => void, () => void] {
  const [value, setValue] = useState<boolean>(defaultValue);

  const setTrue = () => {
    setValue(true);
  };

  const setFalse = () => {
    setValue(false);
  };

  return [value, setTrue, setFalse];
}
