export interface IUser {
  address: string;
  _id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
  createdAt: Date;
}

export interface IBasicUser {
  _id: string;
  email: string;
  token: string;
}
