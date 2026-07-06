"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import type {
  GlobalContextProps,
  GlobalData,
  GlobalParameters,
} from "@/interfaces/global.interfaces";

export const GlobalContext = createContext<GlobalContextProps | undefined>(
  undefined,
);

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Omit<GlobalParameters, "loading">>({
    user: "ADMIN",
  });
  const [loading, setLoading] = useState(true);
  const [globalData, setGlobalData] = useState<GlobalData>({});

  useEffect(() => {
    const { pathname, search } = window.location,
      searchParams = new URLSearchParams(search),
      arrGlobalData: (keyof GlobalData)[] = ["user"];
    let hasChanged = false;

    const newSessionState: any = {},
      newGlobalData: GlobalData = {};

    arrGlobalData.forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        newGlobalData[key] = value.toUpperCase();
        newSessionState[key] = newGlobalData[key];
        hasChanged = true;
      }
    });

    if (hasChanged || Object.keys(newSessionState).length > 0) {
      window.history.replaceState({}, "", pathname);
      setGlobalData((prev: any) => ({ ...prev, ...newGlobalData }));
      setSession((prev: any) => ({ ...prev, ...newSessionState }));
    }

    setLoading(false);
  }, []);

  return (
    <GlobalContext.Provider
      value={{ ...session, loading, globalData, setGlobalData }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error(
      "useGlobalContext debe usarse dentro de GlobalContextProvider",
    );
  return context;
};

export default GlobalContextProvider;
