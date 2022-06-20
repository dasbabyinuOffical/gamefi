import { makeAutoObservable, observable } from "mobx";
import xipai from "@/assets/music/xipai.mp3";
import fapai from "@/assets/music/fapai.mp3";
class PokerStore {
  pokerList = observable([]);
  allPoker = observable([]);
  pokerIndex = 0;
  constructor() {
    makeAutoObservable(this);
    this.music = "";
    this.initAllPoker();
  }

  get leftPokerIndex() {
    return this.pokerIndex;
  }

  get midPokerIndex() {
    return this.pokerIndex + 1;
  }

  get rightPokerIndex() {
    return this.pokerIndex + 2;
  }

  initAllPoker = () => {
    //将普通牌放入数据中
    for (let i = 1; i <= 13; i++) {
      for (let j = 0; j < 4; j++) {
        this.allPoker.push({ num: i, color: j });
      }
    }
    // 将大小王放入数据中
    this.allPoker.push({ num: 14, color: 0 });
    this.allPoker.push({ num: 14, color: 1 });
    for (let i = 0; i < 10; i++) {
      this.allPoker.sort(function (x, y) {
        return Math.random() - 0.5;
      });
    }
    console.log(this.allPoker);
  };

  initMusic = () => {
    console.log("initMusic");
    // 初始化设置洗牌
    this.setMusic("xipai");
  };

  initPokerList = () => {
    console.log("initPokerList");
    // 初始化一副牌
    this.pokerList = observable([]);
    for (let i = 0; i < 54; i++) {
      this.pokerList.push({
        index: i,
        class: "back",
        top: -i,
        animation: "",
        left: 0,
      });
    }
  };

  setMusic = (action) => {
    if (action === "xipai") {
      this.music = xipai;
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

  setAnimation = (index, css) => {
    this.pokerList[index].animation = css.animation;
    this.pokerList[index].top = css.top;
    this.pokerList[index].left = css.left;
  };
}

export default PokerStore;
