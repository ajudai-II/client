import React, { createContext, useEffect, useMemo, useState } from "react";
import { IUser } from "@/@types/user";
import { parseCookies } from "nookies";
import { useGetUserById } from "@/queries/userQueries";

interface IUserContext {
  user: IUser;
  reload: () => void;
}

const UserContext = createContext<IUserContext>({
  user: {} as IUser,
  reload: () => null,
});

interface IChildren {
  children: React.ReactNode;
}

export const UserContextProvider = ({ children }: IChildren) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const { user_id } = parseCookies();
  const { data, refetch: reload } = useGetUserById(user_id);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const value = useMemo(() => ({ user, reload }), [user, reload]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
