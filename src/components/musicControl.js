import bgmusic from "@/assets/music/bgmusic.mp3";
import { useState, useRef, useEffect } from "react";
function MusicControl() {
  const [music, setMusic] = useState(true);
  const toggleMusic = () => {
    setMusic(!music);
  };

  useEffect(() => {
    if (!music) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [music]);

  const videoRef = useRef(null);

  return (
    <>
      <div className="music-control">
        <div
          className={music ? "music-on" : "music-stop"}
          onClick={toggleMusic}
        ></div>
      </div>
      <video
        style={{ display: "none" }}
        src={bgmusic}
        loop
        preload="auto"
        ref={videoRef}
      ></video>
    </>
  );
}

export default MusicControl;
