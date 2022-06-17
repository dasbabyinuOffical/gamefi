import LoginStore from "./loginStore";
import React from "react";

class RootStore {
  constructor() {
    this.loginStore = new LoginStore();
  }
}

// 导出useStore context
const rootStore = new RootStore();
const context = React.createContext(rootStore);

const useStore = () => React.useContext(context);

export { useStore };
