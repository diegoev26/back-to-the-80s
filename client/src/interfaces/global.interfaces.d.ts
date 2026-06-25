export interface GlobalData {
  user?: string;
}

export interface GlobalParameters extends GlobalData {
  loading: boolean;
}

export interface GlobalContextProps extends GlobalParameters {
  globalData: GlobalData;
  setGlobalData: React.Dispatch<React.SetStateAction<GlobalData>>;
}
