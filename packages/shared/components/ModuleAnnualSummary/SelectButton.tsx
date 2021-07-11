import { Button } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { lighten } from "@material-ui/core/styles";
import { FC } from "react";

interface SelectButtonProps {
  index: number;
  value: number;
  onClick: (index: number) => void;
}

const SelectButton: FC<SelectButtonProps> = ({ index, value, onClick, ...props }) => {
  const theme = useTheme();
  const selected = index === value;

  const handleClick = () => {
    onClick(index);
  };

  return (
    <Button
      style={{ background: selected && lighten(theme.palette.primary.main, 0.8) }}
      onClick={handleClick}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default SelectButton;
