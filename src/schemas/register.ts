import { object, string } from "yup";

export const registerSchema = object({
  name: string()
    .required("Campo obrigatório")
    .min(3, "Nome deve conter no mínimo 3 caracteres"),
  email: string().email("Formato inválido").required("Campo obrigatório"),
  phone: string().required("Campo obrigatório"),
  cpf: string()
    .required("Campo obrigatório")
    .min(11, "CPF deve conter 11 caracteres")
    .max(11, "CPF deve conter 11 caracteres"),
  password: string()
    .required("Campo obrigatório")
    .min(8, "No mínimo 8 caracteres"),
});