import React from "react";
// import { Rect, Text, Group, Image, Circle, Line, Star, Sprite } from "react-konva";
import { Rect, Text, Group, Image, Star, } from "react-konva";
import { Timer } from "./timer";
import { PlayerAvtar } from "./playerAvtar";
import { PlayerAvtarMobile } from "./playerAvtarMobile";
import Cards from "./cards/cards";
import timerTicker from "../../../../../assets/audio/TimeWarningFlash.wav";
import clockTick from "../../../../../assets/audio/MetronomeFlash.wav";
import claps from "../../../../../assets/audio/clap.mp3";
// import defaultAvtarO from "../../../../../assets/images/lobby/avtar/avtar_icon8.png";
import profileAvtar from "../../../../../assets/images/table/profileImg.svg";
// import profilePanel from "../../../../../assets/images/table/Rectangle.svg";
import profilePanelTwo from "../../../../../assets/images/table/Rectangle.svg";
import profilePanelThree from "../../../../../assets/images/table/Rectanglethree.svg";
// import lbplayerSeat from "../../../../../assets/images/table/lb_playerSeat.png";
import lb_winAnim from "../../../../../assets/images/table/lb_winAnim.png";
import chat_btn from '../../../../../assets/images/table/chat_btn.png';
import Config from "../../../../../config";
import fileName from "../../../../../jsconfig";
import SithereImage from '../../../../../assets/images/table/HeadIcons/button_tool_tip.png'
import Screen from '../../../../utils/screen';
// import { t } from "i18next";
// import Spritegif from "../animation/spriteGif";
// import Spritegif from "../animation/spritegif";
// import { duration } from "moment";
import { getMuteValue, getOpenSeat } from "../../../../utils/global";


import defaultAvtar from "../../../../../assets/images/lobby_icons/profile/icon_avatar.png";

import UM from "../../../../utils/utilityMethods";

// const apiPath = {
//     getAvtr: "/api/player/getAvatar",
// };
export default class Seat extends React.Component {
    constructor(props) {
        super(props);
        this.x = 200;
        this.y = 20;
        this.onNewPlayer = this.onNewPlayer.bind(this);
        this.state = {
            calltimetable: { Time: 0, hide_show: false },
            ifKOb: { p1: 0, x1: 0, y1: 0, w1: 0, h1: 0, f1: 0 },
            Inactive: { f1: 15, x1: 0, y1: -1.3, w1: 0, h1: 26.2 },
            ifAvatarPresent: { x: 0 },
            showKnockOutBounty: false,
            toggleseat: true,
            ratio: 1,
            knockoutBounty: 0,
            hidecardRatio: 0,
            name: "Take Seat",
            enableTwoX: null,
            chips: "",
            proImage: null,
            chat: null,
            proLable: null,
            proLable1: null,
            SithereImage: null,
            noofBB: '',
            action: "",
            handStrength: "",
            color: "#167a2f",
            ritcolor: "#00e600",
            SeatBg: [0, '#686868', 1, '#000000'],
            alpha: 0.6,
            changeposition: "No",
            showTimer: false,
            showTimerleft: false,
            timerValue: 0,
            timerLeft: 0,
            avtar: defaultAvtar,
            mySeatId: '',
            showSeatMenu: false,
            showChat: false,
            showAddbuddy: false,
            showAction: false,
            chatText: "",
            showAvtar: false,
            seatGread: "#0005",
            seatMenuColorOne: "#FFFFFF",
            seatMenuImageOne: { x: 0, y: 0, width: 213, height: 60 },
            seatMenuColorTwo: "#000000",
            seatMenuColorThree: "#000000",
            animateScale: 1,
            showWinAnima: false,
            toggleBB: false,
            level: -1,
            winpercent: "",
            playersAvatars: "",
            setUUID: "",
            seats: [
                { id: 0, uuid: "", mybuddy: false },
                { id: 1, uuid: "", mybuddy: false },
                { id: 2, uuid: "", mybuddy: false },
                { id: 3, uuid: "", mybuddy: false },
                { id: 4, uuid: "", mybuddy: false },
                { id: 5, uuid: "", mybuddy: false },
                { id: 6, uuid: "", mybuddy: false },
                { id: 7, uuid: "", mybuddy: false },
                { id: 8, uuid: "", mybuddy: false },
                { id: 9, uuid: "", mybuddy: false },
            ],
        };
        // console.log(this.props)
        this.config = new Config();

        this.timerTicker = new Audio(timerTicker);
        this.timerTicker.volume = 0.05;

        this.clockTick = new Audio(clockTick);
        this.clockTick.volume = 0.05;
        this.clockTick.loop = true;

        this.claps = new Audio(claps);
        this.cardsRef = React.createRef();
        this.previousaction = '';
    }
    state = {
        color: "green",
    };


    onHoverSeat = (id) => {
        // console.log(id)
        // console.log(this.state.mySeatId)
        // console.log(this.state.action,this.previousaction)
        if (this.state.mySeatId !== "") {
            if (Number(this.state.mySeatId) === Number(id)) {
                // if (this.state.action === "Fold") {
                if (this.state.action === "clear" && this.previousaction === "Fold") {
                    this.cardsRef.current.showFoldCards();
                }
            }
        }
    }
    onHoverOutSeat = (id) => {
        if (this.state.mySeatId !== "") {
            if (Number(this.state.mySeatId) === Number(id)) {
                // if (this.state.action === "Fold") {
                if (this.state.action === "clear" && this.previousaction === "Fold") {
                    this.cardsRef.current.foldCards();
                }
            }
        }
    }


    handleClick = (id) => {
        // console.log(Number(this.state.mySeatId) === Number(id));
        // console.log(id, this.state.mySeatId);
        // console.log(this.state.action);
        if (this.state.mySeatId !== "") {
            if (Number(this.state.mySeatId) === Number(id)) {
                // if (this.state.action === "Fold") {
                //     this.cardsRef.current.showFoldCards();
                // }
            } else {
                this.props.showSeatAlert("Seat is occupied");
            }
        } else {
            this.cardsRef.current.initSounds();
            this.props.initSounds();
            this.timerTicker = new Audio(timerTicker);
            this.timerTicker.volume = 0.05;

            this.clockTick = new Audio(clockTick)
            this.clockTick.volume = 0.05;
            this.clockTick.loop = true;

            this.claps = new Audio(claps);


            this.props.sendSeat(id);
            // if (!this.props.changetourno_sitandgo) {
            //     this.setState({ showSeatMenu: true })
            //     setTimeout(() => {
            //         this.setState({ showSeatMenu: false });
            //     }, 2000);
            // }
            this.props.network.send(`<TakeSeat seat="${id}"/>`);
            //   this.getAvtarforSeat();
            this.setState({ showAddbuddy: false });
            setTimeout(() => {
                // fixed position 2  for 6 seater 
                // this.props.RearrangeTakeSeat(2);
            }, 1000);
        }
    };


    getAvtarforSeat() {
        var path2 = this.config.URL_Environment.proxy.baseUrl + this.config.URL_Environment.apiPath.getAvtr_Api;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", path2, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("siteid", "prode");
        xhr.setRequestHeader("wsession", JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_wSid'`)).wSid);
        xhr.addEventListener("load", (e) => { this.avtrDataHandler(e) });
        xhr.send();
    }
    componentDidMount() {

        setTimeout(() => {
            this.loadImage();
            // this.onDealingCards();
            // this.getAvtarforSeat();
            // this.setState({ playersAvatars: this.props.setAvatars });
        }, 1500);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.action !== this.state.action) {
            this.previousaction = prevState.action;
            console.log(prevState.action, this.state.action)

        }
    }
    componentWillUnmount() {
        clearTimeout(this.clearRunItOnce);
        this.proImage.removeEventListener("load", this.handleLoad);
        this.proLable.removeEventListener("load", this.handleLoad);
        this.proLable1.removeEventListener("load", this.handleLoad);
        this.SithereImage.removeEventListener("load", this.handleLoad);
        this.chat.removeEventListener("load", this.handleLoad);
        // clearInterval(this.seatTimerInterval_CallTimeTable)
        // clearInterval(this.clearRunItOnce)
        // clearInterval(this.seatTimerInterval);

        // this.setState({ timerValue: '', showTimer: false,calltimetable: { Time: 0, hide_show: false } });



    }
    loadImage() {
        this.proImage = new window.Image();
        this.chat = new window.Image();
        this.proImage.src = profileAvtar;
        this.chat.src = chat_btn
        this.proImage.addEventListener("load", this.handleLoad);


        this.proLable = new window.Image();
        this.proLable1 = new window.Image();
        this.winAnim = new window.Image();
        this.SithereImage = new window.Image();
        // if (this.state.showKnockOutBounty === true) {
        //     console.log("this seat is KOB")
        //     this.proLable.src = profilePanelThree;
        // } else {
        //     console.log("this seat is not KOB")
        //     this.proLable.src = profilePanelTwo;
        // }

        this.proLable.src = profilePanelTwo;
        if (fileName.name === "Leader_bet") {
            this.winAnim.src = lb_winAnim;
        }
        this.proLable1.src = profilePanelThree;
        this.SithereImage.src = SithereImage;
        // this.proLable = new window.Image();
        // this.proLable.src = profilePanel;
        this.proLable.addEventListener("load", this.handleLoad);
        this.proLable1.addEventListener("load", this.handleLoad);
        this.SithereImage.addEventListener("load", this.handleLoad);
        this.winAnim.addEventListener("load", this.handleLoad);
        this.chat.addEventListener("load", this.handleLoad);
    }
    handleLoad = () => {
        this.setState({
            proImage: this.proImage,
            proLable: this.proLable,
            winAnim: this.winAnim,
            proLable1: this.proLable1,
            SithereImage: this.SithereImage,
            chat: this.chat
        });
    };

