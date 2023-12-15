import { IDonation } from "@/@types/donation";

const homeMock: IDonation[] = [
  {
    _id: "1",
    title: "Mangá Naruto",
    description: "This is donation 1",
    amount: 100,
    category: "outros",
    picture: "https://img.olx.com.br/images/72/721389392490233.jpg",
    isValidated: true,
    donator: {
      _id: '2',
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
      adress: "123 Main St"
    }
  },
  {
    _id: "2",
    title: "Xícara de café",
    description: "This is donation 1",
    amount: 100,
    category: "alimentos",
    picture: "https://img.olx.com.br/images/72/721389392490233.jpg",
    isValidated: true,
    donator: {
      _id: '2',
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
      adress: "123 Main St"
    }
  },
];

export default homeMock;

