import { object, string } from "yup";

const schema = object({
  name: string().required("Campo obrigatório").min(5, "No mínimo 5 caracteres"),
  email: string().email("Formato inválido").required("Campo obrigatório"),
  telefone: string().required("Campo obrigatório"),
  cpf: string().required("Campo obrigatório").min(11, "CPF deve conter 11 caracteres").max(11, "CPF deve conter 11 caracteres"),
  password: string()
    .required("Campo obrigatório")
    .min(8, "No mínimo 8 caracteres"),
});

export default schema;
