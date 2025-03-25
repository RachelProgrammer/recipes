import { createContext, useContext } from "react";
import rootStore from "./store";

export const StoreContext = createContext(rootStore);

export const useStore = () => useContext(StoreContext);
