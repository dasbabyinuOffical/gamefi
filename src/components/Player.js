import LeftPlayer from "./LeftPlayer";
import MidPlayer from "./MidPlayer";
import RightPlayer from "./RightPlayer";

function Player() {
  return (
    <div className="container">
      <LeftPlayer />
      <MidPlayer />
      <RightPlayer />
    </div>
  );
}

export default Player;
