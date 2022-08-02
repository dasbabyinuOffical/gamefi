import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import uuid from "react-uuid";

function RightPlayer() {
  const { pokerStore } = useStore();
  return (
    <div className="right">
      <div className="right-computer">
        <div className="computer-console">
          <div className="computer-info">
            <div className="headrole3"></div>
            <div className="player3">
              <span className="player-name" id="player-name">
                大红花🌸
              </span>
              <span className="player-roles" id="nongmin">
                {" "}
              </span>
            </div>
            <span className="jindou" id="jindou">
              3750
            </span>
          </div>
        </div>
        <div className="cards">
          <ul className="play_3">
            {pokerStore.rightPoker.map((poker, index) => (
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
                className={poker.on ? "on" : ""}
                onClick={() => {
                  pokerStore.rightPoker[index].on =
                    !pokerStore.rightPoker[index].on;
                }}
              ></li>
            ))}
          </ul>
          <nav className="computer-status">
            <div
              className="get-boss"
              style={{ display: pokerStore.round === 3 ? "block" : "none" }}
            >
              <button className="get" onClick={() => pokerStore.makeBoss(3)}>
                抢地主
              </button>
              <button
                className="cancel"
                onClick={() => pokerStore.grabBoss(10)}
              >
                不抢
              </button>
            </div>
            <div
              className="play-btn"
              style={{
                display: pokerStore.currentPlayer === 3 ? "block" : "none",
              }}
            >
              <button className="tishi">提示</button>
              <button className="play">出牌</button>
              <button className="cancel">过牌</button>
            </div>
            <div
              className="timer"
              style={{ display: pokerStore.round === 3 ? "block" : "none" }}
            >
              <p className="time">{pokerStore.tick}</p>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default observer(RightPlayer);
