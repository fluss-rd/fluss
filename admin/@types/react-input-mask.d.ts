import { Props } from "react-input-mask";

declare module "react-input-mask" {
  export interface Props extends Props {
    maskChar?: string;
  }
}
