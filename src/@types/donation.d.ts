import { IDonator } from "./donator";

export interface IDonation {
  _id: string;
  title: string;
  description: string;
  picture: string;
  amount: number;
  isValidated: boolean;
  donator: IDonator;
  imageUrl: string;
  category: string;
}