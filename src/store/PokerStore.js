import { makeAutoObservable, observable } from "mobx";
import xipai from "@/assets/music/xipai.mp3";
import fapai from "@/assets/music/fapai.mp3";
import { calcPosition, loadOrStoreGold } from "@/utils/util";

class PokerStore {
  pokerList = observable([]);
  allPoker = observable([]);
  leftPoker = observable([]);
  midPoker = observable([]);
  rightPoker = observable([]);

  player = observable([]);
  gameData = {};

  //  当前应该是谁来出牌
  round = 0;
  // tick用来进行倒计时
  tick = 0;

  constructor() {
    makeAutoObservable(this);
    this.music = "";
    this.initAllPoker();
    this.initPlayer();
    this.initGameData();
  }

  // 设置1，2，3，分别为三个玩家出牌
  increaseRound = (times = 10) => {
    this.round = (this.round % 3) + 1;
    if (this.ticker !== undefined) {
      clearInterval(this.ticker);
      this.ticker = undefined;
    }
    // 开始倒计时
    this.tick = times;
    this.ticker = setInterval(() => {
      this.tick -= 1;
      if (this.tick === 0) {
        this.round = (this.round % 3) + 1;
        this.tick = 10;
      }
    }, times * 100);
  };

  initGameData = () => {
    /**
     * 用于保存当局游戏的数据
     */
    let gameData = {
      boss: null, //当前哪位玩家是地主
      play: null, //当前到哪位玩家出牌

      //  当前玩家选择中的的牌的数据
      select: {
        type: 0, //选中排队的牌型
        poker: [], //选中牌的数据
        max: 0, //选中牌的牌型中用于判断大小的值
      },

      //当前桌面牌组的数据
      desktop: {
        type: 0, //选中排队的牌型
        poker: [], //选中牌的数据
        max: 0, //选中牌的牌型中用于判断大小的值
      },

      multiple: 1, //本局游戏结算的倍数
    };
    this.gameData = gameData;
  };

  initPlayer = () => {
    let player = [
      {
        name: "玩家1",
        img: "",
        gold: 10000,
        poker: [],
      },
      {
        name: "玩家2",
        img: "",
        gold: 10000,
        poker: [],
      },
      {
        name: "玩家3",
        img: "",
        gold: 10000,
        poker: [],
      },
    ];

    // 将玩家的金豆值改为本地存储的值
    const goldarr = loadOrStoreGold();
    for (let i = 0; i < 3; i++) {
      player[i].gold = goldarr[i];
    }
    this.player = player;
  };

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
        display: "1",
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
      this.rightPoker.push(this.allPoker[index]);
    }
  };

  hidePoker = (index) => {
    this.pokerList[index].display = "none";
  };
  removePokerList = () => {
    this.pokerList = observable([]);
  };

  // 对牌排序
  sortPokers = () => {
    const pokers = [this.leftPoker, this.midPoker, this.rightPoker];
    pokers.forEach((element) => {
      element.sort((x, y) => {
        if (x.num !== y.num) {
          return x.num - y.num; // 如果点不同的话就按点数来排序
        } else {
          return x.color - y.color; // 如果点相同的话就按花色来的排序
        }
      });
    });
  };

  // 重新设置三者牌的排列顺序
  setPokerPosition = () => {
    this.leftPoker = this.leftPoker.map((item, index) => {
      item.top = index * 20;
      return item;
    });

    this.midPoker = this.midPoker.map((item, index) => {
      item.left = index * 25;
      return item;
    });

    this.rightPoker = this.rightPoker.map((item, index) => {
      item.top = index * 20;
      return item;
    });
  };

  // 抢地主函数
  grabBoss = (times) => {
    this.increaseRound(times);
  };

  // 确定地主
  makeBoss = (index) => {
    if (this.ticker !== undefined) {
      clearInterval(this.ticker);
      this.ticker = undefined;
    }
    this.round = 0;
    console.log("地主是:", index);
  };
}

export default PokerStore;
