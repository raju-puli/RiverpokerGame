import React from "react";
import CardDefault from "../../../../../../assets/images/table/cards/cards2.png";
import { Group, Sprite } from "react-konva";
import cardSound from "../../../../../../assets/audio/Card.mp3";
import Konva from "konva";
import { getMuteValue } from "../../../../../utils/global";
import eventEmitter from "../../../../../utils/eventEmitter";
Konva.showWarnings = false;

// const orientation = JSON.parse(sessionStorage.getItem("DeviceOrientation"));

export class Card extends React.Component {
    constructor(props) {
        super(props);
        // console.log(orientation);
        // this.width = orientation?.Orientation === "portrait" ? 550 : 800;
        // this.width = 800;
        // this.width = window.innerWidth;
        this.width = 1600 / 2;
        this.state = {
            image: null,
            x: this.width / 2,
            y: 50,
            volumeMute: getMuteValue()
        };
        this.cardStyle = CardDefault;
        this.cardSound = new Audio(cardSound);
        this.animateCard = this.animateCard.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
    }

    // componentDidMount() {
    //     this.loadImage(CardDefault);
    //     window.addEventListener('resize', this.handleResize);
    //     eventEmitter.on("updatePlayerCards", this.animateCard);
    // }

    // componentWillUnmount() {
    //     window.removeEventListener('resize', this.handleResize);
    //     eventEmitter.off("updatePlayerCards", this.animateCard);

    //     if (this.image) {
    //         this.image.removeEventListener("load", this.handleLoad);
    //         this.image = null;  // Nullify the image to avoid stale references
    //     }

    //     // Clear any existing resize timeout
    //     if (this.resizeTimeout) {
    //         clearTimeout(this.resizeTimeout);
    //     }
    // }

    componentDidMount() {
        this.loadImage(CardDefault);
        window.addEventListener('resize', this.handleResize);

        // Check if listener already exists
        if (!eventEmitter.listeners("updatePlayerCards").includes(this.animateCard)) {
            setTimeout(() => {
                eventEmitter.on("updatePlayerCards", this.animateCard);
            }, 500);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        eventEmitter.off("updatePlayerCards", this.animateCard);

        if (this.image) {
            this.image.removeEventListener("load", this.handleLoad);
            this.image = null;
        }

        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
    }


    componentDidUpdate(prevProps) {
        if (this.cardStyle !== this.props.cardStyle) {
            this.loadImage(this.props.cardStyle);
            this.cardStyle = this.props.cardStyle;
        }
        if (this.props.x !== prevProps.x || this.props.y !== prevProps.y) {
            this.changeCardPosition();
        }
    }

    loadImage(img) {
        if (this.image) {
            this.image.removeEventListener("load", this.handleLoad);
        }
        this.image = new window.Image();
        this.image.src = img;
        this.image.addEventListener("load", this.handleLoad);
    }

    handleLoad() {
        this.setState({ image: this.image });
    }

    handleResize() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => this.animateCard(), 200);
    }

    changeCardPosition() {
        this.imageNode.to({
            x: this.props.x,
            y: this.props.y,
            duration: 0.5,
            easing: Konva.Easings.Linear
        });
    }

    pullDown() {
        // console.log("hittttttt pullDown");
        this.imageNode.to({
            y: this.props.y + 30,
            x: this.props.x,
            opacity: 0.35,
            duration: 0.5,
            easing: Konva.Easings.Linear,
            visible: false
        });
    }


    pullUp() {
        // console.log("hittttttt pull-UP");
        this.imageNode.to({
            y: this.props.y - 10,
            x: this.props.x,
            opacity: 0.35,
            duration: 0.5,
            easing: Konva.Easings.Linear,
            visible: true
        });
    }

    // pullUp() {
    //     console.log("hittttttt pull-UP")
    //     this.imageNode.to({
    //         y: this.props.y - 10,
    //         opacity: 1,
    //         duration: 0.5,
    //         easing: Konva.Easings.Linear
    //     });
    // };

    // pullUpCards() {
    //     console.log("reached")
    //     this.imageNode.to({
    //         y: this.props.y - 10,
    //         opacity: 1,
    //         duration: 0.5,
    //         easing: Konva.Easings.Linear
    //     });
    // }

    animateCard() {
        this.cardSound.muted = getMuteValue();
        this.cardSound.currentTime = 0;  // Restart sound from the beginning
        this.cardSound.play();
        this.imageNode?.to({
            x: this.props.x,
            y: this.props.y,
            scaleX: this.props.scale,
            scaleY: this.props.scale,
            visible: this.props.visible,
            rotation: this.props.angled,
            duration: 0.5,
            easing: Konva.Easings.EaseInOut,
            onFinish: () => {
                if (this.imageNode) {
                    this.imageNode?.to({
                        x: this.props.x,
                        y: this.props.y,
                        duration: 0.5,
                        easing: Konva.Easings.Linear
                    });
                }
            }
        });
    }

    render() {
        return (
            <Group>
                <Sprite
                    x={this.width / 2}
                    y={50}
                    ref={(node) => { this.imageNode = node; }}
                    image={this.state.image}
                    scaleX={0.15}
                    scaleY={0.15}
                    animations={{
                        cardFrame: this.props.frame
                    }}
                    animation="cardFrame"
                    frameRate={1}
                    frameIndex={0}
                    opacity={this.props.alpha}
                    visible={false}
                    rotation={0}
                />
            </Group>
        );
    }
}
