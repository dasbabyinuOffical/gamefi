import LoginStore from "./loginStore";
import PokerStore from "./PokerStore";
import React from "react";

class RootStore {
  constructor() {
    this.loginStore = new LoginStore();
    this.pokerStore = new PokerStore();
  }
}

// 导出useStore context
const rootStore = new RootStore();
const context = React.createContext(rootStore);

const useStore = () => React.useContext(context);

export { useStore };
