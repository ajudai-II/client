import { number, object, string } from "yup";

export const createDonationSchema = object({
  title: string()
    .required("Campo obrigatório")
    .min(7, "Título deve conter no mínimo 7 caracteres"),
  description: string()
    .required("Campo obrigatório")
    .min(7, "Descreva com mais detalhes"),
  amount: number().required("Campo obrigatório"),
  imageUrl: string().required("Insira imagem"),
  category: string()
    .required("Campo obrigatório")
    .oneOf(
      ["Alimentos", "Vestuário", "Educação", "Saúde", "Outros"],
      "Categoria inválida"
    ),
});