    avtrDataHandler(data) {
        const myAvatr = `data:image/jpeg;base64,${((data.target.response.split(",")[2]).split(":")[1]).slice(1, -2)}`;
        // console.log(myAvatr)
        // const myAvatr = `data:image/jpeg;base64,${data.target.response}`;
        this.setState({ avtar: myAvatr });
        // this.setState({ showAvtar: true });
    }
    handleOver = (id) => {
        // this.setState({ showSeatMenu: true });
        // console.log(this.state.seats);
        // console.log(this.state.mySeatId);
        console.log("tesssssssssssssssss")
        // console.log(id);
        if (this.state.mySeatId !== "" && Number(this.state.mySeatId) !== id) {
            // console.log(this.state.seats);
            this.setState({ showAddbuddy: true, setUUID: this.state.seats[id] });
            setTimeout(() => {
                this.setState({ showAddbuddy: false });
            }, 2000);
        }
        // alert("handleOver")
        // setTimeout(() => {
        //     this.setState({ showSeatMenu: false });
        // }, 2000);
    };
    ShowMenu() {
        clearTimeout(this.settimeoutTimer);
        // console.log(this.state.mySeatId)
        // alert("showmenu")
        this.setState({ showSeatMenu: true });
        this.settimeoutTimer = setTimeout(() => {
            this.setState({ showSeatMenu: false });
            this.imageRef.setAttrs({
                cropX: 0,
                cropY: 0,
                width: 213,
                height: 60,
            })
        }, 2000);
    }
    handleOut = () => {
        clearTimeout(this.seatMenuTime);
    };

    enableTwoX(data) {
        this.setState({ enableTwoX: data })
    }
    onNewPlayer(data, knockValue) {
        // knockoutBounty
        // console.log(data)

        this.setState({ showKnockOutBounty: knockValue })
        if (knockValue) {
            this.setState({ ifKOb: { p1: -1.3, x1: 0, y1: 0, w1: 0, h1: -2.5, f1: -2 } })
        } else {
            this.setState({ ifKOb: { p1: 0, x1: 0, y1: 0, w1: 0, h1: 0, f1: 0 } })
        }
        this.setState({ name: data.name, chips: data.chips, knockoutBounty: data.knockoutBounty, action: data.action, showAction: false, noofBB: data.NoofBB, level: data.level });
        if (data?.name == data?.me?.name) {
            // this.getAvtarforSeat()
        } else {
            // this.setState({ showAvtar: false })
        }

        // if (data.hasOwnProperty("avatar")) {
        //     console.log(data)
        //     this.setState({ playersAvatars: data.avatar, ifAvatarPresent: { x: 20 } });
        //     this.setState({ showAvtar: true })
        // } else {
        //     this.setState({ playersAvatars: "", ifAvatarPresent: { x: 0 } });
        //     this.setState({ showAvtar: false })
        // }

        if (data.hasOwnProperty("avatar")) {
            this.setState({ playersAvatars: data.avatar === "" ? defaultAvtar : data.avatar, ifAvatarPresent: { x: 20 }, showAvtar: true });
        } else {
            this.setState({ playersAvatars: "", ifAvatarPresent: { x: 0 }, showAvtar: false });
        }
        switch (data.status) {
            case "takenActive":
                this.setState({ color: "#167a2f", seatGread: "#0f1b27", enableTwoX: data.enableTwoX, toggleseat: false });
                this.setState({ alpha: 1, changeposition: "Yes" });
                this.setState({ mySeatId: data.me.id });
                this.setState({ Inactive: { f1: 12, x1: 0, y1: 0, w1: 0, h1: 0 } })
                this.setState(prevState => ({
                    seats: prevState.seats.map(seat =>
                        seat.id === data.seat ? { ...seat, id: data.seat, uuid: data.uuid } : seat
                    )
                }));

                // this.setState({ avtar: defaultAvtarO, mySeatId: data.me.id });
                // console.log("data.chips", "     ", data.chips)
                break;
            case "readyToTake":
                this.setState({ color: "#167a2f", mySeatId: '', hide_show: false, toggleseat: true });
                this.setState({ alpha: .75, changeposition: "No" });
                this.setState({ calltimetable: { Time: 0, hide_show: false, } })
                clearInterval(this.seatTimerInterval_CallTimeTable)
                this.setState({ Inactive: { f1: 15, x1: 0, y1: -1.3, w1: 0, h1: 26.2 } })
                // setTimeout(() => {
                //     this.setState({ showSeatMenu: false })
                // }, 200);
                break;
            case "takenInactive":
                this.setState({ toggleseat: false });
                this.setState({ color: "#167a2f", mySeatId: '', enableTwoX: null });
                this.setState({ alpha: 0.75, changeposition: "No" });
                this.setState({ calltimetable: { Time: 0, hide_show: false } })
                clearInterval(this.seatTimerInterval_CallTimeTable)
                this.setState({ Inactive: { f1: 12, x1: 0, y1: 0, w1: 0, h1: 0 } })
                break;
            case "onlyMe":
                this.setState({ color: "#167a2f", mySeatId: '', enableTwoX: null });
                this.setState({ calltimetable: { Time: 0, hide_show: false, toggleseat: false } })
                this.setState({ alpha: 0.75, changeposition: "No" });
                this.setState({ Inactive: { f1: 15, x1: 0, y1: -1.3, w1: 0, h1: 26.2 } })
                clearInterval(this.seatTimerInterval_CallTimeTable)
                break;
            default:
                this.setState({ calltimetable: { Time: 0, mySeatId: '', hide_show: false, toggleseat: true } })
                // this.setState({ calltimetable: { Time: 0, mySeatId: '', hide_show: false } })
                clearInterval(this.seatTimerInterval_CallTimeTable)
                this.setState({ Inactive: { f1: 15, x1: 0, y1: -1.3, w1: 0, h1: 26.2 } })
                break;
        }
    }

