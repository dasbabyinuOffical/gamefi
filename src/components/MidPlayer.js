import { useState } from "react";
import { useEffect } from "react";

function MidPlayer() {
  const [pokers, setPokers] = useState([]);

  useEffect(() => {
    const pokerList = [];
    for (let i = 0; i < 54; i++) {
      pokerList.push(i);
    }
    setPokers(pokerList);
  }, []);

  return (
    <div className="mid">
      <div className="mid_top">
        <ul className="all_poker">
          {pokers.map((item) => (
            <li className="back" key={item} style={{ top: `-${item}px` }}></li>
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
    </div>
  );
}

export default MidPlayer;
