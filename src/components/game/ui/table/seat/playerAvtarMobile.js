import React from "react";
// import { Group, Image, Layer, Stage } from 'react-konva';
import { Circle } from 'react-konva';
import defaultAvtar from "../../../../../assets/images/lobby_icons/profile/icon_avatar.png";

export class PlayerAvtarMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      x: 75,
      y: 75,
      imageWidth: 0,
      imageHeight: 0
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

    this.setState({
      imageWidth: this.image.width,
      imageHeight: this.image.height
    });

  };

  render() {
    const { x, y, width, height } = this.props;
    const radius = Math.min(width, height) / 2
    // const radius = Math.min(width, height) / 2
    return (
      //   <Image
      //   cornerRadius={Math.min(width, height) / 2}
      //   x={x}
      //   style={{borderRadius:"50%"}}
      //   y={y}
      //   width={width}
      //   height={height}
      //   image={this.state.image}
      //   ref={node => { this.imageNode = node; }}
      // />
      /*================================= Circle Avatar Start ==========================================*/
      <Circle
        x={x + radius}
        y={y + radius}
        radius={radius}

        fillPatternImage={this.state.image}
        fillPatternRepeat="no-repeat"
        fillPatternScale={{ x: width / this.state.imageWidth, y: height / this.state.imageHeight }}

        stroke="#475069bf"
        strokeWidth="5"
        // fillPatternOffset={{ x: x + 3, y: y - 7 }}

        fillPatternOffset={{
          x: 35, // Center the image horizontally
          y: 35, // Center the image vertically
        }}
        ref={node => { this.imageNode = node; }}
      />
      /*================================= Circle Avatar End ==========================================*/
    );
  }
}
