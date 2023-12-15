import React, { createContext, useEffect, useMemo, useState } from "react";
import { IUser } from "@/@types/user";
import { parseCookies } from "nookies";
import { useGetUserById } from "@/queries/userQueries";

interface IUserContext {
  user: IUser;
}

const UserContext = createContext<IUserContext>({
  user: {} as IUser,
});

interface IChildren {
  children: React.ReactNode;
}

export const UserContextProvider = ({ children }: IChildren) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const { user_id } = parseCookies();
  const { data } = useGetUserById(user_id);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const value = useMemo(() => ({ user }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
