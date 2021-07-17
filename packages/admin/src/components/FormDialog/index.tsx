import { Button, Dialog, DialogActions, DialogProps, DialogTitle } from "@material-ui/core";
import React, { FC } from "react";
import ModalContent, { ModalContentProps } from "shared/components/ModalContent";

type FormDialogMode = "registration" | "edition";

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
  ModalContentProps?: Partial<ModalContentProps>;
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

      <ModalContent spacing={rest.contentSpacing} dividers {...rest.ModalContentProps}>
        {rest.children}
      </ModalContent>
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
    </Dialog>
  );
};

FormDialog.defaultProps = {
  contentSpacing: 2,
  mode: "edition",
};

export default FormDialog;
