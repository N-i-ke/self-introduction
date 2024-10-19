import React, { Component } from "react";
import ReactPlayer from "react-player";
import TopVideo from "../Video/TopBeijing.mp4";

// プロパティの型を定義（今回はプロパティなしなので、空のオブジェクト）
interface VideoProps {}

// ステートの型を定義
interface VideoState {
  PlayGrond: string;
}

export default class Video extends Component<VideoProps, VideoState> {
  constructor(props: VideoProps) {
    super(props);
    this.state = {
      PlayGrond: TopVideo, // ビデオのURLをステートに設定
    };
  }

  render() {
    const { PlayGrond } = this.state;
    return (
      <div className="bg-video">
        <ReactPlayer
          url={PlayGrond}
          id="MainPlay"
          playing={true}
          loop={true}
          muted={true} // 自動再生が許可されるようにミュート
          controls={false}
          width="100%"
          height="100vh"
          config={{
            file: {
              attributes: {
                style: {
                  width: "100%",
                  height: "100vh",
                  objectFit: "cover",
                },
              },
            },
          }}
        />
      </div>
    );
  }
}
