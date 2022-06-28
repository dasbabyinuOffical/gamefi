import { useRef, useEffect, useState } from "react";
import fapai from "@/assets/music/fapai.mp3";
import "@/components/animate.css";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import uuid from "react-uuid";

function MidPlayer() {
  // 初始化存储
  const { pokerStore } = useStore();

  const [player, setPlayer] = useState({});

  // 初始化牌
  useEffect(() => {
    console.log("useEffect......");
    pokerStore.initMusic();
    pokerStore.initPokerList();
    setPlayer({
      step: "xipai",
    });
  }, []);

  // 洗牌audio
  const audioRef = useRef(null);
  const mediaRef = useRef(null);

  // 响应洗牌和发牌
  function playerAction() {
    if (player.step === "xipai") {
      clearPoker();
    }
    if (player.step === "fapai") {
      sendPoker();
    }
  }

  // 洗牌
  function clearPoker() {
    // 洗牌音效
    audioRef.current.play();
    // 洗牌动画
    pokerStore.animation();
    setTimeout(() => {
      audioRef.current.pause();
      setPlayer({
        step: "fapai",
      });
    }, 12000);
  }

  // 发牌
  function sendPoker() {
    // 播放发牌音乐
    pokerStore.setMusic("fapai");
    console.log("fapai:", pokerStore.music);
    mediaRef.current.play();
    setTimeout(() => {
      mediaRef.current.pause();
    }, 100 * pokerStore.pokerList.length);
    // 设置最后一张牌的动画效果
    pokerStore.pokerList.forEach((item, index) => {
      const css = {};
      if (index % 3 === 0) {
        css.animation = "send-1 1s";
      }
      if (index % 3 === 1) {
        css.animation = "send-2 1s";
      }
      if (index % 3 === 2) {
        css.animation = "send-3 1s";
      }
      setTimeout(() => {
        pokerStore.setAnimation(index, css);
      }, 100 * index);
      setTimeout(() => {
        pokerStore.hidePoker(index);
      }, 115 * index);
    });

    // 设置发牌后处理
    setTimeout(() => {
      pokerStore.removePokerList();
      pokerStore.sortPokers();
      pokerStore.setPokerPosition();

      // 设置开始抢地主
      pokerStore.grabBoss(10);
    }, 115 * pokerStore.pokerList.length);
  }

  return (
    <div className="mid">
      <div className="mid_top">
        <ul className="all_poker" onClick={playerAction}>
          {pokerStore.pokerList.map((item) => (
            <li
              className={item.class}
              key={item.index}
              style={{
                top: `${item.top}px`,
                left: `${item.left}px`,
                animation: item.animation,
                display: item.display,
              }}
            ></li>
          ))}
        </ul>
      </div>
      <div className="mid_end">
        <nav className="player-status">
          {" "}
          {/*状态栏*/}
          <div
            className="get-boss"
            style={{ display: pokerStore.round === 2 ? "block" : "none" }}
          >
            <button className="get" onClick={() => pokerStore.makeBoss(2)}>
              抢地主
            </button>
            <button className="cancel" onClick={() => pokerStore.grabBoss(10)}>
              不抢
            </button>
          </div>
          <div className="play-btn">
            <button className="tishi">提示</button>
            <button className="play">出牌</button>
            <button className="cancel">过牌</button>
          </div>
          <div
            className="timer"
            style={{ display: pokerStore.round === 2 ? "block" : "none" }}
          >
            <p className="time">{pokerStore.tick}</p>
          </div>
        </nav>
        <div className="player-console">
          {" "}
          {/*操作台*/}
          <div className="player-info">
            <div className="headrole2"></div> {/*玩家头像、角色、id*/}
            <div className="player2">
              <span className="player-name" id="player-name">
                袁林芳
              </span>
              <span className="player-roles" id="dizhu">
                {" "}
              </span>
            </div>
            <span className="jindou" id="jindou">
              3750
            </span>
          </div>
          <div className="cards">
            <ul className="play_2">
              {pokerStore.midPoker.map((poker) => (
                <li
                  key={uuid()}
                  data-num={poker.num}
                  data-color={poker.color}
                  style={{
                    width: "125px",
                    height: "175px",
                    background: `url(${poker.background}) ${poker.x}px ${poker.y}px`,
                    left: `${poker.left}px`,
                  }}
                ></li>
              ))}
            </ul>{" "}
            {/*手牌*/}
          </div>
        </div>
      </div>
      <div className="music1" style={{ position: "absolute" }}>
        <audio ref={audioRef} src={pokerStore.music}></audio>
      </div>
      <audio className="music2" ref={mediaRef} src={fapai} loop></audio>
    </div>
  );
}

export default observer(MidPlayer);
