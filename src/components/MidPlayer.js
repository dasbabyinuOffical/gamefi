import { useRef, useEffect, useState } from "react";
import fapai from "@/assets/music/fapai.mp3";
import "@/components/animate.css";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";

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
    console.log("fapai");
  }

  return (
    <div className="mid">
      <div className="mid_top">
        <div>{pokerStore.aa}</div>
        <ul className="all_poker" onClick={playerAction}>
          {pokerStore.pokerList.map((item) => (
            <li
              className={item.class}
              key={item.index}
              style={{ top: item.top, animation: item.animation }}
            ></li>
          ))}
        </ul>
      </div>
      <div className="mid_end">
        <nav className="player-status">
          {" "}
          {/*状态栏*/}
          <div className="get-boss">
            <button className="get">抢地主</button>
            <button className="cancel"> 不抢</button>
          </div>
          <div className="play-btn">
            <button className="tishi">提示</button>
            <button className="play">出牌</button>
            <button className="cancel">过牌</button>
          </div>
          <div className="timer">
            <p className="time"></p>
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
            <ul className="play_2"></ul> {/*手牌*/}
          </div>
        </div>
      </div>
      <div className="music1" style={{ position: "absolute" }}>
        <audio ref={audioRef} src={pokerStore.music}></audio>
      </div>
      <audio className="music2" src={fapai}></audio>
    </div>
  );
}

export default observer(MidPlayer);
