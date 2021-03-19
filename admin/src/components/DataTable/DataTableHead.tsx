import { Checkbox, TableCell, TableHead, TableRow } from "@material-ui/core";

interface DataGridHeadProps<T> {}

export default function DataGridHead<T>() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Checkbox />
        </TableCell>
        {}
      </TableRow>
    </TableHead>
  );
}
