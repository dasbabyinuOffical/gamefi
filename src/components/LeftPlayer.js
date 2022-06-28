import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import uuid from "react-uuid";

function LeftPlayer() {
  const { pokerStore } = useStore();

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

              <span className="jindou" id="jindou">
                3750
              </span>
            </div>
          </div>
        </div>
        <div className="cards">
          <ul className="play_1">
            {pokerStore.leftPoker.map((poker) => (
              <li
                key={uuid()}
                data-num={poker.num}
                data-color={poker.color}
                style={{
                  width: "125px",
                  height: "175px",
                  background: `url(${poker.background}) ${poker.x}px ${poker.y}px`,
                  top: `${poker.top}px`,
                }}
              ></li>
            ))}
          </ul>
          <div className="computer-status">
            <div
              className="get-boss"
              style={{ display: pokerStore.round === 1 ? "block" : "none" }}
            >
              <button
                className="get"
                onClick={() => {
                  console.log("click get");
                }}
              >
                抢地主
              </button>
              <button
                className="cancel"
                onClick={() => pokerStore.grabBoss(10)}
              >
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
              style={{ display: pokerStore.round === 1 ? "block" : "none" }}
            >
              <p className="time">{pokerStore.tick}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(LeftPlayer);
