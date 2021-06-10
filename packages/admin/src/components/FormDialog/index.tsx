import React, { FC } from "react";
import { Dialog, DialogTitle, DialogActions, Button, DialogProps } from "@material-ui/core";
import ModalContent from "shared/components/ModalContent";

type FormDialogMode = "registrion" | "edition";

interface FormDialogProps {
  title: string | JSX.Element;
  isOpen: boolean;
  mode?: FormDialogMode;
  contentSpacing?: number;
  onClose?: () => void;
  onSave?: () => void;
  saveAction?: string | JSX.Element;
  cancelAction?: string | JSX.Element;
  DialogProps?: Partial<DialogProps>;
}

const FormDialog: FC<FormDialogProps> = (props) => {
  const { isOpen, onClose, title, onSave, saveAction, cancelAction, ...rest } = props;

  return (
    <Dialog
      fullWidth
      disableBackdropClick
      disableEscapeKeyDown
      open={isOpen}
      maxWidth="md"
      aria-labelledby="form-dialog-title"
      {...rest.DialogProps}
    >
      {typeof title === "string" ? (
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      ) : (
        title
      )}

      <form noValidate autoComplete="off">
        <ModalContent spacing={rest.contentSpacing}>{rest.children}</ModalContent>
        <DialogActions>
          {typeof cancelAction === "string" || !cancelAction ? (
            <Button onClick={onClose} color="primary">
              {cancelAction || rest.mode === "edition" ? "Cancelar" : "Cerrar"}
            </Button>
          ) : (
            saveAction
          )}
          {typeof saveAction === "string" || !saveAction ? (
            <Button color="primary" onClick={onSave}>
              {saveAction || rest.mode === "edition" ? "Guardar cambios" : "Registrar"}
            </Button>
          ) : (
            saveAction
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

FormDialog.defaultProps = {
  contentSpacing: 2,
  mode: "edition",
};

export default FormDialog;

