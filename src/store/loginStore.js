import { makeAutoObservable } from "mobx";
import startbg from "@/assets/images/startbg.mp4";

class LoginStore {
  bg = startbg;
  constructor() {
    makeAutoObservable(this);
  }
  setBg = (bg) => {
    this.bg = bg;
  };
  getBg = () => {
    return this.bg;
  };
}

export default LoginStore;
