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
    picture: "",
    amount: 0,
    category: "",
    isValidated: false,
    donator: {
      name: "",
      email: "",
      phone: "",
      adress: "",
      _id: "",
    },
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
    picture: "",
    amount: 0,
    category: "",
    isValidated: false,
    donator: {
      name: "",
      email: "",
      phone: "",
      adress: "",
      _id: "",
    },
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
