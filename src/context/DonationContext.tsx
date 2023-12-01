import { IDonation } from "@/@types/donation";
import React, { useState, createContext } from "react";

interface DonationContextType {
  donation: IDonation;
  setDonation: React.Dispatch<React.SetStateAction<IDonation>>;
  donationUpdated: {};
  setDonationUpdated: React.Dispatch<React.SetStateAction<{}>>;
}

interface IChildren {
  children: React.ReactNode;
}

export const DonationContext = createContext<DonationContextType>({
  donation: {
    _id: "",
    title: "",
    description: "",
    amount: 0,
    isValidated: false,
    donator: {
      name: "",
      email: "",
      phone: "",
      adress: "",
      _id: "",
    },
    imageUrl: "",
    category: "",
  },
  setDonation: () => {},
  donationUpdated: {},
  setDonationUpdated: () => {},
});

const DonationContextProvider = ({ children }: IChildren) => {
  const [donation, setDonation] = useState<IDonation>({
    _id: "",
    title: "",
    description: "",
    amount: 0,
    isValidated: false,
    donator: {
      name: "",
      email: "",
      phone: "",
      adress: "",
      _id: "",
    },
    imageUrl: "",
    category: "",
  });
  const [donationUpdated, setDonationUpdated] = useState({});

  return (
    <DonationContext.Provider
      value={{ donation, setDonation, donationUpdated, setDonationUpdated }}
    >
      {children}
    </DonationContext.Provider>
  );
};

export default DonationContextProvider;
