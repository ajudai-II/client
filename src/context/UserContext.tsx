import React, { createContext } from "react";
import { IUser } from "@/@types/user";

interface IUserContext {
  user: IUser;
  setUser: (user: IUser) => void;
}

const UserContext = createContext<IUserContext>({
  user: {} as IUser,
  setUser: () => {},
});

export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = React.useState<IUser>({} as IUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
