import { useContext } from "react";
import { DonationContext } from "../context/DonationContext";

export const useDonation = () => {
  return useContext(DonationContext);
};
