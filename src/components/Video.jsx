import React, { Component } from "react";
import ReactPlayer from "react-player";
import Sam from "../Video/TopQBeijing.mp4";

export default class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PlayGrond: Sam,
    };
  }

  render() {
    const { PlayGrond } = this.state;
    return (
      <div className="bg-video">
        <ReactPlayer
          url={PlayGrond}
          id="MainPlay"
          playing
          loop
          controls={true}
          width="100%"
          height="100vh"
          config={{
            file: {
              attributes: {
                style: {
                  width: "100%",
                  height: "100vh",
                  objectFit: "cover"
                }
              }
            }
          }}
        />
      </div>
    );
  }
}