    onActiveSeats(data) {
        this.setState({ color: "#167a2f" });
    }
    onChipsRebuy(data) {
        this.setState({ chips: UM.roundToTwo(Number(this.state.chips) + Number(data.amount)) });
    }
    onPlayerAction(data) {
        this.setState({ ritcolor: "#00e600", SeatBg: [0, '#686868', 1, '#000000'] });
        if (data.action === "RunItTwice" || data.action === "RunItOnce") {
            this.clearRunItOnce = setTimeout(() => {
                this.setState({ action: "clear" });
            }, 6000);
        } else {
            this.clearRunItOnce = setTimeout(() => {
                this.setState({ action: "clear" });
            }, 3000);
        }
        switch (data.action) {
            case "SitIn":
                this.setState({ alpha: 1, changeposition: "Yes", SeatBg: [0, '#686868', 1, '#000000'] });
                break;
            case "SitOut":
                this.setState({ alpha: 0.6, changeposition: "No", SeatBg: [0, '#686868', 1, '#000000'] });
                break;
            case "PostSmallBlind":
                this.setState({ chips: UM.roundToTwo(Number(this.state.chips) - Number(data.amount)), action: `${this.props.seatProperties.blindsTextOne} ${data.amount}` });
                break;
            case "PostBigBlind":
                this.setState({ chips: UM.roundToTwo(Number(this.state.chips) - Number(data.amount)), action: `${this.props.seatProperties.blindsTextTwo} ${data.amount}` });
                break;
            case "PostThirdBlind":
                this.setState({ chips: UM.roundToTwo(Number(this.state.chips) - Number(data.amount)), action: `TB ${data.amount}` });
                break;
            case "PostAnte":
                this.setState({ chips: UM.roundToTwo(Number(this.state.chips) - Number(data.amount)), action: `` });
                break;
            case "Fold":
                this.setState({ action: "Fold" });
                // this.cardsRef.current.removeCards();
                this.cardsRef.current.foldCards();
                break;
            case "Check":
                this.setState({ action: "Check" });
                break;
            case "Raise":
                if (UM.roundToTwo(Number(this.state.chips) - Number(data.amount)) === 0) {
                    this.setState({ chips: UM.roundToTwo(Number(this.state.chips) - Number(data.amount)), action: `All-In` });
                } else {
                    this.setState({ chips: UM.roundToTwo(Number(this.state.chips) - Number(data.amount)), action: `Raise` });
                }
                break;
            case "Call":
                if (UM.roundToTwo(Number(this.state.chips) - Number(data.amount)) === 0) {
                    this.setState({ chips: UM.roundToTwo(Number(this.state.chips) - Number(data.amount)), action: `All-In` });
                } else {
                    this.setState({ chips: UM.roundToTwo(Number(this.state.chips) - Number(data.amount)), action: `Call` });
                }
                break;
            case "Bet":
                if (UM.roundToTwo(Number(this.state.chips) - Number(data.amount)) === 0) {
                    this.setState({ chips: UM.roundToTwo(Number(this.state.chips) - Number(data.amount)), action: `All-In` });
                } else {
                    this.setState({ chips: UM.roundToTwo(Number(this.state.chips) - Number(data.amount)), action: `Bet` });
                }
                break;
            case "UncalledBet":
                this.setState({ chips: UM.roundToTwo(Number(this.state.chips) + Number(data.amount)), action: ` ` });

                break;
            case "RunItOnce":
                this.setState({ action: "RIT once", ritcolor: "#ffffff", SeatBg: [0, '#ff0000', 1, '#ff0000'] });
                break;
            case "RunItTwice":
                this.setState({ action: "RIT twice", ritcolor: "#ffffff", SeatBg: [0, '#00e600', 1, '#00e600'] });
                break;
            case "":
                break;
            default:
                this.setState({ SeatBg: [0, '#686868', 1, '#000000'] });
                break;
        }
        this.setState({ chips: this.state.chips })

    }
    handStrength(data, winpercent) {
        if (data === undefined) {
            this.setState({ showAction: false, handStrength: "", winpercent: "" })
        } else {
            this.setState({ showAction: true, handStrength: `${data}`, winpercent: winpercent != undefined ? `${winpercent}%` : "" })
        }

    }
    handStrengthCombination(data, winpercent) {
        if (data === undefined || data === "") {
            this.setState({ showAction: false, handStrength: "", winpercent: "" })
        } else {
            this.setState({ showAction: true, handStrength: `${data}`, winpercent: winpercent != undefined ? `${winpercent}%` : "" })
        }
    }


    colorchange() {
        if (this.state.action === "Call") {
            return (fileName.name === "Leader_bet" ? "#000000e0" : "#136B05");
        } else if (this.state.action === "Raise") {
            return (fileName.name === "Leader_bet" ? "#000000e0" : "#096B95");
        } else if (this.state.action === "Fold") {
            return (fileName.name === "Leader_bet" ? "#000000e0" : "#980303");
        } else if (this.state.action === "RIT twice") {
            return ((fileName.name === "Leader_bet" ? "#000000e0" : (fileName.name === "Riverpoker" ? "#00ff00" : "#ff0000")));
        } else if (this.state.action === "RIT once") {
            return ((fileName.name === "Leader_bet" ? "#000000e0" : (fileName.name !== "Riverpoker" ? "#00ff00" : "#ff0000")));
        } else if (this.state.action === "clear") {
            return "#c7d0dd00";
        } else if (this.state.action === "Check") {
            return "#000000";
        } else if (this.state.action === "Bet") {
            return (fileName.name === "Leader_bet" ? "#000000e0" : "#ff0066");
        } else if (this.state.action === "All-In") {
            return (fileName.name === "Leader_bet" ? "#000000e0" : "#FF4500");
        }
    }
    messagechange() {
        if (this.state.action === "Call") {
            return this.state.action
        } else if (this.state.action === "Raise") {
            return this.state.action
        } else if (this.state.action === "Fold") {
            return this.state.action
        } else if (this.state.action === 'RIT twice') {
            return this.state.action
        } else if (this.state.action === 'RIT once') {
            return this.state.action
        } else if (this.state.action === 'Check') {
            return this.state.action
        } else if (this.state.action === 'Bet') {
            return this.state.action
        } else if (this.state.action === 'All-In') {
            return this.state.action
        }
    }
    colorchange1() {
        if (this.state.action === "Call") {
            return (fileName.name === "Leader_bet" ? "#47FF86" : "#12F402")
        } else if (this.state.action === "Raise") {
            return "#2A94E4"
        } else if (this.state.action === "Fold") {
            return "#FF0303"
        } else if (this.state.action === 'Check') {
            return "#4d4d4d"
        } else if (this.state.action === 'Bet') {
            return (fileName.name === "Leader_bet" ? "#00CEFF" : "#ff80b3")
        } else if (this.state.action === 'All-In') {
            return "#f97544"
        } else if (this.state.action === 'RIT twice') {
            return (fileName.name !== "Riverpker" ? "#00ff00" : "#ff0000")
        } else if (this.state.action === 'RIT once') {
            return (fileName.name !== "Riverpker" ? "#ff0000" : "#00ff00")
        }
    }
    changeTxtColor() {
        if (this.state.action === "Call") {
            return "#47FF86"
        } else if (this.state.action === "Raise") {
            return "#2A94E4"
        } else if (this.state.action === "Fold") {
            return "#FF0303"
        } else if (this.state.action === 'Check') {
            return "#ffff"
        } else if (this.state.action === 'Bet') {
            return "#00CEFF"
        } else if (this.state.action === 'All-In') {
            return "#f97544"
        } else if (this.state.action === 'RIT twice') {
            return (fileName.name !== "Riverpker" ? "#ff0000" : "#00ff00")
        } else if (this.state.action === 'RIT once') {
            return (fileName.name !== "Riverpker" ? "#00ff00" : "#ff0000")
        }
    }

    onWinner(amount, thisPlayer, id) {
        // this.setState({ SeatBg: [0, '#686868', 1, '#000000'] });
        if (this.seatAnimateInterval !== undefined) {
            clearInterval(this.seatAnimateInterval);
        }
        if (thisPlayer === id) {
            this.claps.play();
            this.claps.muted = getMuteValue();
        }
        this.setState({ chips: UM.roundToTwo(Number(this.state.chips) + Number(amount)) });
        this.winAnimation();
        this.setState({ showWinAnima: true });
    }

    winAnimation() {
        this.seat.to({
            scaleX: 1.15,
            scaleY: 1.15,
            duration: 0.1,
            onFinish: () => {
                this.seat?.to({
                    scaleX: 1,
                    scaleY: 1,
                    onFinish: () => {
                        this.seat?.to({
                            scaleX: 1.15,
                            scaleY: 1.15,
                            duration: 0.1,
                            onFinish: () => {
                                this.seat?.to({
                                    scaleX: 1,
                                    scaleY: 1,
                                });
                                setTimeout(() => {
                                    this.setState({ showWinAnima: false });
                                }, 500);
                            },
                        });
                    },
                });
            },
        });
    }
    onWinnerHighlightCards(cards) {
        let winCards = [];
        let x = this.props.x;
        let y = this.props.y - this.props.seatProperties.cardY;
        let xPadding = this.props.seatProperties.cardY == 90 ? 25 : 18;

        if (!Array.isArray(cards)) {
            cards = [cards];
        }
        for (let i = 0; i < cards.length; i++) {
            try {
                winCards.push({ card: cards[i]["#text"], id: cards[i].attr.id, x: x + i * xPadding, y: y - 15 });
            } catch (e) { }
        }
        this.cardsRef.current.showWinningCombination(winCards);
        // this.setState({SeatBg: [0, '#686868', 1, '#000000']})
    }

