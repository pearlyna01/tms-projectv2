// Used to pass session to pages
import { useContext, createContext } from "react";

// create new context for app
export const AppContext = createContext(null);

// useContext for React Hook to access the context
export function useAppContext() {
  return useContext(AppContext);
}
