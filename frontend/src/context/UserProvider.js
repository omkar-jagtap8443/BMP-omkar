
import { useState } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  // Replace with actual user fetching/auth logic
  const [user, setUser] = useState({
    id: "demo-user-id-123", // Replace with real user id from auth
    name: "Demo User"
  });

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
