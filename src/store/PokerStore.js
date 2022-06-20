import { makeAutoObservable, observable } from "mobx";
import xipai from "@/assets/music/xipai.mp3";
import fapai from "@/assets/music/fapai.mp3";
import { calcPosition } from "@/utils/util";

class PokerStore {
  pokerList = observable([]);
  allPoker = observable([]);
  leftPoker = observable([]);
  midPoker = observable([]);
  rightPoker = observable([]);
  constructor() {
    makeAutoObservable(this);
    this.music = "";
    this.initAllPoker();
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

    // 分发用户的牌
    if (index >= 52) {
      return;
    }
    const position = calcPosition(
      this.allPoker[index].num,
      this.allPoker[index].color
    );
    this.allPoker[index].x = position.x;
    this.allPoker[index].y = position.y;
    this.allPoker[index].background = position.background;

    if (index % 3 === 0) {
      this.allPoker[index].top = this.leftPoker.length * 20;
      this.leftPoker.push(this.allPoker[index]);
    }
    if (index % 3 === 1) {
      this.allPoker[index].left = this.midPoker.length * 25;
      this.midPoker.push(this.allPoker[index]);
    }
    if (index % 3 === 2) {
      this.allPoker[index].top = this.rightPoker.length * 20;
      this.rightPoker.push(this.allPoker);
    }
  };

  removePokerList = (index) => {
    this.pokerList.splice(index, 1);
  };
}

export default PokerStore;
