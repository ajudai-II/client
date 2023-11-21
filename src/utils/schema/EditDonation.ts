import { number, object, string } from "yup";

const schema = object({
  title: string(),
  description: string(),
  amount: number(),
});

export default schema;
