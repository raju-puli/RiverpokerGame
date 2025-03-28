import React from "react";
import { Image } from 'react-konva';
import defaultAvtar from "../../../../../assets/images/lobby_icons/profile/icon_avatar.png";

export class PlayerAvtar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      x: 75,
      y: 75
    };
  }

  componentDidMount() {
    this.loadImage();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.avtar !== this.props.avtar) {
      this.loadImage();
    }
  }

  componentWillUnmount() {
    if (this.image) {
      this.image.removeEventListener('load', this.handleLoad);
    }
  }

  // getPlayersAvatars(playerAvatar) {
  //   if (playerAvatar) {
  //     if (playerAvatar.indexOf("data:image/png;base64,") !== -1) {
  //       let base64Data = playerAvatar.split("data:image/png;base64,")[1];
  //       return base64Data;
  //     } else {
  //       const lastThreeChars = playerAvatar.slice(-3);
  //       const totalAvatars = this.props.setAvatars;
  //       if (totalAvatars) {
  //         for (const avatar of totalAvatars) {
  //           if (avatar.id.endsWith(lastThreeChars)) {
  //             return avatar.imageData;
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return null;
  // }

  getPlayersAvatars(playerAvatar) {
    if (playerAvatar) {
      if (playerAvatar.indexOf("data:image/png;base64,") !== -1) {
        let base64Data = playerAvatar.split("data:image/png;base64,")[1];
        return base64Data;
      } else {
        const lastThreeChars = playerAvatar.slice(-2);
        const totalAvatars = this.props.setAvatars;

        if (Array.isArray(totalAvatars)) {
          for (const avatar of totalAvatars) {
            if (avatar.id.endsWith(lastThreeChars)) {
              // console.log(avatar)
              return avatar.imageData;
            }
          }
        } else {
          console.error("setAvatars is not iterable. Expected an array but got:", totalAvatars);
        }
      }
    }
    return null;
  }



  loadImage() {
    if (this.image) {
      this.image.removeEventListener('load', this.handleLoad);
    }

    this.image = new window.Image();
    const avatarSrc = this.getPlayersAvatars(this.props.avtar) ? `data:image/jpeg;base64,${this.getPlayersAvatars(this.props.avtar)}` : defaultAvtar;
    if (avatarSrc) {
      this.image.src = avatarSrc;
    } else {
      console.error("Avatar image source not found");
      return;
    }

    this.image.addEventListener('load', this.handleLoad);
  }

  handleLoad = () => {
    this.setState({ image: this.image });
  };

  render() {
    const { x, y, width, height } = this.props;
    return (
      <Image
        cornerRadius={50}
        x={x + 64.5}
        y={y - 54}
        width={width}
        height={height}
        image={this.state.image}
        ref={node => { this.imageNode = node; }}
      />
    );
  }
}
