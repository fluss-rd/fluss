import { Button, DialogActions, DialogContentText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import FormField from "shared/components/FormField";
import ModalContent from "shared/components/ModalContent";

export type PermissionForm = {
  name: string;
  description: string;
};

interface PermissionModalFormProps {
  cancelForm?: () => void;
  onSaveForm?: (data: PermissionForm) => void;
  values?: PermissionForm;
}

const PermissionModalForm: FC<PermissionModalFormProps> = ({ values, onSaveForm, cancelForm }) => {
  const { handleSubmit, control, errors, formState } = useForm<PermissionForm>({
    mode: "onChange",
    defaultValues: { ...values },
  });

  const { isDirty, isValid } = formState;
  const classes = useStyles();
  const onSubmit = (data: PermissionForm) => onSaveForm(data);

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <ModalContent className={classes.content}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          as={
            <FormField
              label="Nombre"
              placeholder="Nombre del rol"
              helperText={errors.name ? errors.name.message : null}
              error={errors.name ? true : false}
            />
          }
          rules={{
            required: { value: true, message: "Ingrese un nombre para el permiso" },
            minLength: { value: 1, message: "Ingrese un nombre para el permiso" },
            maxLength: {
              value: 70,
              message: "El nombre debe tener como máximo 70 caracteres",
            },
          }}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          as={
            <FormField
              multiline
              rows={5}
              label="Descripción"
              placeholder="Descripción del permiso"
              helperText={errors.description ? errors.description.message : null}
              error={errors.description ? true : false}
            />
          }
          rules={{
            required: { value: true, message: "Debe ingresar la descripción para el permiso" },
            minLength: { value: 1, message: "Debe ingresar la descripción para el permiso" },
            maxLength: {
              value: 250,
              message: "Solo se permite un máximo de 250 caracteres para la descripción",
            },
          }}
        />
      </ModalContent>
      <DialogActions>
        <Button onClick={cancelForm} color="primary">
          Cancelar
        </Button>
        <Button color="primary" type="submit" disabled={!isDirty || !isValid}>
          Registrar
        </Button>
      </DialogActions>
    </form>
  );
};

PermissionModalForm.defaultProps = {
  values: { name: "", description: "" },
  cancelForm: () => {},
  onSaveForm: () => {},
};

const useStyles = makeStyles((theme) => ({
  content: {
    "& > *:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default PermissionModalForm;
