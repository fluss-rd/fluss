import { scroller } from "react-scroll";

export default function scroll(elementId: string, props?: any) {
  return () =>
    scroller.scrollTo(elementId, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      ...props,
    });
}
