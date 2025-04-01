import { createContext, useContext, useState } from "react";
import { FUNCTION_NAMES } from "../constants";

const FunctionContext = createContext();

export function FunctionProvider({ children }) {
  const [currentFunc, setCurrentFunc] = useState(
    sessionStorage.getItem("currentFunc") || FUNCTION_NAMES.NEWS
  );

  return (
    <FunctionContext.Provider value={{ currentFunc, setCurrentFunc }}>
      {children}
    </FunctionContext.Provider>
  );
}

export function useFunctionContext() {
  return useContext(FunctionContext);
}
