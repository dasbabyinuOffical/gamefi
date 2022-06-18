import { makeAutoObservable, observable } from "mobx";
import xipai from "@/assets/music/xipai.mp3";
import fapai from "@/assets/music/fapai.mp3";
class PokerStore {
  pokerList = observable([]);
  constructor() {
    makeAutoObservable(this);
    this.music = "";
  }

  initMusic = () => {
    console.log("initMusic");
    // 初始化设置洗牌
    this.music = xipai;
  };

  initPokerList = () => {
    console.log("initPokerList");
    // 初始化一副牌
    this.pokerList = observable([]);
    for (let i = 0; i < 54; i++) {
      this.pokerList.push({
        index: i,
        class: "back",
        top: "-" + i + "px",
        animation: "",
      });
    }
  };

  setMusic = (action) => {
    if (action === "xipai") {
      this.music = xipai;
      return;
    }
    if (action === "fapai") {
      this.music = fapai;
    }
  };

  getMusic = () => {
    return this.music;
  };

  setPokerList = (pokerList) => {
    this.pokerList = pokerList;
  };

  animation = () => {
    const pokerList = this.pokerList.map((item, index) => {
      if (index < 27) {
        item.animation = "run-1-0 9s linear " + index / 10 + "s 1";
      } else {
        item.animation = "run-1-0 6s linear " + index / 10 + "s 1";
      }
      return item;
    });
    this.setPokerList(pokerList);
  };
}

export default PokerStore;
