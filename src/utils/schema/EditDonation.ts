import { mixed, number, object, string } from "yup";

const schema = object({
  title: string(),
  description: string(),
  amount: number(),
  picture: mixed(),
});

export default schema;
