import React, { Component } from "react";
import { Group } from "react-konva";
import { Card } from "./card";
import cardSound from "../../../../../../assets/audio/Card.mp3";

// import CardDefault from "../../../../../../assets/images/table/cards/cards1.png";
import CardDefault from "../../../../../../assets/images/table/cards/cards1-(1)-(1).png";
import CardStyleOne from "../../../../../../assets/images/table/cards/cards2.png";
import CardStyleTwo from "../../../../../../assets/images/table/cards/cards3.png";
import CardStyleThree from "../../../../../../assets/images/table/cards/cards4.png";
import CardStyleFour from "../../../../../../assets/images/table/cards/cards5.png";
import { getPlayerCardAnimation } from "../../../../../utils/global";

export default class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardCount: 2,
            // cardScale:0.15,
            isFront: true,
            // cardZero: { y: 0, show: false },
            // cardOne: { y: 0, show: false },
            // cardTwo: { y: 0, show: false },
            // cardThree: { y: 0, show: false },
            // cardFour: { y: 0, show: false },
            // cardFive: { y: 0, show: false },
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
            // cardBackStyle: [689, 0, 53, 73],
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
                // this.setState({
                //     cardPAzero: { X: 25, Y: 15, A: 330 },
                //     cardPAone: { X: 9.8, Y: 2, A: 340 },
                //     cardPAtwo: { X: 10, Y: 7, A: 350 },
                //     cardPAthree: { X: 13, Y: 14, A: 10 },
                //     cardPAfour: { X: 50, Y: 10.5, A: 20 },
                //     cardPAfive: { X: 70, Y: 2.5, A: 30 },
                // });
                break;
        }

        this.backCard = style.backCard;
    }

    addCards(card, text, cnt) {
        if (cnt !== undefined) {
            this.setState({ cardCount: Number(cnt) });
        }
        // console.log(card, "  ", text + "cardscount" + cnt);
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
        if (cnt !== undefined) {
            switch (card) {
                case "cardZero":
                    this.clearCards = setTimeout(() => {
                        this.setState({ playerCardZero: text, cardZeroAlpha: 1 }, () => {
                            try {
                                this.cardZeroRef.current?.animateCard();
                            } catch (e) { console.log(e); }
                        });
                    }, 5);
                    // this.cardSound.play();
                    break;
                case "cardOne":
                    this.clearCards = setTimeout(() => {
                        this.setState({ playerCardOne: text, cardOneAlpha: 1 }, () => {
                            this.cardOneRef.current?.animateCard();
                        });
                        // this.cardSound.play();
                    }, 200);
                    break;
                case "cardTwo":
                    this.clearCards = setTimeout(() => {
                        this.setState({ playerCardTwo: text, cardTwoAlpha: 1 }, () => {
                            this.cardTwoRef.current?.animateCard();
                        });
                        // this.cardSound.play();
                    }, 300);

                    break;
                case "cardThree":
                    // this.setState({ playerCardThree: text });
                    this.clearCards = setTimeout(() => {
                        this.setState({ playerCardThree: text, cardThreeAlpha: 1 });
                        // this.cardSound.play();
                        this.cardThreeRef.current?.animateCard();
                    }, 450);

                    break;
                case "cardFour":
                    // this.setState({ playerCardFour: text });
                    this.clearCards = setTimeout(() => {
                        this.setState({ playerCardFour: text, cardFourAlpha: 1 });
                        // this.cardSound.play();
                        this.cardFourRef.current?.animateCard();
                    }, 600);

                    break;
                case "cardFive":
                    // this.setState({ playerCardFive: text });
                    this.clearCards = setTimeout(() => {
                        this.setState({ playerCardFive: text, cardFiveAlpha: 1 });
                        // this.cardSound.play();
                        this.cardFiveRef.current?.animateCard();
                    }, 750);

                    break;
                default:
                    break;
            }
        }
    }
    addCards_show(card, text) {
        switch (card) {
            case "cardZero":
                // this.setState({ playerCardZero: text });
                this.setState({ playerCardZero: text, cardZeroAlpha: 1 });
                break;
            case "cardOne":
                // this.setState({ playerCardOne: text });
                this.setState({ playerCardOne: text, cardOneAlpha: 1 });
                break;
            case "cardTwo":
                // this.setState({ playerCardTwo: text });
                this.setState({ playerCardTwo: text, cardTwoAlpha: 1 });
                break;
            case "cardThree":
                // this.setState({ playerCardThree: text });
                this.setState({ playerCardThree: text, cardThreeAlpha: 1 });
                break;
            case "cardFour":
                // this.setState({ playerCardFour: text });
                this.setState({ playerCardFour: text, cardFourAlpha: 1 });
                break;
            case "cardFive":
                // this.setState({ playerCardFive: text });
                this.setState({ playerCardFive: text, cardFiveAlpha: 1 });
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
                        // this.setState({cardZeroAlpha: 1 });
                        this.cardZeroRef.current.pullUp();
                        break;
                    case 1:
                        // this.setState({ cardOneAlpha: 1 });
                        this.cardOneRef.current.pullUp();
                        break;
                    case 2:
                        // this.setState({ cardTwoAlpha: 1 });
                        this.cardTwoRef.current.pullUp();
                        break;
                    case 3:
                        // this.setState({ cardThreeAlpha: 1 });
                        this.cardThreeRef.current.pullUp();
                        break;
                    case 4:
                        // this.setState({ cardFourAlpha: 1 });
                        this.cardFourRef.current.pullUp();
                        break;
                    case 5:
                        // this.setState({ cardFiveAlpha: 1 });
                        this.cardFiveRef.current.pullUp();
                        break;
                    default:
                        break;
                }
            }
        } catch (e) { }
    }
    removeCards() {
        // this.setState({
        //     cardZero: { y: 0, show: false },
        //     cardOne: { y: 0, show: false },
        //     cardTwo: { y: 0, show: false },
        //     cardThree: { y: 0, show: false },
        //     cardFour: { y: 0, show: false },
        //     cardFive: { y: 0, show: false },
        // });
        this.setState({ cardCount: 0 });
    }

    foldCards() {
        // this.setState({
        //     cardZeroAlpha: 0.35,
        //     cardOneAlpha: 0.35,
        //     cardTwoAlpha: 0.35,
        //     cardThreeAlpha: 0.35,
        //     cardFourAlpha: 0.35,
        //     cardFiveAlpha: 0.35,
        // });
        // console.log("Fold Cards")
        switch (this.state.cardCount) {
            case 2:
                this.cardZeroRef.current.pullDown();
                this.cardOneRef.current.pullDown();
                break;
            case 4:
                this.cardZeroRef.current.pullDown();
                this.cardOneRef.current.pullDown();
                this.cardTwoRef.current.pullDown();
                this.cardThreeRef.current.pullDown();
                break;
            case 5:
                this.cardZeroRef.current.pullDown();
                this.cardOneRef.current.pullDown();
                this.cardTwoRef.current.pullDown();
                this.cardThreeRef.current.pullDown();
                this.cardFourRef.current.pullDown();
                break;
            case 6:
                this.cardZeroRef.current.pullDown();
                this.cardOneRef.current.pullDown();
                this.cardTwoRef.current.pullDown();
                this.cardThreeRef.current.pullDown();
                this.cardFourRef.current.pullDown();
                this.cardFiveRef.current.pullDown();
                break;
            default:
                break;

        }
    }

    showFoldCards() {
        // console.log("Show Folded Cards")
        switch (this.state.cardCount) {
            case 2:
                this.cardZeroRef.current.pullUp();
                this.cardOneRef.current.pullUp();
                break;
            case 4:
                this.cardZeroRef.current.pullUp();
                this.cardOneRef.current.pullUp();
                this.cardTwoRef.current.pullUp();
                this.cardThreeRef.current.pullUp();
                break;
            case 5:
                this.cardZeroRef.current.pullUp();
                this.cardOneRef.current.pullUp();
                this.cardTwoRef.current.pullUp();
                this.cardThreeRef.current.pullUp();
                this.cardFourRef.current.pullUp();
                break;
            case 6:
                this.cardZeroRef.current.pullUp();
                this.cardOneRef.current.pullUp();
                this.cardTwoRef.current.pullUp();
                this.cardThreeRef.current.pullUp();
                this.cardFourRef.current.pullUp();
                this.cardFiveRef.current.pullUp();
                break;
            default:
                break;

        }
    }



    // showFoldCards() {
    //     switch (this.state.cardCount) {
    //         case 2:
    //             this.cardZeroRef.current.pullUpCards();
    //             this.cardOneRef.current.pullUpCards();
    //             break;
    //         case 4:
    //             this.cardZeroRef.current.pullUpCards();
    //             this.cardOneRef.current.pullUpCards();
    //             this.cardTwoRef.current.pullUpCards();
    //             this.cardThreeRef.current.pullUpCards();
    //             break;
    //         case 5:
    //             this.cardZeroRef.current.pullUpCards();
    //             this.cardOneRef.current.pullUpCards();
    //             this.cardTwoRef.current.pullUpCards();
    //             this.cardThreeRef.current.pullUpCards();
    //             this.cardFourRef.current.pullUpCards();
    //             break;
    //         case 6:
    //             this.cardZeroRef.current.pullUpCards();
    //             this.cardOneRef.current.pullUpCards();
    //             this.cardTwoRef.current.pullUpCards();
    //             this.cardThreeRef.current.pullUpCards();
    //             this.cardFourRef.current.pullUpCards();
    //             this.cardFiveRef.current.pullUpCards();
    //             break;
    //         default:
    //             break;

    //     }
    // }
    componentWillUnmount() {
        clearTimeout(this.clearCards)
    }
    render() {
        return (
            <Group>
                {Number(this.state.cardCount) === 2 && (
                    <>
                        <Card ref={this.cardZeroRef} x={this.props.x + 10} y={this.props.y - (!this.props.tableOriantationLandscape ? 0 : 0)} tableOriantationLandscape={this.props.tableOriantationLandscape} frame={this.mapCards[this.state.playerCardZero]} scale={this.props.scale} alpha={this.state.cardZeroAlpha} visible={getPlayerCardAnimation()} cardStyle={this.state.cardStyle} angled={(!this.props.tableOriantationLandscape ? 345 : 0)} delay={100}></Card>
                        <Card ref={this.cardOneRef} x={this.props.x + 36} y={this.props.y - (!this.props.tableOriantationLandscape ? 8 : 0)} tableOriantationLandscape={this.props.tableOriantationLandscape} frame={this.mapCards[this.state.playerCardOne]} scale={this.props.scale} alpha={this.state.cardOneAlpha} visible={getPlayerCardAnimation()} cardStyle={this.state.cardStyle} angled={(!this.props.tableOriantationLandscape ? 10 : 0)} delay={500}></Card>
                    </>
                )}

                {Number(this.state.cardCount) === 4 && (
                    <>
                        <Card ref={this.cardZeroRef} x={this.props.x - 15} y={this.props.y - (!this.props.tableOriantationLandscape ? -7 : 0)} tableOriantationLandscape={this.props.tableOriantationLandscape} frame={this.mapCards[this.state.playerCardZero]} scale={this.props.scale} alpha={this.state.cardZeroAlpha} visible={getPlayerCardAnimation()} cardStyle={this.state.cardStyle} angled={(!this.props.tableOriantationLandscape ? 336 : 0)} delay={100}></Card>
                        <Card ref={this.cardOneRef} x={this.props.x + 10} y={this.props.y - (!this.props.tableOriantationLandscape ? 6 : 0)} tableOriantationLandscape={this.props.tableOriantationLandscape} frame={this.mapCards[this.state.playerCardOne]} scale={this.props.scale} alpha={this.state.cardOneAlpha} visible={getPlayerCardAnimation()} cardStyle={this.state.cardStyle} angled={(!this.props.tableOriantationLandscape ? 350 : 0)} delay={300}></Card>
                        <Card ref={this.cardTwoRef} x={this.props.x + 40} y={this.props.y - (!this.props.tableOriantationLandscape ? 11 : 0)} tableOriantationLandscape={this.props.tableOriantationLandscape} frame={this.mapCards[this.state.playerCardTwo]} scale={this.props.scale} alpha={this.state.cardTwoAlpha} visible={getPlayerCardAnimation()} cardStyle={this.state.cardStyle} angled={(!this.props.tableOriantationLandscape ? 8 : 0)} delay={600}></Card>
                        <Card ref={this.cardThreeRef} x={this.props.x + 65} y={this.props.y - (!this.props.tableOriantationLandscape ? 7 : 0)} tableOriantationLandscape={this.props.tableOriantationLandscape} frame={this.mapCards[this.state.playerCardThree]} scale={this.props.scale} alpha={this.state.cardThreeAlpha} visible={getPlayerCardAnimation()} cardStyle={this.state.cardStyle} angled={(!this.props.tableOriantationLandscape ? 22 : 0)} delay={900}></Card>
                    </>
                )}

                {Number(this.state.cardCount) === 5 && (
                    <>
                        <Card ref={this.cardZeroRef} x={this.props.x - 20} y={this.props.y - (!this.props.tableOriantationLandscape ? -9 : 0)} tableOriantationLandscape={this.props.tableOriantationLandscape} frame={this.mapCards[this.state.playerCardZero]} scale={this.props.scale} alpha={this.state.cardZeroAlpha} visible={getPlayerCardAnimation()} cardStyle={this.state.cardStyle} angled={(!this.props.tableOriantationLandscape ? 335 : 0)} delay={100}></Card>
                        <Card ref={this.cardOneRef} x={this.props.x + 0} y={this.props.y - (!this.props.tableOriantationLandscape ? 3 : 0)} tableOriantationLandscape={this.props.tableOriantationLandscape} frame={this.mapCards[this.state.playerCardOne]} scale={this.props.scale} alpha={this.state.cardOneAlpha} visible={getPlayerCardAnimation()} cardStyle={this.state.cardStyle} angled={(!this.props.tableOriantationLandscape ? 345 : 0)} delay={200}></Card>
                        <Card ref={this.cardTwoRef} x={this.props.x + 23} y={this.props.y - (!this.props.tableOriantationLandscape ? 10 : 0)} tableOriantationLandscape={this.props.tableOriantationLandscape} frame={this.mapCards[this.state.playerCardTwo]} scale={this.props.scale} alpha={this.state.cardTwoAlpha} visible={getPlayerCardAnimation()} cardStyle={this.state.cardStyle} angled={(!this.props.tableOriantationLandscape ? 355 : 0)} delay={400}></Card>
                        <Card ref={this.cardThreeRef} x={this.props.x + 50} y={this.props.y - (!this.props.tableOriantationLandscape ? 12 : 0)} tableOriantationLandscape={this.props.tableOriantationLandscape} frame={this.mapCards[this.state.playerCardThree]} scale={this.props.scale} alpha={this.state.cardThreeAlpha} visible={getPlayerCardAnimation()} cardStyle={this.state.cardStyle} angled={(!this.props.tableOriantationLandscape ? 15 : 0)} delay={600}></Card>
                        <Card ref={this.cardFourRef} x={this.props.x + 73} y={this.props.y - (!this.props.tableOriantationLandscape ? 7 : 0)} tableOriantationLandscape={this.props.tableOriantationLandscape} frame={this.mapCards[this.state.playerCardFour]} scale={this.props.scale} alpha={this.state.cardFourAlpha} visible={getPlayerCardAnimation()} cardStyle={this.state.cardStyle} angled={(!this.props.tableOriantationLandscape ? 30 : 0)} delay={800}></Card>
                    </>
                )}
                {Number(this.state.cardCount) === 6 && (
                    <>
                        <Card ref={this.cardZeroRef} x={this.props.x - 27} y={this.props.y + (!this.props.tableOriantationLandscape ? 15 : 0)} tableOriantationLandscape={this.props.tableOriantationLandscape} frame={this.mapCards[this.state.playerCardZero]} scale={this.props.scale} alpha={this.state.cardZeroAlpha} visible={getPlayerCardAnimation()} cardStyle={this.state.cardStyle} angled={(!this.props.tableOriantationLandscape ? 330 : 0)} delay={100}></Card>
                        <Card ref={this.cardOneRef} x={this.props.x - 9.8} y={this.props.y - (!this.props.tableOriantationLandscape ? 0 : 0)} tableOriantationLandscape={this.props.tableOriantationLandscape} frame={this.mapCards[this.state.playerCardOne]} scale={this.props.scale} alpha={this.state.cardOneAlpha} visible={getPlayerCardAnimation()} cardStyle={this.state.cardStyle} angled={(!this.props.tableOriantationLandscape ? 340 : 0)} delay={150}></Card>
                        <Card ref={this.cardTwoRef} x={this.props.x + 10} y={this.props.y - (!this.props.tableOriantationLandscape ? 7 : 0)} tableOriantationLandscape={this.props.tableOriantationLandscape} frame={this.mapCards[this.state.playerCardTwo]} scale={this.props.scale} alpha={this.state.cardTwoAlpha} visible={getPlayerCardAnimation()} cardStyle={this.state.cardStyle} angled={(!this.props.tableOriantationLandscape ? 350 : 0)} delay={300}></Card>
                        <Card ref={this.cardThreeRef} x={this.props.x + 35} y={this.props.y - (!this.props.tableOriantationLandscape ? 13 : 0)} tableOriantationLandscape={this.props.tableOriantationLandscape} frame={this.mapCards[this.state.playerCardThree]} scale={this.props.scale} alpha={this.state.cardThreeAlpha} visible={getPlayerCardAnimation()} cardStyle={this.state.cardStyle} angled={(!this.props.tableOriantationLandscape ? 10 : 0)} delay={450}></Card>
                        <Card ref={this.cardFourRef} x={this.props.x + 55} y={this.props.y - (!this.props.tableOriantationLandscape ? 9 : 0)} tableOriantationLandscape={this.props.tableOriantationLandscape} frame={this.mapCards[this.state.playerCardFour]} scale={this.props.scale} alpha={this.state.cardFourAlpha} visible={getPlayerCardAnimation()} cardStyle={this.state.cardStyle} angled={(!this.props.tableOriantationLandscape ? 20 : 0)} delay={600}></Card>
                        <Card ref={this.cardFiveRef} x={this.props.x + 75} y={this.props.y - (!this.props.tableOriantationLandscape ? 3 : 0)} tableOriantationLandscape={this.props.tableOriantationLandscape} frame={this.mapCards[this.state.playerCardFive]} scale={this.props.scale} alpha={this.state.cardFiveAlpha} visible={getPlayerCardAnimation()} cardStyle={this.state.cardStyle} angled={(!this.props.tableOriantationLandscape ? 32 : 0)} delay={750}></Card>
                    </>
                )}
            </Group>
        );
    }
}
