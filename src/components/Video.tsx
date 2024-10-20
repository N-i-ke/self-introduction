import React, { Component } from "react";
import ReactPlayer from "react-player";
import TopVideo from "../Video/TopBeijing.mp4";
import styled from "styled-components";

interface VideoProps {}

interface VideoState {
  PlayGrond: string;
}

const VideoContainer = styled.div`
  width: 100%;
  height: 100vh;
  object-fit: cover;
`;

const MainPlay = styled(ReactPlayer)`
  width: 100%;
  height: 100vh;
  object-fit: cover;
`;

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
      <VideoContainer className="bg-video">
        <MainPlay
          url={PlayGrond}
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
      </VideoContainer>
    );
  }
}
