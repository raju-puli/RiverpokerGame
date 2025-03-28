import React, { Component } from "react";
import { Layer } from "react-konva";

import { Card } from "../seat/cards/card";
// import cardSound from "../../../../../assets/audio/Card.mp3";

import CardDefault from "../../../../../assets/images/table/cards/cards1.png";
import CardStyleOne from "../../../../../assets/images/table/cards/cards2.png";
import CardStyleTwo from "../../../../../assets/images/table/cards/cards3.png";
import CardStyleThree from "../../../../../assets/images/table/cards/cards4.png";
import CardStyleFour from "../../../../../assets/images/table/cards/cards5.png";
// import Screen from "../../../../utils/screen";
import { getDealerCardAnimation } from "../../../../utils/global";
export default class RitBoardCards extends Component {
    constructor(props) {
        super(props);
        this.sWidth = window.innerWidth;
        this.hWidth = window.innerHeight;
        let targetWidth = this.props.width - (this.props.tableOriantationLandscape ? 0 : 8);
        this.y = this.props.tableOriantationLandscape ? 215 : 305;
        this.x = targetWidth * 0.5;

        this.state = {
            flopZero: { y: 0, alpha: 1, show: false },
            flopOne: { y: 0, alpha: 1, show: false },
            flopTwo: { y: 0, alpha: 1, show: false },
            turn: { y: 0, alpha: 1, show: false },
            river: { y: 0, alpha: 1, show: false },
            flopZeroCard: "2c",
            flopOneCard: "Ac",
            flopTwoCard: "Ac",
            turnCard: "Ac",
            riverCard: "Ac",
            cardStyle: CardDefault,
            // stageWidth: stageWidthPixels,
            // stageHeight: stageHeightPixels
        };
        this.mapCards = {
            Ac: [0, 0, 53, 73],
            "2c": [53, 0, 53, 73],
            "3c": [106, 0, 53, 73],
            "4c": [159, 0, 53, 73],
            "5c": [212, 0, 53, 73],
            "6c": [265, 0, 53, 73],
            "7c": [318, 0, 53, 73],
            "8c": [371, 0, 53, 73],
            "9c": [424, 0, 53, 73],
            Tc: [477, 0, 53, 73],
            Jc: [530, 0, 53, 73],
            Qc: [583, 0, 53, 73],
            Kc: [636, 0, 53, 73],

            Ad: [0, 73, 53, 73],
            "2d": [53, 73, 53, 73],
            "3d": [106, 73, 53, 73],
            "4d": [159, 73, 53, 73],
            "5d": [212, 73, 53, 73],
            "6d": [265, 73, 53, 73],
            "7d": [318, 73, 53, 73],
            "8d": [371, 73, 53, 73],
            "9d": [424, 73, 53, 73],
            Td: [477, 73, 53, 73],
            Jd: [530, 73, 53, 73],
            Qd: [583, 73, 53, 73],
            Kd: [636, 73, 53, 73],

            Ah: [0, 146, 53, 73],
            "2h": [53, 146, 53, 73],
            "3h": [106, 146, 53, 73],
            "4h": [159, 146, 53, 73],
            "5h": [212, 146, 53, 73],
            "6h": [265, 146, 53, 73],
            "7h": [318, 146, 53, 73],
            "8h": [371, 146, 53, 73],
            "9h": [424, 146, 53, 73],
            Th: [477, 146, 53, 73],
            Jh: [530, 146, 53, 73],
            Qh: [583, 146, 53, 73],
            Kh: [636, 146, 53, 73],

            As: [0, 219, 53, 73],
            "2s": [53, 219, 53, 73],
            "3s": [106, 219, 53, 73],
            "4s": [159, 219, 53, 73],
            "5s": [212, 219, 53, 73],
            "6s": [265, 219, 53, 73],
            "7s": [318, 219, 53, 73],
            "8s": [371, 219, 53, 73],
            "9s": [424, 219, 53, 73],
            Ts: [477, 219, 53, 73],
            Js: [530, 219, 53, 73],
            Qs: [583, 219, 53, 73],
            Ks: [636, 219, 53, 73],
        };
        this.cardsArray = [];
        this.tableCards = [];
        // this.cardSound = new Audio(cardSound);
        this.flopZeroCardRef = React.createRef();
        this.flopOneCardRef = React.createRef();
        this.flopTwoCardRef = React.createRef();
        this.turnCardRef = React.createRef();
        this.riverCardRef = React.createRef();
    }

    componentDidUpdate() {
        let targetWidth = this.props.width - (this.props.tableOriantationLandscape ? 0 : 8);
        this.y = this.props.tableOriantationLandscape ? 215 : 305;
        this.x = targetWidth * 0.5;
    }

    setCardStyle(style) {
        switch (style) {
            case "default":
                this.setState({ cardStyle: CardDefault });
                break;
            case "frontCard1":
                this.setState({ cardStyle: CardStyleOne });
                break;
            case "frontCard2":
                this.setState({ cardStyle: CardStyleTwo });
                break;
            case "frontCard3":
                this.setState({ cardStyle: CardStyleThree });
                break;
            case "frontCard4":
                this.setState({ cardStyle: CardStyleFour });
                break;
            default:
                this.setState({ cardStyle: CardDefault });
                break;
        }
    }

