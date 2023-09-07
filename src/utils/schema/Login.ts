import { object, string } from "yup";

const schema = object({
  email: string().email("Formato inválido").required("Campo obrigatório"),
  password: string()
    .required("Campo obrigatório")
    .min(8, "No mínimo 8 caracteres"),
});

export default schema;
