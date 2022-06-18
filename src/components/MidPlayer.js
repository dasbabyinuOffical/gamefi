import { useState, useRef, useEffect } from "react";
import xipai from "@/assets/music/xipai.mp3";
import "@/components/animate.css";

function MidPlayer() {
  //初始牌
  const [pokers, setPokers] = useState([]);
  useEffect(() => {
    const pokerList = [];
    for (let i = 0; i < 54; i++) {
      pokerList.push({
        index: i,
        class: "back",
        top: "-" + i + "px",
        animation: "",
      });
    }
    setPokers(pokerList);
  }, []);

  // 洗牌audio
  const audioRef = useRef(null);

  // 洗牌
  function clearPoker() {
    //把初始牌组数据的顺序打乱,想乱一些，i的值可以设置更大一些
    // 洗牌音效
    audioRef.current.play();

    const pokerList = pokers.map((item, index) => {
      if (index < 27) {
        item.animation = "run-1-0 9s linear " + index / 10 + "s 1";
      } else {
        item.animation = "run-1-0 6s linear " + index / 10 + "s 1";
      }
      return item;
    });
    setPokers(pokerList);
    setTimeout(() => {
      audioRef.current.pause();
    }, 12000);
  }

  return (
    <div className="mid">
      <div className="mid_top">
        <ul className="all_poker" onClick={clearPoker}>
          {pokers.map((item) => (
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
        <audio ref={audioRef} src={xipai}></audio>
      </div>
    </div>
  );
}

export default MidPlayer;
