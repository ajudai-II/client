export interface IAddress {
  cep: string;
  uf: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;
}

export interface IUser {
  picture: string | undefined;
  _id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
  createdAt: Date;
  addresses: IAddress[] | undefined;
}
