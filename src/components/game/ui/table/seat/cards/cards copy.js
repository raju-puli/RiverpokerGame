import React, { Component } from "react";
import { Group } from "react-konva";
import { Card } from "./card";
import cardSound from "../../../../../../assets/audio/Card.mp3";

import CardDefault from "../../../../../../assets/images/table/cards/cards1.png";
import CardStyleOne from "../../../../../../assets/images/table/cards/cards2.png";
import CardStyleTwo from "../../../../../../assets/images/table/cards/cards3.png";
import CardStyleThree from "../../../../../../assets/images/table/cards/cards4.png";
import CardStyleFour from "../../../../../../assets/images/table/cards/cards5.png";

export default class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFront: true,
            cardZero: { y: 0, show: false },
            cardOne: { y: 0, show: false },
            cardTwo: { y: 0, show: false },
            cardThree: { y: 0, show: false },
            cardFour: { y: 0, show: false },
            cardFive: { y: 0, show: false },
            cardZeroAlpha: 1,
            cardOneAlpha: 1,
            cardTwoAlpha: 1,
            cardThreeAlpha: 1,
            cardFourAlpha: 1,
            cardFiveAlpha: 1,
            playerCardZero: "Tc",
            playerCardOne: "Ts",
            playerCardTwo: "Td",
            playerCardThree: "Tc",
            playerCardFour: "Tc",
            playerCardFive: "Tc",
            cardStyle: CardDefault,
            cardBackStyle: [689, 0, 53, 73],
        };
        this.backCard = "default";

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
            xx: [689, 0, 53, 73],
            xx1: [689, 73, 53, 73],
            xx2: [742, 0, 53, 73],
            xx3: [689, 146, 53, 73],
            xx4: [689, 219, 53, 73],
        };
        this.cardsArray = [];
        this.playerCards = [];
        this.tableCards = [];

        try {
            this.cardSound = new Audio(cardSound);
        } catch (e) {
            console.log(e);
        }
        this.cardZeroRef = React.createRef();
        this.cardOneRef = React.createRef();
        this.cardTwoRef = React.createRef();
        this.cardThreeRef = React.createRef();
        this.cardFourRef = React.createRef();
        this.cardFiveRef = React.createRef();
    }
    initSounds() {
        try {
            this.cardSound = new Audio(cardSound);
        } catch (e) {
            console.log(e);
        }
    }
    setCardStyle(style) {
        switch (style.frontCard) {
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
                this.setState({
                    cardPAzero: { X: 25, Y: 15, A: 330 },
                    cardPAone: { X: 9.8, Y: 2, A: 340 },
                    cardPAtwo: { X: 10, Y: 7, A: 350 },
                    cardPAthree: { X: 13, Y: 14, A: 10 },
                    cardPAfour: { X: 50, Y: 10.5, A: 20 },
                    cardPAfive: { X: 70, Y: 2.5, A: 30 },
                });
                break;
        }

        this.backCard = style.backCard;
    }

    addCards(card, text) {
        // console.log(card, "  ",text);
        if (text === "xx") {
            switch (this.backCard) {
                case "default":
                    text = "xx";
                    break;
                case "backcard1":
                    text = "xx1";
                    break;
                case "backcard2":
                    text = "xx2";
                    break;
                case "backcard3":
                    text = "xx3";
                    break;
                case "backcard4":
                    text = "xx4";
                    break;
                default:
                    break;
            }
        }
        switch (card) {
            case "cardZero":
                setTimeout(() => {
                    this.setState({ playerCardZero: text, cardZero: { y: 0, show: true }, cardZeroAlpha: 1 }, () => {
                        this.cardZeroRef.current.animateCard();
                    });
                }, 0)
                // this.cardSound.play();
                break;
            case "cardOne":
                setTimeout(() => {
                    this.setState({ playerCardOne: text, cardOne: { y: 0, show: true }, cardOneAlpha: 1 }, () => {
                        this.cardOneRef.current.animateCard();
                    });
                    // this.cardSound.play();
                }, 200);
                break;
            case "cardTwo":
                setTimeout(() => {
                    this.setState({ playerCardTwo: text, cardTwo: { y: 0, show: true }, cardTwoAlpha: 1 }, () => {
                        this.cardTwoRef.current.animateCard();
                    });
                    // this.cardSound.play();
                }, 300);

                break;
            case "cardThree":
                // this.setState({ playerCardThree: text });
                setTimeout(() => {
                    this.setState({ playerCardThree: text, cardThree: { y: 0, show: true }, cardThreeAlpha: 1 });
                    // this.cardSound.play();
                    this.cardThreeRef.current.animateCard();
                }, 450);

                break;
            case "cardFour":
                // this.setState({ playerCardFour: text });
                setTimeout(() => {
                    this.setState({ playerCardFour: text, cardFour: { y: 0, show: true }, cardFourAlpha: 1 });
                    // this.cardSound.play();
                    this.cardFourRef.current.animateCard();
                }, 600);

                break;
            case "cardFive":
                // this.setState({ playerCardFive: text });
                setTimeout(() => {
                    this.setState({ playerCardFive: text, cardFive: { y: 0, show: true }, cardFiveAlpha: 1 });
                    // this.cardSound.play();
                    this.cardFiveRef.current.animateCard();
                }, 750);

                break;
            default:
                break;
        }
    }
    addCards_show(card, text) {
        switch (card) {
            case "cardZero":
                this.setState({ playerCardZero: text });
                this.setState({ cardZero: { y: 0, show: true }, cardZeroAlpha: 1 });
                break;
            case "cardOne":
                this.setState({ playerCardOne: text });
                this.setState({ cardOne: { y: 0, show: true }, cardOneAlpha: 1 });
                break;
            case "cardTwo":
                this.setState({ playerCardTwo: text });
                this.setState({ cardTwo: { y: 0, show: true }, cardTwoAlpha: 1 });
                break;
            case "cardThree":
                this.setState({ playerCardThree: text });
                this.setState({ cardThree: { y: 0, show: true }, cardThreeAlpha: 1 });
                break;
            case "cardFour":
                this.setState({ playerCardFour: text });
                this.setState({ cardFour: { y: 0, show: true }, cardFourAlpha: 1 });
                break;
            case "cardFive":
                this.setState({ playerCardFive: text });
                this.setState({ cardFive: { y: 0, show: true }, cardFiveAlpha: 1 });
                break;
            default:
                break;
        }
    }
    showWinningCombination(data) {

        this.setState({
            cardZeroAlpha: 0.35,
            cardOneAlpha: 0.35,
            cardTwoAlpha: 0.35,
            cardThreeAlpha: 0.35,
            cardFourAlpha: 0.35,
            cardFiveAlpha: 0.35,
        });

        try {
            for (let i = 0; i < data.length; i++) {
                switch (Number(data[i].id)) {
                    case 0:
                        this.setState({ cardZero: { y: 10, show: true }, cardZeroAlpha: 1 });
                        this.cardZeroRef.current.pullUp();
                        break;
                    case 1:
                        this.setState({ cardOne: { y: 10, show: true }, cardOneAlpha: 1 });
                        this.cardOneRef.current.pullUp();
                        break;
                    case 2:
                        this.setState({ cardTwo: { y: 10, show: true }, cardTwoAlpha: 1 });
                        this.cardTwoRef.current.pullUp();
                        break;
                    case 3:
                        this.setState({ cardThree: { y: 10, show: true }, cardThreeAlpha: 1 });
                        this.cardThreeRef.current.pullUp();
                        break;
                    case 4:
                        this.setState({ cardFour: { y: 10, show: true }, cardFourAlpha: 1 });
                        this.cardFourRef.current.pullUp();
                        break;
                    case 5:
                        this.setState({ cardFive: { y: 10, show: true }, cardFiveAlpha: 1 });
                        this.cardFiveRef.current.pullUp();
                        break;
                    default:
                        break;
                }
            }
        } catch (e) { }
    }
    removeCards() {
        this.setState({
            cardZero: { y: 0, show: false },
            cardOne: { y: 0, show: false },
            cardTwo: { y: 0, show: false },
            cardThree: { y: 0, show: false },
            cardFour: { y: 0, show: false },
            cardFive: { y: 0, show: false },
        });
    }

    foldCards() {
        this.setState({
            cardZeroAlpha: 0.35,
            cardOneAlpha: 0.35,
            cardTwoAlpha: 0.35,
            cardThreeAlpha: 0.35,
            cardFourAlpha: 0.35,
            cardFiveAlpha: 0.35,
        });
    }
    showFoldCards() {
        // console.log(this.state.cardZeroAlpha)
        // console.log(this.state.cardOneAlpha)
        // console.log(this.state.cardTwoAlpha)
        // console.log(this.state.cardThreeAlpha)
        // console.log(this.state.cardFiveAlpha)
        this.setState({
            cardZeroAlpha: 1,
            cardOneAlpha: 1,
            cardTwoAlpha: 1,
            cardThreeAlpha: 1,
            cardFourAlpha: 1,
            cardFiveAlpha: 1,
        });
    }
    render() {
        return (
            <Group>
                {/* {/ <!-------------------------------------two cards position start----------------------------> /} */}
                {this.state.cardZero.show && this.state.cardTwo.show === false &&
                    <Card ref={this.cardZeroRef} x={this.props.x + 6} y={this.props.y - 12} frame={this.mapCards[this.state.playerCardZero]} scale={this.props.scale} show={this.state.cardZero.show} alpha={this.state.cardZeroAlpha} cardStyle={this.state.cardStyle} angled={345} delay={100}></Card>}

                {this.state.cardOne.show && this.state.cardTwo.show === false &&
                    <Card ref={this.cardOneRef} x={this.props.x + 40} y={this.props.y - 21} frame={this.mapCards[this.state.playerCardOne]} scale={this.props.scale} show={this.state.cardOne.show} alpha={this.state.cardOneAlpha} cardStyle={this.state.cardStyle} angled={10} delay={500}></Card>}
                {/* {/ <!-------------------------------------two cards position end----------------------------> /} */}

                {/* {/ <!-------------------------------------Four cards position starts----------------------------> /} */}
                {this.state.cardOne.show && this.state.cardTwo.show && this.state.cardThree.show && this.state.cardFour.show === false && this.state.cardFive.show === false && <Card ref={this.cardZeroRef} x={this.props.x - 15} y={this.props.y - 8} frame={this.mapCards[this.state.playerCardZero]} scale={this.props.scale} show={this.state.cardZero.show} alpha={this.state.cardZeroAlpha} cardStyle={this.state.cardStyle} angled={336} delay={100}></Card>}
                {this.state.cardOne.show && this.state.cardTwo.show && this.state.cardThree.show && this.state.cardFour.show === false && this.state.cardFive.show === false && <Card ref={this.cardOneRef} x={this.props.x + 10} y={this.props.y - 21} frame={this.mapCards[this.state.playerCardOne]} scale={this.props.scale} show={this.state.cardOne.show} alpha={this.state.cardOneAlpha} cardStyle={this.state.cardStyle} angled={350} delay={300}></Card>}
                {this.state.cardOne.show && this.state.cardTwo.show && this.state.cardThree.show && this.state.cardFour.show === false && this.state.cardFive.show === false && <Card ref={this.cardTwoRef} x={this.props.x + 40} y={this.props.y - 26} frame={this.mapCards[this.state.playerCardTwo]} scale={this.props.scale} show={this.state.cardTwo.show} alpha={this.state.cardTwoAlpha} cardStyle={this.state.cardStyle} angled={8} delay={600}></Card>}
                {this.state.cardOne.show && this.state.cardTwo.show && this.state.cardThree.show && this.state.cardFour.show === false && this.state.cardFive.show === false && <Card ref={this.cardThreeRef} x={this.props.x + 65} y={this.props.y - 22} frame={this.mapCards[this.state.playerCardThree]} scale={this.props.scale} show={this.state.cardThree.show} alpha={this.state.cardThreeAlpha} cardStyle={this.state.cardStyle} angled={22} delay={900}></Card>}
                {/* {/ <!-------------------------------------Four cards pos-----------> /} */}

                {/* {/ <!-------------------------------------Five cards position starts----------------------------> /} */}
                {this.state.cardOne.show && this.state.cardTwo.show && this.state.cardThree.show && this.state.cardFour.show && this.state.cardFive.show === false && <Card ref={this.cardZeroRef} x={this.props.x - 20} y={this.props.y - 6} frame={this.mapCards[this.state.playerCardZero]} scale={this.props.scale} show={this.state.cardZero.show} alpha={this.state.cardZeroAlpha} cardStyle={this.state.cardStyle} angled={335} delay={100}></Card>}
                {this.state.cardOne.show && this.state.cardTwo.show && this.state.cardThree.show && this.state.cardFour.show && this.state.cardFive.show === false && <Card ref={this.cardOneRef} x={this.props.x + 0} y={this.props.y - 18} frame={this.mapCards[this.state.playerCardOne]} scale={this.props.scale} show={this.state.cardOne.show} alpha={this.state.cardOneAlpha} cardStyle={this.state.cardStyle} angled={345} delay={200}></Card>}
                {this.state.cardOne.show && this.state.cardTwo.show && this.state.cardThree.show && this.state.cardFour.show && this.state.cardFive.show === false && <Card ref={this.cardTwoRef} x={this.props.x + 23} y={this.props.y - 25} frame={this.mapCards[this.state.playerCardTwo]} scale={this.props.scale} show={this.state.cardTwo.show} alpha={this.state.cardTwoAlpha} cardStyle={this.state.cardStyle} angled={355} delay={400}></Card>}
                {this.state.cardOne.show && this.state.cardTwo.show && this.state.cardThree.show && this.state.cardFour.show && this.state.cardFive.show === false && <Card ref={this.cardThreeRef} x={this.props.x + 50} y={this.props.y - 27} frame={this.mapCards[this.state.playerCardThree]} scale={this.props.scale} show={this.state.cardThree.show} alpha={this.state.cardThreeAlpha} cardStyle={this.state.cardStyle} angled={15} delay={600}></Card>}
                {this.state.cardOne.show && this.state.cardTwo.show && this.state.cardThree.show && this.state.cardFour.show && this.state.cardFive.show === false && <Card ref={this.cardFourRef} x={this.props.x + 73} y={this.props.y - 22} frame={this.mapCards[this.state.playerCardFour]} scale={this.props.scale} show={this.state.cardFour.show} alpha={this.state.cardFourAlpha} cardStyle={this.state.cardStyle} angled={30} delay={800}></Card>}
                {/* {/ <!-------------------------------------Five cards position ends----------
                {/* {/ <!-------------------------------------Six cards position Starts----------------------------> /} */}
                {this.state.cardOne.show && this.state.cardTwo.show && this.state.cardThree.show && this.state.cardFour.show && this.state.cardFive.show &&
                    <Card ref={this.cardZeroRef} x={this.props.x - 27} y={this.props.y + 0} frame={this.mapCards[this.state.playerCardZero]} scale={this.props.scale} show={this.state.cardZero.show} alpha={this.state.cardZeroAlpha} cardStyle={this.state.cardStyle} angled={330} delay={100}></Card>}
                {this.state.cardOne.show && this.state.cardTwo.show && this.state.cardThree.show && this.state.cardFour.show && this.state.cardFive.show &&
                    <Card ref={this.cardOneRef} x={this.props.x - 9.8} y={this.props.y - 13} frame={this.mapCards[this.state.playerCardOne]} scale={this.props.scale} show={this.state.cardOne.show} alpha={this.state.cardOneAlpha} cardStyle={this.state.cardStyle} angled={340} delay={150}></Card>}
                {this.state.cardOne.show && this.state.cardTwo.show && this.state.cardThree.show && this.state.cardFour.show && this.state.cardFive.show &&
                    <Card ref={this.cardTwoRef} x={this.props.x + 10} y={this.props.y - 22} frame={this.mapCards[this.state.playerCardTwo]} scale={this.props.scale} show={this.state.cardTwo.show} alpha={this.state.cardTwoAlpha} cardStyle={this.state.cardStyle} angled={350} delay={300}></Card>}
                {this.state.cardOne.show && this.state.cardTwo.show && this.state.cardThree.show && this.state.cardFour.show && this.state.cardFive.show &&
                    <Card ref={this.cardThreeRef} x={this.props.x + 35} y={this.props.y - 28} frame={this.mapCards[this.state.playerCardThree]} scale={this.props.scale} show={this.state.cardThree.show} alpha={this.state.cardThreeAlpha} cardStyle={this.state.cardStyle} angled={10} delay={450}></Card>}
                {this.state.cardOne.show && this.state.cardTwo.show && this.state.cardThree.show && this.state.cardFour.show && this.state.cardFive.show &&
                    <Card ref={this.cardFourRef} x={this.props.x + 55} y={this.props.y - 24} frame={this.mapCards[this.state.playerCardFour]} scale={this.props.scale} show={this.state.cardFour.show} alpha={this.state.cardFourAlpha} cardStyle={this.state.cardStyle} angled={20} delay={600}></Card>}
                {this.state.cardOne.show && this.state.cardTwo.show && this.state.cardThree.show && this.state.cardFour.show && this.state.cardFive.show &&
                    <Card ref={this.cardFiveRef} x={this.props.x + 75} y={this.props.y - 18} frame={this.mapCards[this.state.playerCardFive]} scale={this.props.scale} show={this.state.cardFive.show} alpha={this.state.cardFiveAlpha} cardStyle={this.state.cardStyle} angled={32} delay={750}></Card>}
                {/* {/ <!-------------------------------------Six cards position ends----------------------------> /} */}
            </Group>
        );
    }
}
