import { MutableRefObject, useLayoutEffect, useRef, useState } from "react";

export default function useHeight(): [MutableRefObject<any>, number] {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useLayoutEffect(() => {
    const newHeight = ref.current ? ref.current.clientHeight : 0;
    if (ref.current && ref.current.clientHeight) setHeight(newHeight);
  }, [ref.current, ref.current ? ref.current.clientHeight : 0]);

  return [ref, height];
}