    startTimer(thisPlayer, id, min, max, duration, timeBank) {
        // console.log(thisPlayer,"           ",id,"           ",min,"                ",max,"                  ",duration)
        this.setState({ showTimer: true, showTimerleft: thisPlayer != id && timeBank == "-1" });
        // this.setState({ showTimer: true, showTimerleft: (duration / 1000) > 31 });
        let left = duration
        this.seatTimerInterval = setInterval(() => {
            if (min < max) {
                let per = (max - min) / duration;
                // console.log(per)
                this.setState({ timerValue: per, timerLeft: left });
                min = min + 1000;

            } else {
                this.stopTimer(id);
                if (thisPlayer === id) {
                    this.props.network.send("<TimedOut/>");
                } else {
                }
            }
            left = left - 1000
        }, 1000);
    }
    CallTimeSeat(duration, isTimeForcedPaused, timeLeft, timedOut) {
        console.log("duration:", duration, "        isTimeForcedPaused:", isTimeForcedPaused, "              timeLeft:", timeLeft, "               timedOut", timedOut)
        if (duration === timeLeft) {
            clearInterval(this.seatTimerInterval_CallTimeTable)
            this.setState({ calltimetable: { Time: (timeLeft / 1000).toFixed(0), hide_show: true } })
        } else {
            if (timeLeft > 0 && isTimeForcedPaused === "false") {
                clearInterval(this.seatTimerInterval_CallTimeTable)
                this.seatTimerInterval_CallTimeTable = setInterval(() => {
                    let sec = (timeLeft / 1000).toFixed(0);
                    // console.log(sec)//here setState
                    if (sec > 0) {

                        this.setState({ calltimetable: { Time: sec, hide_show: true } })
                        timeLeft = timeLeft - 1000
                    } else {
                        this.setState({ calltimetable: { Time: sec, hide_show: true } })
                        timeLeft = 0
                    }
                }, 1000)

            } else if (timeLeft > 0 && isTimeForcedPaused === "true") {
                clearInterval(this.seatTimerInterval_CallTimeTable);
                this.setState({ calltimetable: { Time: (timeLeft / 1000).toFixed(0), hide_show: true } })
            } else if (timeLeft === '0' && isTimeForcedPaused === "false") {
                this.setState({ calltimetable: { hide_show: false } })
                clearInterval(this.seatTimerInterval_CallTimeTable);
            } else if (Number(timeLeft) <= -1 && isTimeForcedPaused === "false") {
                this.setState({ calltimetable: { hide_show: false } })
                clearInterval(this.seatTimerInterval_CallTimeTable);
            }
        }



    }
    clearTheTableSeats() {
        clearInterval(this.seatTimerInterval_CallTimeTable)
        clearInterval(this.clearRunItOnce)
        clearInterval(this.seatTimerInterval);

        this.setState({ timerValue: '', showTimer: false, showTimerleft: false, calltimetable: { Time: 0, hide_show: false, timerLeft: '', SeatBg: [0, '#686868', 1, '#000000'] } });
    }
    initTimerSounds(seat) {
        this.timerTicker.play();
        this.timerTicker.muted = getMuteValue();
        this.clockTick.play();
        this.clockTick.muted = getMuteValue();

    }
    stopTimer(id) {
        this.timerTicker.pause();
        this.clockTick.pause();
        if (this.seatTimerInterval !== undefined) {
            if (id !== undefined) {
                clearInterval(this.seatTimerInterval);
                this.setState({ timerValue: 0, timerLeft: 0 });
                this.setState({ showTimer: false, showTimerleft: false });
            }
        } else {
        }
    }
    onDetermineDealer(data, cnt) {
        this.cardsRef.current.addCards("cardZero", data["#text"], cnt);
    }
    onDealingCards(data) {
        let cnt = data.Cards.Card.length;
        // let cnt = 6;
        // let b1 = "xx";
        for (let i = 0; i < cnt; i++) {
            var sessionData = JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_sid'`));
            var encryptDecrypt = new window.EncryptDecrypt(128, 2, "566e4a61fd3220031fa17ebd846c8ec0", "c4c7712d6f62c4f8c40dd2248a029a8a");
            let b1 = "";
            if (data.Cards.Card[i]["#text"].length > 2) {
                this.setState({ ratio: 1, hidecardRatio: 30 });
                b1 = `${encryptDecrypt.decrypt(`${sessionData.sid}`, data.Cards.Card[i]["#text"])}`;
            } else {
                b1 = data.Cards.Card[i]["#text"];
            }

            switch (i) {
                case 0:
                    this.cardsRef.current.addCards("cardZero", b1, cnt);
                    break;
                case 1:
                    this.cardsRef.current.addCards("cardOne", b1, cnt);
                    break;
                case 2:
                    this.cardsRef.current.addCards("cardTwo", b1, cnt);
                    break;
                case 3:
                    this.cardsRef.current.addCards("cardThree", b1, cnt);
                    break;
                case 4:
                    this.cardsRef.current.addCards("cardFour", b1, cnt);
                    break;
                case 5:
                    this.cardsRef.current.addCards("cardFive", b1, cnt);
                    break;
                default:
                    break;
            }
        }
    }
    onDealingCardsType(i, data, cnt) {
        var sessionData = JSON.parse(sessionStorage.getItem(`${window.location.hostname}'_sid'`));
        var encryptDecrypt = new window.EncryptDecrypt(128, 2, "566e4a61fd3220031fa17ebd846c8ec0", "c4c7712d6f62c4f8c40dd2248a029a8a");
        let b1 = "";
        if (data.Cards.Card[i]["#text"].length > 2) {
            this.setState({ ratio: 1, hidecardRatio: 30 });
            b1 = `${encryptDecrypt.decrypt(`${sessionData.sid}`, data.Cards.Card[i]["#text"])}`;
        } else {
            this.setState({ ratio: 2, hidecardRatio: 0 });
            b1 = data.Cards.Card[i]["#text"];
        }
        switch (i) {
            case 0:
                this.cardsRef.current.addCards("cardZero", b1, cnt);
                break;
            case 1:
                this.cardsRef.current.addCards("cardOne", b1, cnt);
                break;
            case 2:
                this.cardsRef.current.addCards("cardTwo", b1, cnt);
                break;
            case 3:
                this.cardsRef.current.addCards("cardThree", b1, cnt);
                break;
            case 4:
                this.cardsRef.current.addCards("cardFour", b1, cnt);
                break;
            case 5:
                this.cardsRef.current.addCards("cardFive", b1, cnt);
                break;
            default:
                break;
        }
    }

    onDealingCardReplay(cnt, data) {
        const cards = data.cards[0].split(" ");
        // var cnt = cards.length;
        for (let i = 0; i < cnt; i++) {
            var b1 = cards[i];
            switch (i) {
                case 0:
                    this.cardsRef.current.addCards("cardZero", b1, cnt);
                    break;
                case 1:
                    this.cardsRef.current.addCards("cardOne", b1, cnt);
                    break;
                case 2:
                    this.cardsRef.current.addCards("cardTwo", b1, cnt);
                    break;
                case 3:
                    this.cardsRef.current.addCards("cardThree", b1, cnt);
                    break;
                case 4:
                    this.cardsRef.current.addCards("cardFour", b1, cnt);
                    break;
                case 5:
                    this.cardsRef.current.addCards("cardFive", b1, cnt);
                    break;
                default:
                    break;
            }
        }
    }
    onDealingCards_show(data) {
        // let x = this.props.x;
        // let y = this.props.y - this.props.seatProperties.cardY;
        // let xPadding = (this.props.seatProperties.cardY == 90) ? 25 : 18;
        this.setState({ ratio: 1, hidecardRatio: 30 });

        for (let i = 0; i < data.Cards.Card.length; i++) {
            switch (i) {
                case 0:
                    this.cardsRef.current.addCards_show("cardZero", data.Cards.Card[i]["#text"]);
                    break;
                case 1:
                    this.cardsRef.current.addCards_show("cardOne", data.Cards.Card[i]["#text"]);
                    break;
                case 2:
                    this.cardsRef.current.addCards_show("cardTwo", data.Cards.Card[i]["#text"]);
                    break;
                case 3:
                    this.cardsRef.current.addCards_show("cardThree", data.Cards.Card[i]["#text"]);
                    break;
                case 4:
                    this.cardsRef.current.addCards_show("cardFour", data.Cards.Card[i]["#text"]);
                    break;
                case 5:
                    this.cardsRef.current.addCards_show("cardFive", data.Cards.Card[i]["#text"]);
                    break;
                default:
                    break;
            }
        }
    }
    setCardStyle(style) {
        this.cardsRef.current.setCardStyle(style);
    }
    onEndHand() {
        this.cardsRef.current.removeCards();
        this.setState({ showAction: false, handStrength: "", winpercent: "", action: "", SeatBg: [0, '#686868', 1, '#000000'] });
    }

