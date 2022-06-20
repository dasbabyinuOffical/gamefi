import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import Poker from "./Poker";
import uuid from "react-uuid";

function LeftPlayer() {
  const { pokerStore } = useStore();
  const [index, setIndex] = useState();

  useEffect(() => {
    setIndex(pokerStore.leftPokerIndex);
  }, [pokerStore.leftPokerIndex]);

  return (
    <div className="left">
      <div className="left-computer">
        <div className="computer-console">
          <div className="computer-info">
            <div className="headrole1"></div>
            <div className="player1">
              <span className="player-name" id="player-name">
                依米
              </span>
              <span className="player-roles" id="nongmin">
                {" "}
              </span>
              {pokerStore.allPoker.map((poker) => (
                <Poker key={uuid()} num={poker.num} color={poker.color} />
              ))}
            </div>
            <span className="jindou" id="jindou">
              3750
            </span>
          </div>
        </div>
        <div className="cards">
          <ul className="play_1"></ul>
          <nav className="computer-status">
            <div className="get-boss">
              <button className="get">抢地主</button>
              <button className="cancel">不抢</button>
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
        </div>
      </div>
    </div>
  );
}

export default observer(LeftPlayer);
