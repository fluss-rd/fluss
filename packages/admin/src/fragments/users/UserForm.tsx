import { yupResolver } from "@hookform/resolvers";
import { MenuItem } from "@material-ui/core";
import { Info, RadioButtonChecked, Security } from "@material-ui/icons";
import { mockRoles } from "models/role";
import UserStatus, { userStatusList, userStatusToString } from "models/user-status";
import React, { ForwardedRef, forwardRef, useImperativeHandle } from "react";
import { Controller, useForm, UseFormMethods } from "react-hook-form";
import FormField from "shared/components/FormField";
import FormIconTitle from "shared/components/FormIconTitle";
import FormSelect from "shared/components/FormSelect";
import * as yup from "yup";

interface UserFormProps {}

export interface UserFormRef {
  form: UseFormMethods<UserFormModel>;
}

const UserForm = forwardRef((props: UserFormProps, ref: ForwardedRef<UserFormRef>) => {
  const form = useForm<UserFormModel>({ resolver: yupResolver(schema) });
  const roles = mockRoles();

  useImperativeHandle(ref, () => ({ form }), []);

  return (
    <>
      <FormIconTitle Icon={Info} title="Datos del usuario" />
      <FormField
        name="name"
        label="Nombre"
        inputRef={form.register}
        error={!!form.errors.name}
        helperText={form.errors.name?.message}
      />
      <FormField
        name="surname"
        label="Apellido"
        inputRef={form.register}
        error={!!form.errors.surname}
        helperText={form.errors.surname?.message}
      />
      <FormField
        name="email"
        label="Email"
        type="email"
        inputRef={form.register}
        error={!!form.errors.email}
        helperText={form.errors.email?.message}
      />

      <br />

      <FormIconTitle Icon={Security} title="Asignar rol" />

      <Controller
        name="rolName"
        control={form.control}
        defaultValue=""
        as={
          <FormSelect
            noneText="Sin seleccionar"
            label="Rol"
            helperText={form.errors.rolName?.message}
            error={!!form.errors.rolName}
          >
            {roles.map((rol) => (
              <MenuItem key={rol.id} value={rol.name}>
                {rol.name}
              </MenuItem>
            ))}
          </FormSelect>
        }
      />

      <br />

      <FormIconTitle Icon={RadioButtonChecked} title="Asignar rol" />

      <Controller
        name="status"
        control={form.control}
        defaultValue={"active" as UserStatus}
        as={
          <FormSelect
            noneText="Sin seleccionar"
            label="Estado"
            helperText={form.errors.status?.message}
            error={!!form.errors.status}
          >
            {userStatusList.map((status) => {
              const statusText = userStatusToString(status);
              return (
                <MenuItem key={status} value={status}>
                  {statusText}
                </MenuItem>
              );
            })}
          </FormSelect>
        }
      />
    </>
  );
});

export default UserForm;

const schema = yup.object().shape({
  name: yup.string().required("Debe ingresar un nombre para el usuario"),
  surname: yup.string().required("Debe ingresar un apellido para el usuario"),
  rolName: yup.string().required("Debe ingresar un nombre para el usuario"),
  status: yup.string().required("Debe indicar el estado del usuario"),
  email: yup
    .string()
    .required("Debe ingresar un email para el usuario")
    .email("Debe ingresar un correo válido. Ej: usuario@email.com"),
});

export type UserFormModel = {
  name: string;
  surname: string;
  rolName: string;
  status: string;
  email: string;
};
