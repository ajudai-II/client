import React, { createContext, useEffect } from "react";
import { IUser } from "@/@types/user";
import { parseCookies } from "nookies";
import { useGetUserById } from "@/queries/userQueries";

interface IUserContext {
  user: IUser;
}

const UserContext = createContext<IUserContext>({
  user: {} as IUser,
});

export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = React.useState<IUser>({} as IUser);
  const { user_id } = parseCookies();
  const { data } = useGetUserById(user_id);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserContext;
