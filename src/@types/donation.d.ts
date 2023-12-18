import { IDonator } from "./donator";

export interface IDonation {
  data?: any;
  category?: string;
  _id: string;
  title: string;
  description: string;
  picture: string;
  amount: number;
  category: string;
  isValidated: boolean;
  donator: IDonator;
}
