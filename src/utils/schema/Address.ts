import { object, string } from "yup";

const schema = object({
  cep: string().required("Campo obrigatório"),
  uf: string().required("Campo obrigatório").min(2).max(2),
  city: string().required("Campo obrigatório"),
  neighborhood: string().required("Campo obrigatório"),
  street: string().required("Campo obrigatório"),
  number: string().required("Campo obrigatório"),
  complement: string().required("Campo obrigatório")
});

export default schema;
