/* eslint-disable react-hooks/exhaustive-deps */
import { MutableRefObject, useLayoutEffect, useRef, useState } from "react";

type Size = "height" | "width";

interface Options {
  threshold?: number;
  isMaxSize?: boolean;
}

export default function useSize(
  sizeType: "height" | "width",
  options: Options = { isMaxSize: true, threshold: 500 }
): [MutableRefObject<any>, number] {
  const [size, setSize] = useState(0);
  const ref = useRef(null);

  useLayoutEffect(updateValues, [ref.current, getSize(ref, sizeType)]);

  function updateSize() {
    const newSize = getSize(ref, sizeType);
    if (options.isMaxSize && newSize > size) setSize(newSize);
    else if (!options.isMaxSize && newSize !== size) setSize(newSize);
  }

  function updateSizeOnResize() {
    setTimeout(updateSize, options.threshold);
  }

  function updateValues() {
    updateSize();

    if (window === undefined) return;

    window.addEventListener("resize", updateSizeOnResize);
    return () => window.removeEventListener("resize", updateSizeOnResize);
  }

  return [ref, size];
}

function getSize(ref: MutableRefObject<any>, size: Size) {
  if (ref.current) return size === "width" ? ref.current.clientWidth : ref.current.clientHeight;
  else return 0;
}
