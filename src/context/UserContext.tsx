import { createContext, FC, useContext, useState } from "react";

interface User {
  id: number;
  email: string;
  tier: string;
}

interface UserContextType {
  users: User[];
  addUser: (user: User) => void;
}

const UserContext = createContext<UserContextType>({
  users: [],
  addUser: () => {},
});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider: FC = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: User) => {
    setUsers([...users, user]);
  };

  return (
    <UserContext.Provider value={{ users, addUser }}>
      {children}
    </UserContext.Provider>
  );
};