    addCards(card, text, delay) {
        switch (card) {
            case "flopZero":
                this.setState({ flopZeroCard: text, flopZero: { y: 0, alpha: 1, show: true } }, () => {
                    this.flopZeroCardRef.current.animateCard();
                });

                break;
            case "flopOne":
                setTimeout(() => {
                    this.setState({ flopOneCard: text, flopOne: { y: 10, alpha: 1, show: true } });
                    this.flopOneCardRef.current.animateCard();

                    // this.cardSound.play()
                }, delay);
                break;
            case "flopTwo":
                setTimeout(() => {
                    this.setState({ flopTwoCard: text, flopTwo: { y: 10, alpha: 1, show: true } });
                    this.flopTwoCardRef.current.animateCard();
                    // this.cardSound.play()
                }, delay);
                break;
            case "turn":
                setTimeout(() => {
                    this.setState({ turnCard: text, turn: { y: 10, alpha: 1, show: true } });
                    // this.cardSound.play();
                    this.turnCardRef.current.animateCard();
                }, delay);

                break;
            case "river":
                setTimeout(() => {
                    this.setState({ riverCard: text, river: { y: 10, alpha: 1, show: true } });
                    // this.cardSound.play();
                    this.riverCardRef.current.animateCard();
                }, delay);

                break;
            default:
                break;
        }
    }
    showWinningCombination(data) {
        this.setState({ flopZero: { y: 10, alpha: 0.5, show: true }, flopOne: { y: 10, alpha: 0.5, show: true }, flopTwo: { y: 10, alpha: 0.5, show: true }, turn: { y: 10, alpha: 0.5, show: true }, river: { y: 10, alpha: 0.5, show: true } });
        for (let i = 0; i < data.length; i++) {
            switch (Number(data[i].attr.id)) {
                case 0:
                    this.setState({ flopZero: { y: 0, alpha: 1, show: true } });
                    this.flopZeroCardRef.current.pullUp();
                    break;
                case 1:
                    this.setState({ flopOne: { y: 0, alpha: 1, show: true } });
                    this.flopOneCardRef.current.pullUp();
                    break;
                case 2:
                    this.setState({ flopTwo: { y: 0, alpha: 1, show: true } });
                    this.flopTwoCardRef.current.pullUp();
                    break;
                case 3:
                    this.setState({ turn: { y: 0, alpha: 1, show: true } });
                    this.turnCardRef.current.pullUp();
                    break;
                case 4:
                    this.setState({ river: { y: 0, alpha: 1, show: true } });
                    this.riverCardRef.current.pullUp();
                    break;
                default:
                    break;
            }
        }
    }
    removeCards() {
        this.setState({ flopZero: { y: 10, alpha: 1, show: false }, flopOne: { y: 10, alpha: 1, show: false }, flopTwo: { y: 10, alpha: 1, show: false }, turn: { y: 10, alpha: 1, show: false }, river: { y: 10, alpha: 1, show: false } });
    }
    render() {
        // return <Stage container="ritBoardCards" width={this.state.stageWidth} height={this.state.stageHeight}>
        return (
            <Layer>
                {this.state.flopZero.show && <Card ref={this.flopZeroCardRef} x={this.x + this.props.xPadding * -2.5} y={this.y} frame={this.mapCards[this.state.flopZeroCard]} scale={this.props.scale} alpha={this.state.flopZero.alpha} show={this.state.flopZero.show} visible={getDealerCardAnimation()} cardStyle={this.state.cardStyle} angled={0}></Card>}
                {this.state.flopOne.show && <Card ref={this.flopOneCardRef} x={this.x + this.props.xPadding * -1.5} y={this.y} frame={this.mapCards[this.state.flopOneCard]} scale={this.props.scale} alpha={this.state.flopOne.alpha} show={this.state.flopOne.show} visible={getDealerCardAnimation()} cardStyle={this.state.cardStyle} angled={0}></Card>}
                {this.state.flopTwo.show && <Card ref={this.flopTwoCardRef} x={this.x + this.props.xPadding * -0.5} y={this.y} frame={this.mapCards[this.state.flopTwoCard]} scale={this.props.scale} alpha={this.state.flopTwo.alpha} show={this.state.flopTwo.show} visible={getDealerCardAnimation()} cardStyle={this.state.cardStyle} angled={0}></Card>}
                {this.state.turn.show && <Card ref={this.turnCardRef} x={this.x + this.props.xPadding * 0.5} y={this.y} frame={this.mapCards[this.state.turnCard]} scale={this.props.scale} alpha={this.state.turn.alpha} show={this.state.turn.show} visible={getDealerCardAnimation()} cardStyle={this.state.cardStyle} angled={0}></Card>}
                {this.state.river.show && <Card ref={this.riverCardRef} x={this.x + this.props.xPadding * 1.5} y={this.y} frame={this.mapCards[this.state.riverCard]} scale={this.props.scale} alpha={this.state.river.alpha} show={this.state.river.show} visible={getDealerCardAnimation()} cardStyle={this.state.cardStyle} angled={0}></Card>}
            </Layer>
        );
        // </Stage>
    }
}
