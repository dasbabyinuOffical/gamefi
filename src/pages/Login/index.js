import { Link } from "react-router-dom";
import startbg from "@/assets/images/startbg.mp4";
import "./index.scss";

function Login() {
  return (
    <>
      <div className="container">
        <div className="video-wrap">
          {/* preload="auto"页面加载后加载整个视频 loop：循环播放 */}
          <video
            className="video loop"
            src={startbg}
            preload="auto"
            muted
            loop
            autoPlay
          >
            <source src={startbg} type="video/mp4" />
          </video>
        </div>

        <div className="gamename"></div>
        <Link to="/" className="btn">
          <p>开始游戏</p>
        </Link>
        <Link to="/" className="btn">
          <p>开始游戏</p>
        </Link>
      </div>
    </>
  );
}

export default Login;