    onChatMessage(text) {
        this.setState({ showChat: true, chatText: text });
        setTimeout(() => {
            this.setState({ showChat: false, chatText: "" });
        }, 3000);
    }
    dividvalue = (data) => {
        // console.log(this.props.BigBlindValue)
        // return Math.floor(Number(data)/Number(this.props.bigshowhide.bigblindvalue))
        return Math.floor(Number(data) / Number(this.props.BigBlindValue))
    }
    // tostringvalue=(data)=>{
    //     return data.toLocaleString()
    // }

    handleAddBuddyClick = () => {
        const { setUUID, seats } = this.state;
        const { network } = this.props;

        const targetSeat = seats.find(seat => seat.id === setUUID.id);
        this.setState({ showAddbuddy: false });
        if (targetSeat) {
            const updatedBuddyStatus = !targetSeat.mybuddy;

            this.setState(prevState => ({
                seats: prevState.seats.map(seat =>
                    seat.id === setUUID.id ? { ...seat, mybuddy: updatedBuddyStatus } : seat
                )
            }));

            const action = updatedBuddyStatus ? "AddBuddy" : "RemoveBuddy";
            network.send(`<${action} uuid="${setUUID.uuid}" />`);
        }
    };
    // handleDoubleClick = () => {
    //     const hideSitHere = () => {
    //         if (this.state.showSeatMenu) {
    //             this.setState({ showSeatMenu: false });
    //         } else {
    //             hideSitHere();
    //         }
    //     };

    //     hideSitHere();
    // };


