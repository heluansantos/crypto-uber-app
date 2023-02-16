import React from "react";
import { PhantomContextProvider } from "./wallet/PhantomContext";

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => {
  return <PhantomContextProvider>{children}</PhantomContextProvider>;
};

export default AppProvider;
