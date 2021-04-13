import { Slide } from "@material-ui/core";
import { TransitionProps as Props } from "@material-ui/core/transitions/transition";
import { forwardRef } from "react";

type TransitionProps = Props & { children?: React.ReactElement };

function Transition(props: TransitionProps, ref: React.Ref<unknown>) {
  return <Slide direction="up" ref={ref} {...props} />;
}

export default forwardRef(Transition);