    render() {
        return (
            <Group>
                <Group>
                    <Group visible={!this.props.tableOriantationLandscape}>
                        {/* ####################################################################### TOP PORTRAIT START ######################################################################## */}
                        <Group container="seat" x={this.props.x} y={this.props.y} width={this.props.seatProperties.panelWidth} height={this.props.seatProperties.panelHeight}>
                            <Group
                                opacity={this.state.alpha}
                                onTap={() => { this.handleClick(this.props.id); }}
                                onClick={(e) => {
                                    if (e.evt.button === 0) { this.handleClick(this.props.id); }
                                    if (e.evt.button === 2) { this.handleOver(this.props.id); }
                                }}
                                onMouseOver={() => { }}
                                onMouseOut={() => { }}
                                scaleX={this.state.animateScale}
                                scaleY={this.state.animateScale}
                                ref={(node) => { this.seat = node; }}
                            >

                                {/* {/ <-------------------------------------------------------------------star start----------------------------------------------------> /} */}

                                {(() => {
                                    let i = 0;
                                    this.imagescount = [];
                                    if (this.state.level > -1) {
                                        for (i; i < 5; i++) {
                                            if (i < this.state.level + 1) {

                                                this.imagescount.push(
                                                    <Star key={i} id={i} x={45 + i * 9} y={-98 - (i > 2 ? -(i - 2) * 2.5 : (i - 2) * 2.5)}
                                                        numPoints={5} innerRadius={2} outerRadius={4} shadowBlur={10} shadowOpacity={0.6}
                                                        fill="#FFD700" opacity={0.8} draggable shadowColor="black"
                                                    />
                                                );
                                            } else {
                                                this.imagescount.push(
                                                    <Star key={i} id={i} x={45 + i * 9} y={-98 - (i > 2 ? -(i - 2) * 2.5 : (i - 2) * 2.5)}
                                                        numPoints={5} innerRadius={2} outerRadius={4} fill="#686868" shadowOpacity={0.6}
                                                        opacity={0.8} draggable shadowColor="black" shadowBlur={10}
                                                    />
                                                );
                                            }
                                        }
                                    }
                                    return this.imagescount;
                                })()}
                                {/* {/ <-------------------------------------------------------------------star end----------------------------------------------------> /} */}

                                <Image x={28} y={-88} width={70} height={70} image={this.state.proImage}
                                    // onTap={() => { this.Upcards(); }}
                                    onClick={(e) => {
                                        if (e.evt.button === 0) { this.Upcards(); }
                                        if (e.evt.button === 2) { this.Upcards(); }
                                    }}
                                />

                                {this.state.playersAvatars !== "" && <PlayerAvtarMobile x={28} y={-88} width={70} height={70} avtar={this.state.playersAvatars} setAvatars={this.props.setAvatars}></PlayerAvtarMobile>}
                            </Group>
                        </Group>
                        {/* ####################################################################### TOP PORTRAIT END ######################################################################## */}
                    </Group>

                    <Cards ref={this.cardsRef} x={this.props.x + 22.5} y={this.props.y - this.props.seatProperties.cardY - 12} tableOriantationLandscape={this.props.tableOriantationLandscape} xPadding={this.props.seatProperties.cardXpadding} scale={this.props.seatProperties.cardScale} ratioed={this.state.ratio} hidecardPos={this.state.hidecardRatio}></Cards>

                    <Group visible={this.props.tableOriantationLandscape} container="seat" x={this.props.x} y={this.props.y} width={this.props.seatProperties.panelWidth} height={this.props.seatProperties.panelHeight}>
                        {/* ####################################################################### LANDSCAPE START ######################################################################## */}
                        <Group
                            x={this.props.seatProperties.padddings.x2 - 18}
                            y={this.props.seatProperties.padddings.y2 + 20}
                            zIndex={10}
                            strokeWidth={1}
                            visible={this.state.showAddbuddy}
                            onClick={(e) => {
                                e.evt.stopPropagation();
                                this.handleAddBuddyClick();
                            }}
                        >
                            <Rect x={0} y={12} width={130} height={25}
                                strokeWidth={1} fillLinearGradientStartPoint={{ x: 65, y: 10 }}
                                fillLinearGradientEndPoint={{ x: 65, y: 40 }}
                                fillLinearGradientColorStops={[0, "#686868", 1, "#000000"]}
                                opacity={1} cornerRadius={[5, 5, 5, 5]}
                            />
                            <Text
                                x={25}
                                y={13}
                                width={80}
                                height={25}
                                align="center"
                                verticalAlign="middle"
                                text={
                                    this.state.seats?.[this.state.setUUID?.id]?.mybuddy
                                        ? "Remove buddy"
                                        : "Add buddy"
                                }
                                fill={this.state.seatMenuColorOne}
                                fontSize={12}
                                fontFamily="Calibri"
                                fontStyle="bold"
                            />

                        </Group>

                        <Group opacity={(this.props.originSeat !== "" && this.state.alpha === 0.6) && !getOpenSeat() ? 0 : this.state.alpha}
                            onTap={(e) => { this.handleClick(this.props.id); }}
                            onClick={(e) => {
                                if (e.evt.button === 0) { this.handleClick(this.props.id); }
                                if (e.evt.button === 2) { this.handleOver(this.props.id); }
                            }}
                            // onDblClick={(e) => {
                            //     e.evt.stopPropagation();
                            //     this.handleDoubleClick();
                            // }}
                            onMouseOver={() => { this.onHoverSeat(this.props.id) }}
                            onMouseOut={() => { this.onHoverOutSeat(this.props.id) }}
                            scaleX={this.state.animateScale}
                            scaleY={this.state.animateScale}
                            ref={(node) => { this.seat = node; }}
                        >



                            <Rect x={0} y={-32} width={130} height={40} visible={true}
                                stroke={"#FFFFFF"} strokeBlur={0} strokeWidth={1}
                                fillLinearGradientStartPoint={{ x: 65, y: 10 }}
                                fillLinearGradientEndPoint={{ x: 65, y: 40 }}
                                fillLinearGradientColorStops={this.state.SeatBg}
                                opacity={this.state.alpha}
                                cornerRadius={[5, 5, 5, 5]}
                            ></Rect>

                            <Image x={-60} y={-160} width={250} height={250} image={this.state.winAnim} visible={this.state.showWinAnima} />
                            {this.state.playersAvatars !== "" && <PlayerAvtar x={-60} y={24} width={35} height={35} avtar={this.state.playersAvatars} setAvatars={this.props.setAvatars}></PlayerAvtar>}

                            <Text x={this.props.seatProperties.padddings.x2 + 75} y={this.props.seatProperties.padddings.y2 - 5} fontStyle={'bold'} fill={"#FF0000"} fontSize={13} text={this.state.enableTwoX == null ? '' : this.state.enableTwoX ? "2X" : ""} />

                            <Text x={this.props.seatProperties.padddingsNew.x1 + this.state.ifAvatarPresent.x}
                                y={this.props.seatProperties.padddingsNew.y1 + this.props.seatProperties.padddingsNew.p1 + this.state.ifKOb.p1}
                                width={this.props.seatProperties.padddingsNew.w1 + this.state.ifKOb.w1} height={this.props.seatProperties.padddingsNew.h1 + this.state.Inactive.h1}
                                align={"left"}
                                visible={(this.state.action === "clear" || this.state.action === "")}
                                verticalAlign={"middle"} text={this.state.name} fontSize={this.state.Inactive.f1 + this.state.ifKOb.f1} fontFamily={"Roboto"}
                                fill={"#FFF"} ></Text>

                            <Text x={this.props.seatProperties.padddingsNew.x2 + this.state.ifAvatarPresent.x}
                                y={this.props.seatProperties.padddingsNew.y2 + this.props.seatProperties.padddingsNew.p1 + this.state.ifKOb.p1 * 2.5}
                                width={this.props.seatProperties.padddingsNew.w1 + this.state.ifKOb.w1} height={this.props.seatProperties.padddingsNew.h1} align={"left"}
                                verticalAlign={"middle"}
                                visible={(this.state.action === "clear" || this.state.action === "")}
                                text={isNaN(this.state.chips) ? "####" : this.state.toggleBB ? (Number(this.state.chips)).toLocaleString() !== "0" ? `${this.dividvalue(this.state.chips)} BB` : "" : Number(this.state.chips) < 0 ? 0 : UM.numberWithCommas_length9(this.state.chips)}
                                fill={"#fff"} fontSize={this.state.Inactive.f1 + this.state.ifKOb.f1}
                                fontFamily={"Roboto"} fontStyle={'bold'}></Text>

                            {/* {/ <------------------------------------knockout-bounty-start-----------------------------------------------> /} */}
                            {this.state.showKnockOutBounty &&
                                <Text x={this.props.seatProperties.padddingsNew.x4 + this.state.ifAvatarPresent.x} y={this.props.seatProperties.padddingsNew.y4 + this.props.seatProperties.padddingsNew.p1 + this.state.ifKOb.p1}
                                    width={this.props.seatProperties.padddingsNew.w1 + this.state.ifKOb.w1} height={this.props.seatProperties.padddingsNew.h1} align={"left"}
                                    verticalAlign={"middle"} text={this.state.knockoutBounty} fill={"#fff"} fontSize={this.state.Inactive.f1 + this.state.ifKOb.f1}
                                    fontFamily={"Roboto"} fontStyle={'bold'}  ></Text>}
                            {/* {/ <------------------------------------knockout-bounty-end-----------------------------------------------> /} */}

                            {(this.state.changeposition === "Yes" && this.state.action !== "") && <Rect
                                visible={this.state.action !== "clear"}
                                width={this.props.seatProperties.padddingsNew.w5} height={this.props.seatProperties.padddingsNew.h5}
                                x={this.props.seatProperties.padddingsNew.x5 + this.state.ifAvatarPresent.x} y={this.props.seatProperties.padddingsNew.y5}
                                fillLinearGradientStartPoint={{ x: 40, y: 10 }}
                                fillLinearGradientEndPoint={{ x: 40, y: 38 }}
                                fillLinearGradientColorStops={this.state.SeatBg}
                                cornerRadius={[5, 5, 5, 5]}
                            ></Rect>}

                            {/* {(this.state.changeposition === "No" && this.state.action !== "") &&
                                <Rect
                                    visible={this.state.action === "Fold" || this.state.action === "Check"}
                                    width={this.props.seatProperties.padddingsNew.w5} height={this.props.seatProperties.padddingsNew.h5}
                                    x={this.props.seatProperties.padddingsNew.x5 + this.state.ifAvatarPresent.x - 5} y={this.props.seatProperties.padddingsNew.y5 + 5}
                                    fillLinearGradientStartPoint={{ x: 40, y: 10 }}
                                    fillLinearGradientEndPoint={{ x: 40, y: 38 }}
                                    fillLinearGradientColorStops={this.state.SeatBg}
                                    opacity={2}
                                    cornerRadius={[5, 5, 5, 5]}
                                ></Rect>
                            } */}

                            <Text x={this.props.seatProperties.padddingsNew.x5 + this.state.ifAvatarPresent.x + (this.state.action === "Fold" ? 5 : 0)} y={this.props.seatProperties.padddingsNew.y5 + (this.state.action === "Fold" ? -5 : 0)}
                                visible={this.state.action !== "clear"}
                                width={this.props.seatProperties.padddingsNew.w5} height={this.props.seatProperties.padddingsNew.h5} align={"left"}
                                // verticalAlign={"bottom"} text={this.state.action === "clear" ? '' : this.state.action} fill={this.state.ritcolor} fontSize={this.props.seatProperties.padddingsNew.f5} fontFamily={"Roboto"} fontStyle={'bold'}></Text>
                                verticalAlign={"bottom"} text={this.state.action}
                                fill={this.state.ritcolor} fontSize={this.props.seatProperties.padddingsNew.f5} fontFamily={"Roboto"} fontStyle={'bold'}></Text>

                            {(() => {
                                let i = 0;
                                this.imagescount = [];
                                if (this.state.playersAvatars !== "") {
                                    for (i; i < 5; i++) {
                                        if (i < this.state.level + 1) {

                                            this.imagescount.push(
                                                <Star key={i} id={i} numPoints={5} innerRadius={2} outerRadius={4} fill="#FFD700" opacity={0.8}
                                                    x={(this.props.seatProperties.padddingsNew.x3 + (this.state.calltimetable.hide_show ? - 8 : 0)) + this.state.ifAvatarPresent.x + i * 9}
                                                    y={this.props.seatProperties.padddingsNew.y3 + this.props.seatProperties.padddingsNew.p1 - this.state.ifKOb.p1 * 3}
                                                    draggable shadowColor="black" shadowBlur={10} shadowOpacity={0.6}
                                                />
                                            );
                                        } else {
                                            this.imagescount.push(
                                                <Star key={i} id={i} numPoints={5} innerRadius={2} outerRadius={4} fill="#686868" opacity={0.8}
                                                    x={(this.props.seatProperties.padddingsNew.x3 + (this.state.calltimetable.hide_show ? -8 : 0)) + this.state.ifAvatarPresent.x + i * 9}
                                                    y={this.props.seatProperties.padddingsNew.y3 + this.props.seatProperties.padddingsNew.p1 - this.state.ifKOb.p1 * 3}
                                                    draggable shadowColor="black" shadowBlur={10} shadowOpacity={0.6}
                                                />
                                            );
                                        }
                                    }
                                }
                                return this.imagescount;
                            })()}

                            {(this.state.showTimerleft) && <Rect
                                width={this.props.seatProperties.padddingsNew.w5} height={this.props.seatProperties.padddingsNew.h5}
                                x={this.props.seatProperties.padddingsNew.x5 + this.state.ifAvatarPresent.x - 4} y={this.props.seatProperties.padddingsNew.y5 + 5}
                                fillLinearGradientStartPoint={{ x: 40, y: 10 }}
                                fillLinearGradientEndPoint={{ x: 40, y: 38 }}
                                fillLinearGradientColorStops={this.state.SeatBg}
                                cornerRadius={[5, 5, 5, 5]}
                            ></Rect>}

                            {this.state.showTimerleft && <Text
                                width={this.props.seatProperties.padddingsNew.w5} height={this.props.seatProperties.padddingsNew.h5} align={"left"}
                                x={this.props.seatProperties.padddingsNew.x5 + 13 + this.state.ifAvatarPresent.x} y={this.props.seatProperties.padddingsNew.y5 + 6}
                                verticalAlign={"middle"} text={"TIME " + (this.state.timerLeft / 1000).toFixed(0)} fill={this.state.ritcolor} fontSize={14} fontFamily={"Roboto"} fontStyle={'bold'}></Text>}

                            {/* {/ <------------------------------------Call-Time-Table-Timer-Start-----------------------------------------------> /} */}
                            {this.state.calltimetable.hide_show && <Text x={this.props.seatProperties.padddingsNew.x6 + this.state.ifAvatarPresent.x - 4} y={this.props.seatProperties.padddingsNew.y6 - 2} align={"center"} verticalAlign={"middle"} width={this.props.seatProperties.padddingsNew.w6} fontSize={this.props.seatProperties.padddingsNew.f6} height={this.props.seatProperties.padddingsNew.h6} text={`${(Math.trunc((this.state.calltimetable.Time) / 60)).toString().padStart(2, '0')} : ${(Math.trunc((this.state.calltimetable.Time) % 60)).toString().padStart(2, '0')}`} fill="#FFF" ontStyle={"bold"}></Text>}
                            {/* {/ <------------------------------------Call-Time-Table-Timer-End-----------------------------------------------> /} */}

                            <Timer x={this.props.seatProperties.padddings.x2 - 16.5} y={-this.props.seatProperties.padddings.y3 + 16} width={this.props.seatProperties.width + 35} height={this.props.seatProperties.height - 5} show={this.state.showTimer && !this.state.showTimerleft} value={this.state.timerValue}></Timer>

                            <Rect x={this.props.seatProperties.padddings.x3 - 20} y={this.props.seatProperties.padddings.y3 - 25}
                                width={145} height={this.props.seatProperties.height + 40}
                                fill={"#000000c0"} cornerRadius={[5, 5, 5, 5]} visible={this.state.showAction} wrap={'balance'} align={"center"} />
                            <Text x={this.props.seatProperties.padddings.x3 - 15} y={this.props.seatProperties.padddings.y3 - 25}
                                width={120} wrap="char" height={this.props.seatProperties.height + 40} align={"center"}
                                verticalAlign={"middle"} text={`${this.state.handStrength.split(",").join("\n")}${this.state.winpercent !== "" ? `${"\n" + this.state.winpercent}` : ""}`} fill={"#fff"} fontSize={12} fontFamily={"Roboto"} fontStyle={'bold'} />
                        </Group>
                        <Group x={0} y={this.props.y > 330 ? -85 : 0} visible={this.state.showSeatMenu} onClick={() => { this.setState({ showSeatMenu: false }); this.props.changeSeatHandler(this.props.id) }}
                            onTap={() => { this.setState({ showSeatMenu: false }); this.props.changeSeatHandler(this.props.id) }}>
                            <Rect x={0} y={12} width={130} height={40}
                                strokeBlur={0} strokeWidth={1} fillLinearGradientStartPoint={{ x: 65, y: 10 }}
                                fillLinearGradientEndPoint={{ x: 65, y: 40 }}
                                fillLinearGradientColorStops={this.state.SeatBg}
                                opacity={1} cornerRadius={[5, 5, 5, 5]}
                            ></Rect>

                            <Image ref={(node) => { this.imageRef = node; }}
                                x={12.5} y={17} image={this.state.SithereImage}
                                width={213} height={60} scaleX={0.5} scaleY={0.5}
                                cornerRadius={[5, 20, 20, 5]}
                                crop={this.state.seatMenuImageOne}
                            />

                            <Text x={25} y={22} width={80} height={20} align={"center"} verticalAlign={"middle"}
                                text={"Sit Here"} fill={this.state.seatMenuColorOne} fontSize={16} fontFamily={"Calibri"}
                                onMouseOver={() => { this.setState({ seatMenuColorOne: '#ff0000', seatMenuImageOne: { x: 0, y: 60, width: 213, height: 60 } }) }}
                                onMouseOut={() => { this.setState({ seatMenuColorOne: '#FFFFFF', seatMenuImageOne: { x: 0, y: 0, width: 213, height: 60 } }) }}
                                onTouchStart={() => {
                                    this.imageRef.setAttrs({
                                        cropX: 0,
                                        cropY: 60,
                                        width: 213,
                                        height: 60,
                                    });
                                }}
                                onTouchEnd={() => {
                                    this.imageRef.setAttrs({
                                        cropX: 0,
                                        cropY: 0,
                                        width: 213,
                                        height: 60,
                                    });
                                }}
                                fontStyle={'bold'} ></Text>
                        </Group>
                        <Group x={0} y={0} >
                            <Rect x={18} y={-5} width={90} height={20} onClick={(e) => { this.setState({ toggleBB: !this.state.toggleBB }) }} />
                        </Group>
                        <Group x={0} y={-10} visible={this.state.showChat} >
                            <Image x={0} y={-this.props.seatProperties.panelHeight * 0.5 - 42} width={120} height={40} image={this.state.chat} />
                            <Text x={0} y={-this.props.seatProperties.panelHeight * 0.5 - 40} width={120} height={30} align={"center"}
                                verticalAlign={"middle"} text={this.state.chatText} fill={this.state.seatMeanuMegTxt} fontSize={10} fontFamily={"Roboto"}
                                onClick={() => { this.setState({ showSeatMenu: false }); clearTimeout(this.settimeoutTimer); this.props.changeSeatHandler(this.props.id) }}
                                onMouseOver={() => { this.setState({ seatMeanuMegTxt: '#80ff00' }) }}
                                onMouseOut={() => { this.setState({ seatMeanuMegTxt: '#ffff' }) }}></Text>
                        </Group>
                    </Group>
                    {/* ####################################################################### LANDSCAPE END ######################################################################## */}
                </Group>
                {/* ======================================================================================================================================================================= */}


                <Group visible={!this.props.tableOriantationLandscape}>
                    {/* ####################################################################### BOTTOM PORTRAIT START ######################################################################## */}
                    <Group>
                        <Group container="seat" x={this.props.x} y={this.props.y} width={this.props.seatProperties.panelWidth} height={this.props.seatProperties.panelHeight}>
                            <Group
                                opacity={this.state.alpha}
                                onTap={(e) => { this.handleClick(this.props.id); }}
                                onClick={(e) => {
                                    if (e.evt.button === 0) { this.handleClick(this.props.id); }
                                    if (e.evt.button === 2) { this.handleOver(this.props.id); }
                                }}
                                onMouseOver={() => { }}
                                onMouseOut={() => { }}
                                scaleX={this.state.animateScale}
                                scaleY={this.state.animateScale}
                                ref={(node) => { this.seat = node; }}
                            >
                                {!this.state.showKnockOutBounty && <Image x={8} y={-30} width={110} height={50} image={this.state.proLable} />}
                                {this.state.showKnockOutBounty && <Image x={8} y={-30} width={110} height={70} image={this.state.proLable1} />}

                                <Image x={-60} y={-160} width={250} height={250} image={this.state.winAnim} visible={this.state.showWinAnima} />

                                <Text x={this.props.seatProperties.padddings.x2 + 75} y={this.props.seatProperties.padddings.y2 - 5} fontStyle={'bold'} fill={"#FF0000"} fontSize={13} text={this.state.enableTwoX == null ? '' : this.state.enableTwoX ? "2X" : ""} />
                                <Text x={this.props.seatProperties.padddings.x2 - 5} y={this.state.showKnockOutBounty ? -this.props.seatProperties.padddings.y2 - 16 : -this.props.seatProperties.padddings.y2 - 14}
                                    width={this.props.seatProperties.width + 8} height={this.props.seatProperties.height} align={"center"}
                                    verticalAlign={"middle"} text={this.state.name} fontSize={14} fontFamily={"Roboto"}
                                    fill={(fileName.name === "Leader_bet" ? "#9b9b9b" : "#dfb276")} ></Text>
                                <Text x={this.state.calltimetable.hide_show ? this.props.seatProperties.padddings.x1 - 15 : this.props.seatProperties.padddings.x1} y={(fileName.name === "Leader_bet" ? -this.props.seatProperties.padddings.y1 + 15 : (this.state.showKnockOutBounty ? -this.props.seatProperties.padddings.y1 + 18 : -this.props.seatProperties.padddings.y1 + 20))}
                                    width={this.props.seatProperties.width + 10} height={this.props.seatProperties.height} align={"center"}
                                    verticalAlign={"middle"}
                                    text={isNaN(this.state.chips) ? "####" : this.props.valueBB ? (Number(this.state.chips)).toLocaleString() !== "0" ? `${this.dividvalue(this.state.chips)} BB` : "" : Number(this.state.chips) < 0 ? 0 : UM.numberWithCommas_length9(this.state.chips)}
                                    fill={"#fff"} fontSize={(fileName.name === "Leader_bet" ? 15 : 12)}
                                    fontFamily={"Roboto"} fontStyle={'bold'}></Text>


                                {/* {/ <------------------------------------knockout-bounty-start-----------------------------------------------> /} */}
                                {this.state.showKnockOutBounty &&
                                    <Text x={this.props.seatProperties.padddings.x1 + 1} y={-this.props.seatProperties.padddings.y1 + 33.5}
                                        width={this.props.seatProperties.width + 10} height={this.props.seatProperties.height} align={"center"}
                                        verticalAlign={"middle"} text={this.state.knockoutBounty} fill={"#7FCDFF"} fontSize={12}
                                        fontFamily={"Roboto"} fontStyle={'bold'}  ></Text>}
                                {/* {/ <------------------------------------knockout-bounty-end-----------------------------------------------> /} */}

                                {/* {/ <------------------------------------Call-Time-Table-Timer-Start-----------------------------------------------> /} */}
                                {(this.state.calltimetable.hide_show && !(this.state.name === "Open Seat" || this.state.name === "Take Seat")) && <Rect x={this.props.seatProperties.padddings.x2 + 57} y={-this.props.seatProperties.padddings.y3 + 4} stroke={"#3CA2C8"} shadowColor={"green"} cornerRadius={[5, 5, 5, 5]} width={this.props.seatProperties.width - 55} height={this.props.seatProperties.height + 4} ></Rect>}
                                {(this.state.calltimetable.hide_show && !(this.state.name === "Open Seat" || this.state.name === "Take Seat")) && <Text x={this.props.seatProperties.padddings.x2 + 50} y={-this.props.seatProperties.padddings.y3 + 8} align={"center"} verticalAlign={"middle"} width={this.props.seatProperties.width - 40} fontSize={10} text={`${(Math.trunc((this.state.calltimetable.Time) / 60)).toString().padStart(2, '0')} : ${(Math.trunc((this.state.calltimetable.Time) % 60)).toString().padStart(2, '0')}`} fill="#FF0000" ontStyle={"bold"}></Text>}
                                {/* {/ <------------------------------------Call-Time-Table-Timer-End-----------------------------------------------> /} */}

                                {/* <Timer x={this.props.seatProperties.padddings.x2 - 2} y={-this.props.seatProperties.padddings.y3 + ((fileName.name === "Leader_bet" && Screen.getDeviceType().name == "Mobile") ? (this.state.showKnockOutBounty ? 35 : 25) : (fileName.name === "Riverpoker" && Screen.getDeviceType().name === "Mobile") ? (this.state.showKnockOutBounty ? 35 : 28) : 35)} width={this.props.seatProperties.width + 20} height={this.props.seatProperties.height - 5} show={this.state.showTimer} value={this.state.timerValue}></Timer> */}
                                <Timer x={this.props.seatProperties.padddings.x2 - 2} y={-this.props.seatProperties.padddings.y3 + ((fileName.name === "Leader_bet" && Screen.getDeviceType().name == "Mobile") ? (this.state.showKnockOutBounty ? 35 : 25) : (fileName.name === "Riverpoker" && Screen.getDeviceType().name === "Mobile") ? (this.state.showKnockOutBounty ? 35 : 28) : 35)} width={this.props.seatProperties.width + 5} height={this.props.seatProperties.height - 5} show={this.state.showTimer} value={this.state.timerValue}></Timer>
                                <Rect x={this.props.seatProperties.padddings.x3 - 23} y={this.props.seatProperties.padddings.y3 - 17}
                                    width={145} height={this.props.seatProperties.height + 40}
                                    fill={"#000000"} cornerRadius={[5, 5, 5, 5]} visible={this.state.showAction} wrap={'balance'} align={"center"} />

                                <Text x={this.props.seatProperties.padddings.x3 - 15} y={this.props.seatProperties.padddings.y3 - 17}
                                    width={120} wrap="char" height={this.props.seatProperties.height + 40} align={"center"}
                                    verticalAlign={"middle"} text={`${this.state.handStrength.split(",").join("\n")}${this.state.winpercent !== "" ? `${"\n" + this.state.winpercent}` : ""}`} fill={"#fff"} fontSize={14} fontFamily={"Roboto"} fontStyle={'bold'} />
                                <Rect x={26.7} y={-58} width={75} height={30} fill={this.colorchange()} fontStyle={"bold"} stroke={this.colorchange1()} fontSize={15} fontFamily={"Roboto"} shadowColor={this.colorchange1()} cornerRadius={[5, 5, 5, 5]} />
                                <Text x={23.8} y={-52} width={80} height={20} align={"center"} verticalAlign={"middle"} text={this.messagechange()} fill={fileName.name === "Leader_bet" ? this.changeTxtColor() : "#fff"} fontSize={15} fontFamily={"Roboto"} fontStyle={"bold"}></Text>
                            </Group>

                            <Group x={0} y={this.props.y > 330 ? -85 : 0} visible={this.state.showSeatMenu} onClick={() => { this.setState({ showSeatMenu: false }); this.props.changeSeatHandler(this.props.id) }}
                                onTap={() => { this.setState({ showSeatMenu: false }); clearTimeout(this.settimeoutTimer); this.props.changeSeatHandler(this.props.id) }}>
                                <Rect x={0} y={12} width={130} height={40} strokeBlur={0} strokeWidth={1} fillLinearGradientStartPoint={{ x: 65, y: 10 }}
                                    fillLinearGradientEndPoint={{ x: 65, y: 40 }} fillLinearGradientColorStops={this.state.SeatBg}
                                    opacity={1} cornerRadius={[5, 5, 5, 5]}
                                ></Rect>

                                <Image ref={(node) => { this.imageRef = node; }} x={12.5} y={17} image={this.state.SithereImage}
                                    width={213} height={60} scaleX={0.5} scaleY={0.5}
                                    cornerRadius={[5, 20, 20, 5]} crop={this.state.seatMenuImageOne}
                                />
                                <Text x={25} y={22} width={80} height={20} align={"center"} verticalAlign={"middle"}
                                    text={"Sit Here"} fill={this.state.seatMenuColorOne} fontSize={16} fontFamily={"Calibri"}
                                    onMouseOver={() => { this.setState({ seatMenuColorOne: '#ff0000', seatMenuImageOne: { x: 0, y: 60, width: 213, height: 60 } }) }}
                                    onMouseOut={() => { this.setState({ seatMenuColorOne: '#FFFFFF', seatMenuImageOne: { x: 0, y: 0, width: 213, height: 60 } }) }}
                                    onTouchStart={() => {
                                        this.imageRef.setAttrs({ cropX: 0, cropY: 60, width: 213, height: 60, });
                                    }}
                                    onTouchEnd={() => {
                                        this.imageRef.setAttrs({ cropX: 0, cropY: 0, width: 213, height: 60, });
                                    }}
                                    fontStyle={'bold'} ></Text>
                            </Group>


                            <Group x={0} y={0} >
                                <Rect x={18} y={-5} width={90} height={20} onClick={() => {
                                    if (this.state.chips != "") { this.handleClick1() }
                                }}
                                />
                            </Group>
                            <Group
                                x={0}
                                y={0}
                                visible={this.state.showChat}>
                                <Image x={0} y={-this.props.seatProperties.panelHeight * 0.5 - 70} width={120} height={40} image={this.state.chat} />
                                <Text x={0} y={-this.props.seatProperties.panelHeight * 0.5 - 73} width={120} height={40} align={"center"}
                                    verticalAlign={"middle"} text={this.state.chatText} fill={this.state.seatMeanuMegTxt} fontSize={14}
                                    fontFamily={"Roboto"}
                                    onClick={() => { this.setState({ showSeatMenu: false }); this.props.changeSeatHandler(this.props.id) }}
                                    onMouseOver={() => { this.setState({ seatMeanuMegTxt: '#80ff00' }) }}
                                    onMouseOut={() => { this.setState({ seatMeanuMegTxt: '#ffff' }) }}></Text>
                            </Group>
                        </Group>
                    </Group>
                    {/* ####################################################################### BOTTOM PORTRAIT END ######################################################################## */}
                </Group>
            </Group>
        );
    }
}
