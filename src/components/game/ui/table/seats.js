import "../../../../css/ui/table/seats.css";
import React, { Component } from "react";
import { Rect, Image, Layer, Group, Text, Circle } from "react-konva";
// import Countdown from 'react-countdown';

import TargetPos from './../table/animation/targetpos'
import Seat from "../../ui/table/seat/seat";
import { Dealer } from "../../ui/table/dealer";
import { SeatPot } from "../../ui/table/pots/seatPot";
import { TablePot } from "../../ui/table/pots/tablePot";
import { AnimationHere } from "../../ui/table/animation/dragAnimation";

// import NewTable from "../../../../assets/images/lobby/tableIcons/tableBg/NewTable.png";
import tablepot from '../../../../assets/images/table/chipstack_main.png'
import chipSounds from "../../../../assets/audio/Chips.wav";
import foldSound from "../../../../assets/audio/FoldFlash.wav";
import checkSound from "../../../../assets/audio/CheckFlash.wav";
import betRaiseSound from "../../../../assets/audio/BetRaiseFlash.wav";
import callSound from "../../../../assets/audio/CallFlash.wav";


import axe from '../../../../assets/images/table/Animation_images/Axe.png'
import fish from '../../../../assets/images/table/Animation_images/fish.gif'
import money from '../../../../assets/images/table/Animation_images/money.gif'
import tissues from '../../../../assets/images/table/Animation_images/tissue.gif'
// import fishstick from '../../../../assets/images/table/Animation_images/Rod.gif'
import sssss from '../../../../assets/images/table/Animation_images/Asset 1.png'
import fileName from "../../../../jsconfig";


import Screen from '../../../utils/screen';
import Config from "../../../../config";
import { getChipAnimation, getHandStrength, getMuteValue } from "../../../utils/global";

import UM from "../../../utils/utilityMethods";
import Landscape from "../../../utils/landscape";
import Portrait from "../../../utils/portraite";
import eventEmitter from "../../../utils/eventEmitter";


export class Seats extends Component {
    constructor(props) {
        super(props);
        this.seatsContainer = [];
        this.seatPotContainer = [];
        this.tablePotContainer = [];
        this.dragContainer = [];
        this.seatsContainer1 = [];
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.dvHt = null;
        this.dvWid = null;
        this.gameBox = null;
        this.gbw = null;
        this.gbh = null;
        this.originSeat = null;
        // this.cw_max = 1220 / 20;
        // this.ch_max = 620 / 30;
        // this.cw_min = 0;
        // this.ch_min = 0;
        this.cw_min = props.stageProperties.width / 20;
        this.ch_min = props.stageProperties.height / 30;

        this.state = {
            RakeAmount: 0,
            dragdetails: {
                index: null,
                name: ''
            },
            color: '#ff0000',
            chipstack: null,
            // tableOriantation: (this.props.stageWidth > 799 ? "landscape" : "portraite"),
            image: null,
            textHeight: 0,
            image1: null,
            image2: null,
            image3: null,
            image4: null,
            animationid: 0,
            setAvatars: "",
            countchips: { amount10: 0, amount50: 0, amount100: 0, amount500: 0, amount1k: 0, amount5k: 0, amount10k: 0, amount50k: 0 },
            seatPots: [
                { amount: 0, show: false },
                { amount: 0, show: false },
                { amount: 0, show: false },
                { amount: 0, show: false },
                { amount: 0, show: false },
                { amount: 0, show: false },
                { amount: 0, show: false },
                { amount: 0, show: false },
                { amount: 0, show: false },
                { amount: 0, show: false },
            ],
            tablePots: [
                { amount: 0, show: false, rakeShow: false, rakeCut: 0 },
                { amount: 0, show: false, rakeShow: false, rakeCut: 0 },
                { amount: 0, show: false, rakeShow: false, rakeCut: 0 },
                { amount: 0, show: false, rakeShow: false, rakeCut: 0 },
                { amount: 0, show: false, rakeShow: false, rakeCut: 0 },
                { amount: 0, show: false, rakeShow: false, rakeCut: 0 },
                { amount: 0, show: false, rakeShow: false, rakeCut: 0 },
                { amount: 0, show: false, rakeShow: false, rakeCut: 0 },
                { amount: 0, show: false, rakeShow: false, rakeCut: 0 },
                { amount: 0, show: false, rakeShow: false, rakeCut: 0 },
            ],
            seatLayout: (this.props.tableOriantationLandscape ? Landscape.seatLayout : Portrait.seatLayout),
            seatPotLayout: (this.props.tableOriantationLandscape ? Landscape.seatPotLayout : Portrait.seatPotLayout),
            DealerLayout: (this.props.tableOriantationLandscape ? Landscape.DealerLayout : Portrait.DealerLayout),
            tablePotLayout: (this.props.tableOriantationLandscape ? Landscape.tablePotLayout : Portrait.tablePotLayout),
            // DealerLayout: {
            //     2: [
            //         { x: this.cw_min * 15.85, y: this.ch_min * 14.5 },
            //         { x: this.cw_min * 4, y: this.ch_min * 14.5 },
            //     ],
            //     3: [
            //         { x: this.cw_min * 15.5, y: this.ch_min * 8.8 },
            //         { x: this.cw_min * 15.5, y: this.ch_min * 20 },
            //         { x: this.cw_min * 3.92, y: this.ch_min * 14.2 },
            //     ],

            //     4: [
            //         { x: this.cw_min * 11.2, y: this.ch_min * 7.4 },
            //         // { x: this.cw_min * 15.5, y: this.ch_min * 9.2 },
            //         // { x: this.cw_min * 15.95, y: this.ch_min * 13.2 },
            //         // { x: this.cw_min * 15.5, y: this.ch_min * 20 },
            //         { x: this.cw_min * 11.2, y: this.ch_min * 21 },
            //         { x: this.cw_min * 8.6, y: this.ch_min * 21 },
            //         // { x: this.cw_min * 4.35, y: this.ch_min * 20 },
            //         // { x: this.cw_min * 3.9, y: this.ch_min * 13.2 },
            //         // { x: this.cw_min * 4.32, y: this.ch_min * 9.2 },
            //         { x: this.cw_min * 8.56, y: this.ch_min * 7.4 },
            //     ],

            //     5: [
            //         { x: this.cw_min * 11.2, y: this.ch_min * 7.4 },
            //         // { x: this.cw_min * 15.5, y: this.ch_min * 9.2 },
            //         { x: this.cw_min * 15.95, y: this.ch_min * 13.2 },
            //         // { x: this.cw_min * 15.5, y: this.ch_min * 20 },
            //         { x: this.cw_min * 11.2, y: this.ch_min * 21 },
            //         { x: this.cw_min * 8.6, y: this.ch_min * 21 },
            //         // { x: this.cw_min * 4.35, y: this.ch_min * 20 },
            //         // { x: this.cw_min * 3.9, y: this.ch_min * 13.2 },
            //         // { x: this.cw_min * 4.32, y: this.ch_min * 9.2 },
            //         { x: this.cw_min * 8.56, y: this.ch_min * 7.4 },
            //     ],

            //     6: [
            //         { x: this.cw_min * 11.2, y: this.ch_min * 7.4 },
            //         // { x: this.cw_min * 15.5, y: this.ch_min * 9.2 },
            //         { x: this.cw_min * 15.95, y: this.ch_min * 13.2 },
            //         // { x: this.cw_min * 15.5, y: this.ch_min * 20 },
            //         { x: this.cw_min * 11.2, y: this.ch_min * 21 },
            //         { x: this.cw_min * 8.6, y: this.ch_min * 21 },
            //         // { x: this.cw_min * 4.35, y: this.ch_min * 20 },
            //         { x: this.cw_min * 3.9, y: this.ch_min * 13.2 },
            //         // { x: this.cw_min * 4.32, y: this.ch_min * 9.2 },
            //         { x: this.cw_min * 8.56, y: this.ch_min * 7.4 },
            //     ],

            //     7: [
            //         { x: this.cw_min * 11.2, y: this.ch_min * 7.4 },
            //         { x: this.cw_min * 15.5, y: this.ch_min * 9.2 },
            //         // { x: this.cw_min * 15.95, y: this.ch_min * 13.2 },
            //         { x: this.cw_min * 15.5, y: this.ch_min * 20 },
            //         { x: this.cw_min * 11.2, y: this.ch_min * 21 },
            //         { x: this.cw_min * 8.6, y: this.ch_min * 21 },
            //         // { x: this.cw_min * 4.35, y: this.ch_min * 20 },
            //         { x: this.cw_min * 3.9, y: this.ch_min * 13.2 },
            //         // { x: this.cw_min * 4.32, y: this.ch_min * 9.2 },
            //         { x: this.cw_min * 8.56, y: this.ch_min * 7.4 },
            //     ],

            //     8: [
            //         { x: this.cw_min * 11.2, y: this.ch_min * 7.4 },
            //         { x: this.cw_min * 15.5, y: this.ch_min * 9 },
            //         // { x: this.cw_min * 15.95, y: this.ch_min * 13.2 },
            //         { x: this.cw_min * 15.5, y: this.ch_min * 20 },
            //         { x: this.cw_min * 11.2, y: this.ch_min * 21 },
            //         { x: this.cw_min * 8.6, y: this.ch_min * 21 },
            //         { x: this.cw_min * 4.35, y: this.ch_min * 20 },
            //         // { x: this.cw_min * 3.9, y: this.ch_min * 13.2 },
            //         { x: this.cw_min * 4.32, y: this.ch_min * 9 },
            //         { x: this.cw_min * 8.56, y: this.ch_min * 7.4 },
            //     ],

            //     9: [
            //         { x: this.cw_min * 11.2, y: this.ch_min * 7.4 },
            //         { x: this.cw_min * 15.5, y: this.ch_min * 9 },
            //         { x: this.cw_min * 15.95, y: this.ch_min * 13.2 },
            //         { x: this.cw_min * 15.5, y: this.ch_min * 20 },
            //         { x: this.cw_min * 11.2, y: this.ch_min * 21 },
            //         { x: this.cw_min * 8.6, y: this.ch_min * 21 },
            //         { x: this.cw_min * 4.35, y: this.ch_min * 20 },
            //         // { x: this.cw_min * 3.9, y: this.ch_min * 13.2 },
            //         { x: this.cw_min * 4.32, y: this.ch_min * 9 },
            //         { x: this.cw_min * 8.56, y: this.ch_min * 7.4 },
            //     ],
            //     10: [
            //         { x: this.cw_min * 11.2, y: this.ch_min * 7.4 },
            //         { x: this.cw_min * 15.5, y: this.ch_min * 9 },
            //         { x: this.cw_min * 15.95, y: this.ch_min * 13.2 },
            //         { x: this.cw_min * 15.5, y: this.ch_min * 20 },
            //         { x: this.cw_min * 11.2, y: this.ch_min * 21 },
            //         { x: this.cw_min * 8.6, y: this.ch_min * 21 },
            //         { x: this.cw_min * 4.35, y: this.ch_min * 20 },
            //         { x: this.cw_min * 3.9, y: this.ch_min * 13.2 },
            //         { x: this.cw_min * 4.32, y: this.ch_min * 9 },
            //         { x: this.cw_min * 8.56, y: this.ch_min * 7.4 },
            //     ],
            // },
            seatPotTextLayout: {
                2: [
                    { x: -70.0, y: 5, align: "right" },
                    { x: 20, y: 5, align: "left" },
                ],
                3: [
                    { x: -70.0, y: 5, align: "right" },
                    { x: 20, y: 5, align: "left" },
                    { x: 20, y: 5, align: "left" },
                ],

                4: [
                    { x: -25, y: 23, align: "center" },
                    { x: -70.0, y: 5, align: "right" },
                    { x: 20, y: 5, align: "left" },
                    { x: -25, y: 23, align: "center" },
                ],

                5: [
                    { x: -25, y: 23, align: "center" },
                    { x: -70.0, y: 5, align: "right" },
                    { x: 20, y: 5, align: "left" },
                    { x: 20, y: 5, align: "left" },
                    { x: -25, y: 23, align: "center" },
                ],

                6: [
                    { x: -25, y: 23, align: "center" },
                    { x: -70.0, y: 5, align: "right" },
                    { x: 20, y: 5, align: "left" },
                    { x: -70, y: 5, align: "right" },
                    { x: 20, y: 5, align: "left" },
                    { x: -25, y: 23, align: "center" },
                ],

                7: [
                    { x: -25, y: 23, align: "center" },
                    { x: -70.0, y: 5, align: "right" },
                    { x: -70.0, y: 5, align: "right" },
                    { x: 20, y: 5, align: "left" },
                    { x: -70, y: 5, align: "right" },
                    { x: 20, y: 5, align: "left" },
                    { x: -25, y: 23, align: "center" },
                ],

                8: [
                    { x: -25, y: 23, align: "center" },
                    { x: -70.0, y: 5, align: "right" },
                    { x: -70.0, y: 5, align: "right" },
                    { x: 20, y: 5, align: "left" },
                    { x: -70.0, y: 5, align: "right" },
                    { x: 20, y: 5, align: "left" },
                    { x: 20, y: 5, align: "left" },
                    { x: -25, y: 23, align: "center" },
                ],

                9: [
                    { x: -25, y: 23, align: "center" },
                    { x: -70.0, y: 5, align: "right" },
                    { x: -70.0, y: 5, align: "right" },
                    { x: -70.0, y: 5, align: "right" },
                    { x: 20, y: 5, align: "left" },
                    { x: -70.0, y: 5, align: "right" },
                    { x: 20, y: 5, align: "left" },
                    // { x: 20, y: 5, align: "left" },
                    { x: 20, y: 5, align: "left" },
                    { x: -25, y: 23, align: "center" },
                ],

                10: [
                    { x: -25, y: 23, align: "center" },
                    { x: -70.0, y: 5, align: "right" },
                    { x: -70.0, y: 5, align: "right" },
                    { x: -70.0, y: 5, align: "right" },
                    { x: 20, y: 5, align: "left" },
                    { x: -70.0, y: 5, align: "right" },
                    { x: 20, y: 5, align: "left" },
                    { x: 20, y: 5, align: "left" },
                    { x: 20, y: 5, align: "left" },
                    { x: -25, y: 23, align: "center" },
                ],
            },
            // tablePotLayout: [
            //     { x: this.cw_min * 9.7, y: this.ch_min * 8.8 },
            //     { x: this.cw_min * 13.2, y: this.ch_min * 12 },
            //     { x: this.cw_min * 6.2, y: this.ch_min * 12 },
            //     { x: this.cw_min * 13.5, y: this.ch_min * 15.2 },
            //     { x: this.cw_min * 6, y: this.ch_min * 15.2 },
            //     { x: this.cw_min * 12.4, y: this.ch_min * 16.4 },
            //     { x: this.cw_min * 7.1, y: this.ch_min * 16.4 },
            //     { x: this.cw_min * 12.1, y: this.ch_min * 10.8 },
            //     { x: this.cw_min * 7.25, y: this.ch_min * 10.8 },
            //     { x: this.cw_min * 10, y: this.ch_min * 10 },
            // ],

            // seatLayout: (((fileName.name === "Leader_bet") && Screen.getDeviceType().name === "Mobile") ? Screen.getDeviceType().seatLayout_lb : ((fileName.name === "Riverpoker" && Screen.getDeviceType().name === "Mobile") ? Screen.getDeviceType().seatLayout_rv : Screen.getDeviceType().seatLayout)),
            // seatPotLayout: ((fileName.name === "Leader_bet" && Screen.getDeviceType().name === "Mobile") ? Screen.getDeviceType().seatPotLayout_lb : ((fileName.name === "Riverpoker" && Screen.getDeviceType().name === "Mobile") ? Screen.getDeviceType().seatPotLayout_rv : Screen.getDeviceType().seatPotLayout)),
            // tablePotLayout: ((fileName.name === "Leader_bet" && Screen.getDeviceType().name === "Mobile") ? Screen.getDeviceType().tablePotLayout_lb : ((fileName.name === "Riverpoker" && Screen.getDeviceType().name === "Mobile") ? Screen.getDeviceType().tablePotLayout_rv : Screen.getDeviceType().tablePotLayout)),
            // playerId: "",

        };
        this.config = new Config();
        // this.shadowRef = React.createRef();
        this.ImageRef = React.createRef();
        this.takeseatrearrange = true;
        this.player = undefined;
        this.ChangeSeatId = undefined;
        this.seatRefs = [React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef()];
        this.seatPotRefs = [React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef()];
        this.tablePotRefs = [React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef()];
        this.dealerRefs = React.createRef();
        this.CollusionRefs = [this.Collusion1 = React.createRef(), this.Collusion2 = React.createRef(), this.Collusion3 = React.createRef(), this.Collusion4 = React.createRef(), this.Collusion5 = React.createRef(), this.Collusion6 = React.createRef(), this.Collusion7 = React.createRef(), this.Collusion8 = React.createRef(), this.Collusion9 = React.createRef(), this.Collusion10 = React.createRef(),]
        this.dragRefs = [this.dargRef1 = React.createRef(), this.dargRef2 = React.createRef(), this.dargRef3 = React.createRef(), this.dargRef4 = React.createRef(), this.dargRef5 = React.createRef(), this.dargRef6 = React.createRef(), this.dargRef7 = React.createRef(), this.dargRef8 = React.createRef(), this.dargRef9 = React.createRef(), this.dargRef10 = React.createRef(),]

        this.key_seat = ["Seat1", "Seat2", "Seat3", "Seat4", "Seat5", "Seat6", "Seat7", "Seat8", "Seat9", "Seat10"];
        this.key_seatPot = ["SeatPot1", "SeatPot2", "SeatPot3", "SeatPot4", "SeatPot5", "SeatPot6", "SeatPot7", "SeatPot8", "SeatPot9", "SeatPot10"];
        this.key_tablePot = ["TablePot1", "TablePot2", "TablePot3", "TablePot4", "TablePot5", "TablePot6", "TablePot7", "TablePot8", "TablePot9", "TablePot10"];
        this.key_seat = ["Seat1", "Seat2", "Seat3", "Seat4", "Seat5", "Seat6", "Seat7", "Seat8", "Seat9", "Seat10"]
        this.key_image = ["Image0", "Image2", "Image3", "Image4", "Image5"]

        this.key_drag = ["key_drag1", "key_drag2", "key_drag3", "key_drag4", "key_drag5", "key_drag6", "key_drag7", "key_drag8", "key_drag9", "key_drag10",]
        this.chipSounds = new Audio(chipSounds);
        this.foldSound = new Audio(foldSound);
        this.checkSound = new Audio(checkSound);
        this.betRaiseSound = new Audio(betRaiseSound);
        this.callSound = new Audio(callSound);
        this.handleResize = this.handleResize.bind(this);
        this.textRef = React.createRef();
    }

    componentDidMount() {
        this.loadImage();
        this.updateTextHeight();
        // this.setState({seatLayout:Screen.getDeviceType().seatLayout,seatPotLayout:Screen.getDeviceType().seatPotLayout,tablePotLayout:Screen.getDeviceType().tablePotLayout})
        this.gameBox = document.getElementById(this.props.cid);
        // this.dvHt = this.gameBox.clientHeight;
        // this.dvWid = this.gameBox.clientWidth;
        // Attach the resize event listener after the component mounts
        window.addEventListener('resize', this.handleResize);
        // setTimeout(() => {
        //     console.log(this.props)
        //     console.log(this.props.network)
        //     if (this.props.network) {
        //         // this.props.network.send(`<onGetDealer/>`);
        //     }
        // }, 10000);
        // setTimeout(() => {
        //     console.log(this.props.stageProperties);
        //     console.log(this.props.stageProperties.deviceOrientation);
        // }, 15000);
        this.resize();
        // window.addEventListener('focusin', this.handleFocusIn);
        // window.addEventListener('focusout', this.handleFocusOut);
    };
    componentDidUpdate(prevProps) {
        this.resize();
        if (prevProps.text !== this.props.text) {
            this.updateTextHeight();
        }
    }
    updateTextHeight() {
        const textNode = this.textRef.current;
        if (textNode) {
            this.setState({ textHeight: textNode.getHeight() });
        }
    }
    // componentWillUnmount() {
    // Remove the resize event listener before the component unmounts
    // window.removeEventListener('resize', this.handleResize);
    // window.removeEventListener('focusin', this.handleFocusIn);
    // window.removeEventListener('focusout', this.handleFocusOut);

    // }
    // handleFocusIn = (event) => {
    //     if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
    //         this.gameBox = document.getElementById(this.props.cid);
    //         this.gameBox.style.paddingBottom = "120px"

    //     }
    // };

    // handleFocusOut = (event) => {
    //     if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
    //         this.gameBox = document.getElementById(this.props.cid);
    //         this.gameBox.style.paddingBottom = "0px"
    //     }
    // };
    handleResize() {
        this.resize();
        this.updateTableAllProperties();
    };

    updateTableAllProperties() {
        const seatLayout = this.props.tableOriantationLandscape ? Landscape.seatLayout : Portrait.seatLayout;
        const seatPotLayout = this.props.tableOriantationLandscape ? Landscape.seatPotLayout : Portrait.seatPotLayout;
        const tablePotLayout = this.props.tableOriantationLandscape ? Landscape.tablePotLayout : Portrait.tablePotLayout;
        const DealerLayout = this.props.tableOriantationLandscape ? Landscape.DealerLayout : Portrait.DealerLayout;

        this.setState({ seatLayout, seatPotLayout, tablePotLayout, DealerLayout });

        const seatCount = this.props.seatCount;
        const dealer = this.props.dealer;

        if (seatLayout &&
            seatLayout[seatCount] &&
            seatLayout[seatCount][dealer] !== undefined &&
            this.dealerRefs.current
        ) {
            this.dealerRefs.current.updateDealerPosition(this.state.DealerLayout[seatCount][dealer], dealer);
        } else {
            console.error('Invalid seat count or dealer position:', seatCount, dealer);
        }
    }

    UpadateSeatProperties(num) {
        //     const randomNumber = Math.floor(Math.random() * 100) + 1;
        //    this.cleartimee= setTimeout(()=>{

        //         this.resize();
        //     },randomNumber)
        // this.resize(num);
        // console.log("UpadateSeatProperties")
    }
    // this.props.tableOriantationLandscape

    // resize = () => {
    //     let windHt = window.innerHeight;
    //     let windWd = window.innerWidth;

    //     this.gbw = this.props.stageWidth;
    //     this.gbh = this.props.stageHeight;

    //     this.gameBox = document.getElementById(this.props.cid);

    //     let scaleWidth = windWd / this.gbw;
    //     let scaleHeight = windHt / this.gbh;
    //     let scale = Math.min(scaleWidth, scaleHeight);

    //     let scaledWidth = this.gbw * scale;
    //     let scaledHeight = this.gbh * scale;

    //     let calculatedMarginLeft = (windWd - scaledWidth) / 2;
    //     let calculatedMarginTop = (windHt - scaledHeight) / 2;

    //     this.gameBox.style.transform = `scale(${scale})`;
    //     this.gameBox.style.marginLeft = `${calculatedMarginLeft}px`;
    //     this.gameBox.style.marginTop = `${calculatedMarginTop}px`;
    //     this.gameBox.style.position = "absolute";
    //     this.gameBox.style.left = "0";
    //     this.gameBox.style.top = "0";
    // }

    resize = () => {
        let windHt = window.innerHeight;
        let windWd = window.innerWidth;
        let calculatedMarginLeft = 0;
        let calculatedMarginTop = 0;

        this.gbw = this.props.stageProperties.width;
        this.gbh = this.props.stageProperties.height;

        this.gameBox = document.getElementById(this.props.cid);

        let scale;
        let scaledWidth;
        let scaledHeight;

        if (!this.props.tableOriantationLandscape) {
            let scaleWidth = windWd / this.gbw;
            let availableHeight = windHt - 100;
            let scaleHeight = availableHeight / this.gbh;
            scale = Math.min(scaleWidth, scaleHeight);

            scaledWidth = this.gbw * scale;
            scaledHeight = this.gbh * scale;

            calculatedMarginLeft = (windWd - scaledWidth) / 2;
            calculatedMarginTop = (availableHeight - scaledHeight) / 2 + 50;

            if (calculatedMarginLeft < 0) calculatedMarginLeft = 0;
            if (calculatedMarginTop < 50) calculatedMarginTop = 70;
        } else {
            let scaleWidth = windWd / this.gbw;
            let scaleHeight = windHt / this.gbh;
            scale = Math.min(scaleWidth, scaleHeight);

            scaledWidth = this.gbw * scale;
            scaledHeight = this.gbh * scale;

            calculatedMarginLeft = (windWd - scaledWidth) / 2;
            calculatedMarginTop = (windHt - scaledHeight) / 2;
        }
        if (this.gameBox) {
            this.gameBox.style.transform = `scale(${scale})`;
            this.gameBox.style.marginLeft = `${calculatedMarginLeft}px`;
            this.gameBox.style.marginTop = `${calculatedMarginTop}px`;
            this.gameBox.style.position = "absolute";
            this.gameBox.style.left = "0";
            this.gameBox.style.top = "0";
        }
    }




    componentWillUnmount() {
        this.chipstack.removeEventListener('load', this.handleLoad);
        this.image.removeEventListener('load', this.handleLoad);
        this.image1.removeEventListener('load', this.handleLoad);
        this.image1.removeEventListener('load', this.handleLoad);
        this.image1.removeEventListener('load', this.handleLoad);
        this.image1.removeEventListener('load', this.handleLoad);
    }
    loadImage() {
        this.chipstack = new window.Image();
        this.image = new window.Image();
        this.image1 = new window.Image();
        this.image2 = new window.Image();
        this.image3 = new window.Image();
        this.image4 = new window.Image();
        this.image.src = axe;
        this.image1.src = sssss;
        this.image2.src = fish;
        this.image3.src = tissues;
        this.image4.src = money;
        this.chipstack.src = tablepot
        // this.image.src = this.state.imagearray[1];
        this.chipstack.addEventListener('load', this.handleLoad);
        this.image.addEventListener('load', this.handleLoad);
        this.image1.addEventListener('load', this.handleLoad);
        this.image2.addEventListener('load', this.handleLoad);
        this.image3.addEventListener('load', this.handleLoad);
        this.image4.addEventListener('load', this.handleLoad);
    }
    handleLoad = () => {
        this.setState({
            chipstack: this.chipstack,
            image: this.image,
            image1: this.image1,
            image2: this.image2,
            image3: this.image3,
            image4: this.image4,
        })
    }

    onNewPlayer(data, thisPlayer) {
        if (thisPlayer) {
            this.player = thisPlayer;
        }
        this.seatRefs[data.seat].current.onNewPlayer(data);
        // if (this.props.originSeat !== 2 && data.seat === this.props.originSeat) {
        //     if (this.originSeat == null) {
        //         console.log("=====================================NewPlayerOne=========================================");
        //     } else {
        //         console.log("=====================================NewPlayerTwo=========================================");
        //     }
        // }
    }
    updateGameState(data) {
        // setTimeout(() => {
        //     this.seatRefs[data.seat].current.onNewPlayer(data, this.props.knock_Table);
        // }, 500);
        if (data.hasOwnProperty("avatar")) {
            this.setState({ setAvatars: data.avatar });
        };
        this.seatRefs[data.seat].current.onNewPlayer(data, this.props.knock_Table);
    }
    RearrangeTakeSeat(fixedPosition) {
        if (this.player !== undefined) {
            this.takeseatrearrange = false;
            let seatLayout = this.state.seatLayout;
            let seatPotLayout = this.state.seatPotLayout;
            this.presentPosition_seat = this.state.seatLayout[this.props.seatCount];
            this.changeToPosition_seat = [];
            this.presentPosition_pot = this.state.seatPotLayout[this.props.seatCount];
            this.changeToPosition_pot = [];

            let i = 0,
                cnt = this.presentPosition_seat.length;
            let indexShift = 0;
            if (fixedPosition > this.player.id) {
                indexShift = Math.abs(fixedPosition - this.player.id);
            }
            if (fixedPosition < this.player.id) {
                indexShift = Math.abs(this.player.id - fixedPosition);
                indexShift = this.props.seatCount - indexShift;
            }
            let array_index = [];
            for (let i = 0; i < cnt; i++) {
                let x = i + indexShift;
                if (x < cnt) {
                    array_index.push(x);
                } else {
                    array_index.push(x - cnt);
                }
            }
            // console.log(array_index)
            for (i; i < cnt; i++) {
                this.changeToPosition_seat.push(this.presentPosition_seat[array_index[i]]);
                this.changeToPosition_pot.push(this.presentPosition_pot[array_index[i]]);
            }

            seatLayout[this.props.seatCount] = this.changeToPosition_seat;
            seatPotLayout[this.props.seatCount] = this.changeToPosition_pot;

            this.setState({ seatLayout: seatLayout, seatPotLayout: seatPotLayout });
        }
    }
    updateGameState_seatCards(data, seat) {
        this.seatRefs[seat].current.onDealingCards(data);
    }
    RearrageSeat(data) {
        // console.log(this.props.originSeat, "this.props.originSeat", data.seat, "data.seat")
        if (data.seat != this.props.originSeat && this.props.originSeat != 2 && this.takeseatrearrange) {
            let fixedPosition = 2;
            let seatLayout = this.state.seatLayout;
            let seatPotLayout = this.state.seatPotLayout;
            this.presentPosition_seat = this.state.seatLayout[this.props.seatCount];
            this.changeToPosition_seat = [];
            this.presentPosition_pot = this.state.seatPotLayout[this.props.seatCount];
            this.changeToPosition_pot = [];

            let i = 0,
                cnt = this.presentPosition_seat.length;
            let indexShift = 0;
            if (fixedPosition > this.props.originSeat) {
                indexShift = Math.abs(fixedPosition - this.props.originSeat);
            }
            if (fixedPosition < this.props.originSeat) {
                indexShift = Math.abs(this.props.originSeat - fixedPosition);
                indexShift = this.props.seatCount - indexShift;
            }
            let array_index = [];
            for (let i = 0; i < cnt; i++) {
                let x = i + indexShift;
                if (x < cnt) {
                    array_index.push(x);
                } else {
                    array_index.push(x - cnt);
                }
            }
            // console.log(array_index)
            for (i; i < cnt; i++) {
                this.changeToPosition_seat.push(this.presentPosition_seat[array_index[i]]);
                this.changeToPosition_pot.push(this.presentPosition_pot[array_index[i]]);
            }

            seatLayout[this.props.seatCount] = this.changeToPosition_seat;
            seatPotLayout[this.props.seatCount] = this.changeToPosition_pot;

            this.setState({ seatLayout: seatLayout, seatPotLayout: seatPotLayout });
            this.dealerRefs.current.updateDealerPosition(this.state.seatLayout[this.props.seatCount][this.props.dealer], this.props.dealer);
        }

    }

    onAciveSeats(data) {
        if (data.ActiveSeats.hasOwnProperty("Seat")) {
            let i = 0,
                cnt = data.ActiveSeats.Seat.length;
            for (i; i < cnt; i++) {
                this.seatRefs[data.ActiveSeats.Seat[i].attr.id].current.onActiveSeats(data.ActiveSeats.Seat[i].attr.id);
            }
        }
    }
    onChipsRebuy(data) {
        this.seatRefs[Number(data.seat)].current.onChipsRebuy(data);

        if (Number(this.props.originSeat) === Number(data.seat)) {
            this.props.network.send(`<SitIn/>`);
        }

    }
    enableTwoX(data) {
        if (this.props.originSeat !== "") {

            this.seatRefs[this.props.originSeat].current.enableTwoX(data);
        }
    }
    onDealer(cnt, id) {
        if (id !== undefined) {
            try {
                this.dealerRefs.current.updateDealerPosition(this.state.DealerLayout[cnt][id], id);
            } catch (e) {
                console.log(id);
            }
        } else {
            this.dealerRefs.current.updateDealerPosition("", undefined);
        }
    }
    onDealerReplay(cnt, id) {
        if (id !== false) {
            try {
                this.dealerRefs.current.updateDealerPosition(this.state.DealerLayout[cnt][id], id);
            } catch (e) {
                console.log(id);
            }
        }
    }
    AlreadySeated(seat) {
        if (seat !== this.ChangeSeatId) {
            try {
                this.seatRefs[this.ChangeSeatId].current.ShowMenu();
            } catch (e) {
                console.log(e);
            }
        }
    }
    onPotsChange(data) {
        // console.log(data)
        // let seatPot = {...this.state.seatPots};
        let tablePot = { ...this.state.tablePots };
        if (data.PotsChange.hasOwnProperty("Pot")) {
            let pot = data.PotsChange.Pot;
            if (Array.isArray(pot)) {
                for (let i = 0; i < pot.length; i++) {
                    let index = pot[i].attr.seat;
                    let potIndex = pot[i].attr.pot;
                    // seatPot[index].amount = 0;
                    // seatPot[index].show = false;
                    let amount = UM.roundToTwo(Number(pot[i].attr.change));
                    // tablePot[potIndex].amount = UM.roundToTwo(Number(tablePot[potIndex].amount) + Number(pot[i].attr.change));
                    // tablePot[potIndex].show = true;
                    // this.props.parentCallback(tablePot[potIndex].amount);

                    getChipAnimation() && this.seatPotRefs[index]?.current?.animateThePot(this.state.tablePotLayout[potIndex].x, this.state.tablePotLayout[potIndex].y, index, potIndex, amount);
                    !getChipAnimation() && this.onPotAnimationCallBack(index, potIndex, amount)
                }
            } else {
                let deadPot = pot.attr.pot;
                tablePot[deadPot].amount = UM.roundToTwo(Number(tablePot[deadPot].amount) + Number(pot.attr.change));
                tablePot[deadPot].show = true;
                this.setState({ tablePots: tablePot });
            }
            this.chipSounds.play();
            this.chipSounds.muted = getMuteValue();
            // this.setState({ seatPots: seatPot, tablePots: tablePot });
        }
    }

    onPotAnimationCallBack(seat, potIndex, amount) {
        console.log("pot anim callback triggered=================");
        let seatPot = { ...this.state.seatPots };
        let tablePot = { ...this.state.tablePots };
        seatPot[seat].amount = 0;
        seatPot[seat].show = false;
        // console.log(Number(tablePot[potIndex].amount) + "amoun" + "               " + Number(amount) + "call back from child")
        tablePot[potIndex].amount = UM.roundToTwo(Number(tablePot[potIndex].amount) + Number(amount));
        tablePot[potIndex].show = true;
        this.props.parentCallback(tablePot[potIndex].amount);
        this.setState({ seatPots: seatPot, tablePots: tablePot });
    }
    thisPlayerid(data) {
        try {
            this.setState({ playerId: data });
        } catch (e) {
            console.log(e);
        }
    }
    onCombinationChange(data) {
        console.log("onCombinationChange", data)
        if (data.CombinationChange.hasOwnProperty("attr")) {
            if (data.CombinationChange.attr.hasOwnProperty("seat")) {
                if (this.state.playerId === data.CombinationChange.attr.seat) {
                    return;
                } else {
                    this.seatRefs[data.CombinationChange.attr.seat].current.handStrengthCombination(data.CombinationChange.attr.strength, data.CombinationChange.attr.winProbability);
                }
            }
            // <-----------------------------------------my strength start--------------------------------------------->
            try {
                // this.seatRefs[this.props.originSeat]?.current?.handStrengthCombination(this.props.text, this.props.textTwo);
            } catch (e) { console.error(e.message) }
            // <-----------------------------------------my strength end--------------------------------------------->
        }
    }
    onCombinationChangeALL(data) {
        if (data.CombinationChange.hasOwnProperty("attr")) {

            this.seatRefs[data.CombinationChange.attr.seat].current.handStrengthCombination(data.CombinationChange.attr.strength, data.CombinationChange.attr.winProbability);

            // <-----------------------------------------my strength start--------------------------------------------->
            try {
                // this.seatRefs[this.props.originSeat]?.current?.handStrengthCombination(this.props.text, this.props.textTwo);
            } catch (e) { console.error(e.message) }
            // <-----------------------------------------my strength end--------------------------------------------->
        }
    }
    MyCombination(data) {
        if (data.hasOwnProperty("Show")) {
            if (data.Show.hasOwnProperty("attr")) {
                this.seatRefs[data?.attr?.seat]?.current?.handStrengthCombination(data.Show.attr.combination, undefined);
            }

        }
    }
    RitCombinationChange(data) {
        let cnt = data.RitCombinationChange.length;
        for (var i = 0; i < cnt; i++) {
            // console.log(data.RitCombinationChange[i]);
            if (data.RitCombinationChange[i].hasOwnProperty("attr")) {
                if (data.RitCombinationChange[i].attr.hasOwnProperty("seat")) {
                    this.seatRefs[data.RitCombinationChange[i].attr.seat].current.handStrength(data.RitCombinationChange[i].attr.strength, data.RitCombinationChange[i].attr.winProbability);
                }
            }
        }
    }
    updateGameState_onSeatPots(seat, amount) {
        let seatPot = this.state.seatPots;
        seatPot[seat].amount = Number(amount);
        seatPot[seat].show = true;
        this.setState({ seatPots: seatPot });
    }

    updateGameState_onTablePotsChange(data, rake) {
        // console.log(data)
        let tablePot = this.state.tablePots;
        try {
            tablePot[data.attr.id].amount = Number(data.attr.amount);
            tablePot[data.attr.id].show = true;
            this.setState({ tablePots: tablePot, RakeAmount: Number(rake) });
            this.props.parentCallback(tablePot[data.attr.id].amount);
        } catch (e) {
            for (var i = 0; i < data.length; i++) {
                tablePot[data[i].attr.id].amount = Number(data[i].attr.amount);
                tablePot[data[i].attr.id].show = true;
                this.setState({ tablePots: tablePot, RakeAmount: Number(rake) });
                this.props.parentCallback(tablePot[data[i].attr.id].amount);
            }
        }
    }

    noTablePot() {
        let tablepot = [
            { amount: 0, show: false, rakeShow: false, rakeCut: 0 },
            { amount: 0, show: false, rakeShow: false, rakeCut: 0 },
            { amount: 0, show: false, rakeShow: false, rakeCut: 0 },
            { amount: 0, show: false, rakeShow: false, rakeCut: 0 },
            { amount: 0, show: false, rakeShow: false, rakeCut: 0 },
            { amount: 0, show: false, rakeShow: false, rakeCut: 0 },
            { amount: 0, show: false, rakeShow: false, rakeCut: 0 },
            { amount: 0, show: false, rakeShow: false, rakeCut: 0 },
            { amount: 0, show: false, rakeShow: false, rakeCut: 0 },
            { amount: 0, show: false, rakeShow: false, rakeCut: 0 },
        ];
        // let seatPots = [
        //     { amount: 0, show: false },
        //     { amount: 0, show: false },
        //     { amount: 0, show: false },
        //     { amount: 0, show: false },
        //     { amount: 0, show: false },
        //     { amount: 0, show: false },
        //     { amount: 0, show: false },
        //     { amount: 0, show: false },
        //     { amount: 0, show: false },
        //     { amount: 0, show: false },
        // ];
        // this.setState({ tablePots: tablepot, seatPots: seatPots });
        this.setState({ tablePots: tablepot });
    }

    onRakeCut(data) {
        let tablePot = this.state.tablePots;
        if (data.RakeChange.hasOwnProperty("Rake")) {
            let rake = data.RakeChange.Rake;
            if (!Array.isArray(rake)) {
                rake = [rake];
            }
            let i = 0,
                cnt = rake.length;
            for (i; i < cnt; i++) {
                if (rake[i].hasOwnProperty("attr")) {
                    let potIndex = rake[i].attr.pot;

                    tablePot[potIndex].amount = UM.roundToTwo(Number(tablePot[potIndex].amount) - Number(rake[i].attr.change));
                    // console.log("tablepot value ", UM.roundToTwo(Number(tablePot[potIndex].amount)))

                    this.props.parentCallback(tablePot[potIndex].amount);
                    tablePot[potIndex].rakeCut = Number(rake[i].attr.change);
                    this.setState({ RakeAmount: this.state.RakeAmount + Number(rake[i].attr.change) })
                    tablePot[potIndex].rakeShow = true;
                }
                this.chipSounds.play();
                this.chipSounds.muted = getMuteValue();
            }

            this.setState({ tablePots: tablePot });
        }
    }

    findNoteAndCoins(salary) {
        const notes = [2000000, 1000000, 500000, 100000, 50000, 10000, 5000, 1000, 500, 100, 50, 10, 5, 1];
        // const index =[  0,    1   ,   2   ,   3  ,   4  ,    5,    6 ,   7 ,  8,    9, 10, 11, 12, 13]                                           
        const notesCount = [];

        let remaining = salary;
        for (const note of notes) {
            if (salary >= note) {
                notesCount.push(Math.trunc(remaining / note));
                remaining = remaining % note;
            } else {
                notesCount.push(0);
            }
        }

        return notesCount;
    }
    onWinner(thisPlayer, data) {
        // console.log("OnWinner", thisPlayer, data);
        let combination, amt, id, potIndex;
        let tablePot = this.state.tablePots;
        let seatPots = this.state.seatPots;

        if (data.Winner.hasOwnProperty("attr")) {
            if (data.Winner.attr.hasOwnProperty("combination")) {
                combination = data.Winner.attr.combination;
            }
            if (data.Winner.attr.hasOwnProperty("amount")) {
                amt = data.Winner.attr.amount;
            }
            if (data.Winner.attr.hasOwnProperty("seat")) {
                id = data.Winner.attr.seat;
            }
            if (data.Winner.attr.hasOwnProperty("pot")) {
                potIndex = data.Winner.attr.pot;
            }
            if (data.Winner.hasOwnProperty("Cards")) {
                this.seatRefs[id].current.onWinnerHighlightCards(data.Winner.Cards.Card);
            }
            if (data.Winner.hasOwnProperty("Board")) {
                // <-----------------------------------------my strength start--------------------------------------------->
                try {
                    // this.seatRefs[this.props.originSeat]?.current?.handStrengthCombination(this.props.text, this.props.textTwo);
                } catch (e) { console.error(e.message) }
                // <-----------------------------------------my strength end--------------------------------------------->
            }
            // this.tablePotRefs[potIndex].current.rakePotAnimate();
            seatPots[id].show = true
            seatPots[id].amount = Number(amt)
            tablePot[potIndex].amount = UM.roundToTwo(Number(tablePot[potIndex].amount) - Number(data.Winner.attr.amount));
            if (Number(tablePot[potIndex].amount) < 0) {
                tablePot[potIndex].amount = 0;
            }
            tablePot[potIndex].show = false;
            this.setState({ seatPots: seatPots, tablePot: tablePot })
            this.seatRefs[id].current.onWinner(data.Winner.attr.amount, thisPlayer, id);
            this.seatPotRefs[id].current.onWinAnimation(this.state.tablePotLayout[potIndex].x, this.state.tablePotLayout[potIndex].y, this.state.seatPotLayout[this.props.seatCount][id].x, this.state.seatPotLayout[this.props.seatCount][id].y, id, potIndex, amt);

        }
    }
    startTimer(thisPlayer, id, min, max, duration, timeBank) {
        try {
            this.seatRefs[id].current.startTimer(thisPlayer, id, min, max, duration, timeBank);
        } catch (e) { console.log(e) }
    }
    iniTimerSound(seat) {
        try {
            this.seatRefs[seat].current.initTimerSounds(seat);
        } catch (error) {
            console.log(error);
        }
    }
    stopTimer(id) {
        try {
            this.seatRefs[id].current.stopTimer(id);
        } catch (e) { console.log(e) }
    }
    onDetermineDealer(data) {
        if (data.DetermineDealer.hasOwnProperty("Card")) {
            let card = data.DetermineDealer.Card;
            for (let i = 0; i < card.length; i++) {
                try {
                    this.seatRefs[card[i].attr.seat].current.onDetermineDealer(card[i], card.length);
                } catch (e) {
                    console.log("determine dealer error", e);
                }
            }
        }
    }
    onDealingCards(data) {
        if (data.DealingCards.hasOwnProperty("Seat")) {
            let seat = data.DealingCards.Seat;
            let cardlent
            for (let i = 0; i < seat.length; i++) {
                cardlent = seat[i].Cards.Card.length
            }
            // for (let i = 0; i < seat.length; i++) {
            //     setTimeout(() => {
            //         try {
            //             this.seatRefs[seat[i].attr.id].current.onDealingCards(seat[i]);
            //             console.log(seat[i].Cards.Card.length)
            //         } catch (e) {
            //             console.log("dealingCardsError- Seatss", e);
            //         }
            //     }, i * 125);

            // }
            for (let i = 0; i < cardlent; i++) {
                setTimeout(() => {
                    for (let j = 0; j < seat.length; j++) {
                        setTimeout(() => {
                            try {
                                this.seatRefs[seat[j].attr.id].current.onDealingCardsType(i, seat[j], cardlent);
                                // console.log(seat[i].Cards.Card.length)
                            } catch (e) {
                                console.log("dealingCardsError- Seatss", e);
                            }
                        }, j * 125);

                    }
                }, i * 125);
            }
        }
    }
    onDealingCardsReplay(data, cnt) {
        for (let a = 0; a < cnt; a++) {
            setTimeout(() => {
                try {
                    this.seatRefs[data[a].seatId].current.onDealingCardReplay(cnt, data[a]);
                } catch (e) {
                    console.log("dealingCardsError- Seatss", e);
                }
            }, cnt * 125);
        }
    }
    showCards(id, cards) {
        this.seatRefs[id].current.onDealingCards_show(cards);
    }
    CallTimeTableDetails(data, from) {
        // console.log(from, data)
        if (data.hasOwnProperty("Seat")) {
            // console.log(data.Seat.length)
            let cnt = data.Seat.length
            let i = 0
            for (i = 0; i < cnt; i++) {
                // console.log(data.Seat[i])
                if (data.Seat[i].hasOwnProperty("PlayerInfo")) {
                    let duration = data.Seat[i].PlayerInfo.attr.duration;
                    let isTimeForcedPaused = data.Seat[i].attr.isTimeForcedPaused;
                    let timeLeft = data.Seat[i].attr.timeLeft;
                    let timedOut = data.Seat[i].attr.timedOut;
                    this.seatRefs[i].current.CallTimeSeat(duration, isTimeForcedPaused, timeLeft, timedOut)
                }
            }
        }
    }
    onPlayerAction(data) {
        // console.log(data)
        this.seatRefs[data.seat].current.onPlayerAction(data);
        let seatPot = this.state.seatPots;
        if (Number(seatPot[data.seat].amount) < 0) {
            seatPot[data.seat].amount = 0;
        }
        // console.log(data.action)
        switch (data.action) {
            case "SitIn":
                break;
            case "SitOut":
                seatPot[data.seat].show = false;
                this.setState({ seatPots: seatPot });
                break;
            case "PostSmallBlind":
                seatPot[data.seat].show = true;
                seatPot[data.seat].amount = UM.roundToTwo(Number(data.amount));
                // seatPot[data.seat].amount = UM.roundToTwo(Number(this.state.seatPots[data.seat].amount) + Number(data.amount));
                this.setState({ seatPots: seatPot });
                break;
            case "PostBigBlind":
                seatPot[data.seat].show = true;
                seatPot[data.seat].amount = UM.roundToTwo(Number(this.state.seatPots[data.seat].amount) + Number(data.amount));
                this.setState({ seatPots: seatPot });
                break;
            case "PostThirdBlind":
                seatPot[data.seat].show = true;
                seatPot[data.seat].amount = UM.roundToTwo(Number(this.state.seatPots[data.seat].amount) + Number(data.amount));
                this.setState({ seatPots: seatPot });
                break;
            case "Fold":
                this.foldSound.play();
                this.foldSound.muted = getMuteValue();
                break;
            case "Check":
                this.checkSound.play();
                this.checkSound.muted = getMuteValue();
                break;
            case "Raise":
                seatPot[data.seat].show = true;
                seatPot[data.seat].amount = UM.roundToTwo(Number(this.state.seatPots[data.seat].amount) + Number(data.amount));
                this.setState({ seatPots: seatPot });
                this.betRaiseSound.play();
                this.betRaiseSound.muted = getMuteValue();
                break;
            case "Call":
                seatPot[data.seat].show = true;
                seatPot[data.seat].amount = UM.roundToTwo(Number(this.state.seatPots[data.seat].amount) + Number(data.amount));
                this.setState({ seatPots: seatPot });
                this.callSound.play();
                this.callSound.muted = getMuteValue();
                break;
            case "Bet":
                seatPot[data.seat].show = true;
                seatPot[data.seat].amount = UM.roundToTwo(Number(this.state.seatPots[data.seat].amount) + Number(data.amount));
                this.setState({ seatPots: seatPot });
                this.betRaiseSound.play();
                this.betRaiseSound.muted = getMuteValue();
                break;
            case "UncalledBet":
                seatPot[data.seat].show = true;
                seatPot[data.seat].amount = UM.roundToTwo(Number(this.state.seatPots[data.seat].amount) - Number(data.amount));
                this.setState({ seatPots: seatPot });
                break;
            case "":
                break;
            default:
                seatPot[data.seat].show = false;
                this.setState({ seatPots: seatPot });
                break;
        }
    }
    removeCardsSelf(seat) {
        this.seatRefs[seat].current.onEndHand();
    }
    onEndHand() {
        let seatpot = this.state.seatPots;
        let tablepot = this.state.tablePots;
        for (let i = 0; i < this.props.seatCount; i++) {
            this.seatRefs[i].current.onEndHand();
            seatpot[i].amount = 0;
            tablepot[i].amount = 0;
            tablepot[i].show = false;
            seatpot[i].show = false
        }
        this.setState({ seatPots: seatpot });
        this.setState({ tablePots: tablepot });
        this.setState({ RakeAmount: 0 })
    }
    clearSeatPotsAndTablePots() {
        let seatpot = this.state.seatPots;
        let tablepot = this.state.tablePots;
        for (let i = 0; i < this.props.seatCount; i++) {
            seatpot[i].amount = 0;
            seatpot[i].show = false;
            tablepot[i].amount = 0;
            tablepot[i].show = false;
        }
        this.setState({ seatPots: seatpot, tablePots: tablepot });
    }
    clearTheTableSeats(data) {
        console.log("++++++++++++++++++++++++++++++ clearTheTableSeats ++++++++++++++++++++++++++++++")
        this.takeseatrearrange = true;
        let seatpot = this.state.seatPots;
        let tablepot = this.state.tablePots;
        for (let i = 0; i < this.props.seatCount; i++) {
            this.seatRefs[i].current.onEndHand();
            this.seatRefs[i].current.clearTheTableSeats();
            seatpot[i].amount = 0;
            tablepot[i].amount = 0;
            tablepot[i].show = false;
        }
        this.setState({ seatPots: seatpot });
        this.setState({ tablePots: tablepot });
        this.setState({ RakeAmount: data })

    }
    setCardStyle(style) {
        for (let i = 0; i < this.props.seatCount; i++) {
            this.seatRefs[i].current.setCardStyle(style);
        }
        // this.props.network.send("<GameState/>");
    }

    onChatMessage(text, seat) {
        // console.log("chat from seat: ", seat);
        this.seatRefs[seat]?.current?.onChatMessage(text);
    }



    initSounds() {
        this.chipSounds = new Audio(chipSounds);
        this.foldSound = new Audio(foldSound);
        this.checkSound = new Audio(checkSound);
        this.betRaiseSound = new Audio(betRaiseSound);
        this.callSound = new Audio(callSound);
    }
    sendSeat(seatId) {
        this.ChangeSeatId = seatId;
        if (this.props.changeOptionTournment) {
            // this.changeSeatHandler(seatId)
        }
    };

    changeSeatHandler(toSeat) {
        if (this.player) {
            let seatLayout = this.state.seatLayout;
            let seatPotLayout = this.state.seatPotLayout;
            let DealerLayout = this.state.DealerLayout;
            this.presentPosition_seat = this.state.seatLayout[this.props.seatCount];
            this.changeToPosition_seat = [];
            this.presentPosition_pot = this.state.seatPotLayout[this.props.seatCount];
            this.presentPosition_DealerLayout = this.state.DealerLayout[this.props.seatCount];
            this.changePosition_DealerLayout = [];
            this.changeToPosition_pot = [];

            let i = 0,
                cnt = this.presentPosition_seat.length;
            let indexShift = 0;
            if (toSeat > this.player.id) {
                indexShift = Math.abs(toSeat - this.player.id);
            }
            if (toSeat < this.player.id) {
                indexShift = Math.abs(this.player.id - toSeat);
                indexShift = this.props.seatCount - indexShift;
            }
            let array_index = [];
            for (let i = 0; i < cnt; i++) {
                let x = i + indexShift;
                if (x < cnt) {
                    array_index.push(x);
                } else {
                    array_index.push(x - cnt);
                }
            }

            this.originSeat = array_index[2];
            for (i; i < cnt; i++) {
                this.changeToPosition_seat.push(this.presentPosition_seat[array_index[i]]);
                this.changeToPosition_pot.push(this.presentPosition_pot[array_index[i]]);
                this.changePosition_DealerLayout.push(this.presentPosition_DealerLayout[array_index[i]]);
            }

            seatLayout[this.props.seatCount] = this.changeToPosition_seat;
            seatPotLayout[this.props.seatCount] = this.changeToPosition_pot;
            DealerLayout[this.props.seatCount] = this.changePosition_DealerLayout;

            this.setState({ seatLayout: seatLayout, seatPotLayout: seatPotLayout, DealerLayout: DealerLayout });
        } else if (this.props.originSeat !== 2) {
            let seatLayout = this.state.seatLayout;
            let seatPotLayout = this.state.seatPotLayout;
            let DealerLayout = this.state.DealerLayout;
            this.presentPosition_seat = this.state.seatLayout[this.props.seatCount];
            this.changeToPosition_seat = [];
            this.presentPosition_pot = this.state.seatPotLayout[this.props.seatCount];
            this.presentPosition_DealerLayout = this.state.DealerLayout[this.props.seatCount];
            this.changeToPosition_pot = [];
            this.changeToPosition_DealerLayout = [];

            let i = 0,
                cnt = this.presentPosition_seat.length;
            let indexShift = 0;
            if (toSeat > this.props.originSeat) {
                indexShift = Math.abs(toSeat - this.props.originSeat);
            }
            if (toSeat < this.props.originSeat) {
                indexShift = Math.abs(this.props.originSeat - toSeat);
                indexShift = this.props.seatCount - indexShift;
            }
            let array_index = [];
            for (let i = 0; i < cnt; i++) {
                let x = i + indexShift;
                if (x < cnt) {
                    array_index.push(x);
                } else {
                    array_index.push(x - cnt);
                }
            }

            for (i; i < cnt; i++) {
                this.changeToPosition_seat.push(this.presentPosition_seat[array_index[i]]);
                this.changeToPosition_pot.push(this.presentPosition_pot[array_index[i]]);
                this.changeToPosition_DealerLayout.push(this.presentPosition_DealerLayout[array_index[i]]);
            }
            // this.onDealer(cnt, toSeat);
            seatLayout[this.props.seatCount] = this.changeToPosition_seat;
            seatPotLayout[this.props.seatCount] = this.changeToPosition_pot;
            DealerLayout[this.props.seatCount] = this.changeToPosition_DealerLayout;

            this.setState({ seatLayout: seatLayout, seatPotLayout: seatPotLayout, DealerLayout: DealerLayout });
        };
        setTimeout(() => {
            this.updateTableAllProperties();
            eventEmitter.emit("updatePlayerCards")
        }, 500);
        // this.dealerRefs.current.updateDealerPosition(this.state.seatLayout[this.props.seatCount][this.props.dealer], this.props.dealer);
        // this.dealerRefs.current.updateDealerPosition(this.state.DealerLayout[this.props.seatCount][this.props.dealer], this.props.dealer);

    }
    // =============================================================animation fuunctionality start ===========================================

    handleDrag = (e) => {

        this.setState({
            dragdetails: {
                index: e.target.attrs.index,
                name: e.target.attrs.id
            }
        })

        for (let i = 0; i < this.props.seatCount; i++) {
            this.CollusionRefs[i].current.handleDragSeat(e.target._lastPos)
        }
        this.props.hidaAni(false)
    }
    TargetpositionId(e) {
        // alert(e)
        if (Number(this.props.originSeat) !== Number(e)) {

            this.props.TargetpositionId(e, this.state.dragdetails)
            if (this.props.senderidboolean1) {

                this.setState({ animationid: this.props.originSeat })
                // this.dragRefs[0].current.TargetPositionId2(e, this.state.dragdetails)
            }

        }
    }
    // TargetPositionId1(e, dragdetails) {
    //     if (this.props.dragdetails.senderidboolean) {
    //         if (this.props.dragdetails.senderid !== null) {
    //             this.setState({ animationid: Number(this.props.senderid) })
    //             this.dragRefs[e].current.TargetPositionId2(e, dragdetails)
    //         } else {


    //         }

    //     }
    // }
    TargetPositionId1(data) {
        // console.log(data)
        // console.log(data.data)
        // console.log(Number(data.data.attr.senderSeatNo))
        // console.log(Number(data.data.attr.receiverSeatNo))
        if (data.data.hasOwnProperty("attr")) {
            // console.log(data.data.attr)
            this.setState({ animationid: Number(data.data.attr.senderSeatNo) })
            this.dragRefs[Number(data.data.attr.receiverSeatNo)].current.TargetPositionId2(data.data)
        }
    }
    // =============================================================animation fuunctionality end =============================================
    showSeatAlert(details) {
        // console.log("From seats.js   ", details)
        this.props.showSeatAlert(details)
    }



    render() {
        const { textHeight } = this.state;
        // const textConfig = {
        //     x: 325,
        //     y: 285,
        //     width: 150,
        //     align: "center",
        //     verticalAlign: "middle",
        //     text: UM.textFormat(this.props.text),
        //     fontSize: 14,
        //     fontFamily: "Arial",
        //     fill: "#fff",
        // };

        return (

            <Layer>

                <Group
                    // x={337} y={42}
                    x={this.props.stageProperties.deviceOrientation === "landscape" ? 680 : 337} y={this.props.stageProperties.deviceOrientation === "landscape" ? 65 : 42}
                    id="bbj"
                    visible={this.props.bbj !== 0 && this.props.tableOriantationLandscape}
                // visible={true}
                >
                    <Rect width={120} height={40} fill="white" cornerRadius={5} />
                    <Rect width={110} height={20} fill="black" cornerRadius={5} x={5} y={18} />
                    <Text text="BAD BEAT JACKPOT" fontSize={11} fill="red" x={10} y={5} align={"center"} verticalAlign={"middle"} fontFamily={"Roboto"} />
                    <Text width={100} height={20} text={UM.numberWithCommas(this.props.bbj)} fontSize={14} fill="white" x={10} y={20} align={"right"} verticalAlign={"middle"} fontFamily={"Roboto"} />
                </Group>


                <Group id="seat">
                    {(() => {
                        let i = 0;
                        this.seatsContainer = [];
                        for (i; i < this.props.seatCount; i++) {
                            this.seatsContainer.push(<Seat seatProperties={this.props.seatProperties} tableOriantationLandscape={this.props.tableOriantationLandscape} stageProperties={this.props.stageProperties} setAvatars={this.props.playerAvatarsList} originSeat={this.props.originSeat} key={this.key_seat[i]} ref={this.seatRefs[i]} x={this.state.seatLayout[this.props.seatCount][i].x} showSeatAlert={this.showSeatAlert.bind(this)} y={this.state.seatLayout[this.props.seatCount][i].y} id={i} network={this.props.network} changeSeatHandler={this.changeSeatHandler.bind(this)} initSounds={this.initSounds.bind(this)} sendSeat={this.sendSeat.bind(this)} bigshowhide={this.props.bigshowhide} changetourno_sitandgo={this.props.changetourno_sitandgo} RearrangeTakeSeat={this.RearrangeTakeSeat.bind(this)} BigBlindValue={this.props.BigBlindValue}></Seat>);
                            // this.seatsContainer.push(<Seat seatProperties={this.props.seatProperties} key={this.key_seat[i]} ref={this.seatRefs[i]} x={this.state.seatLayout[this.props.seatCount][i].x} y={this.state.seatLayout[this.props.seatCount][i].y} id={i} network={this.props.network} changeSeatHandler={this.changeSeatHandler.bind(this)} initSounds={this.initSounds.bind(this)} sendSeat={this.sendSeat.bind(this)} isRitTable={this.props.showRitBox} changetourno_sitandgo={this.props.changetourno_sitandgo} ></Seat>);
                        }
                        return this.seatsContainer;
                    })()}
                </Group>

                <Group id="seatPot">
                    {(() => {
                        let i = 0,
                            x;
                        this.seatPotContainer = [];
                        let show = false;

                        for (i; i < this.props.seatCount; i++) {
                            show = false;
                            if (i < this.props.seatCount * 0.5) {
                                x = -50;
                            } else {
                                x = 2;
                            }
                            if (Number(this.state.seatPots[i].amount) > 0) {
                                show = this.state.seatPots[i].show;
                                // show = true;
                            }
                            // this.seatPotContainer.push(<SeatPot key={this.key_seatPot[i]} ref={this.seatPotRefs[i]} x={this.state.seatPotLayout[this.props.seatCount][i].x} y={this.state.seatPotLayout[this.props.seatCount][i].y} show={show} amount={this.state.seatPots[i].amount} xPadding={x} id={i}
                            this.seatPotContainer.push(<SeatPot key={this.key_seatPot[i]} tableOriantationLandscape={this.props.tableOriantationLandscape}
                                ref={this.seatPotRefs[i]} x={this.state.seatPotLayout[this.props.seatCount][i].x} y={this.state.seatPotLayout[this.props.seatCount][i].y}
                                Tx={this.state.seatPotTextLayout[this.props.seatCount][i].x} Ty={this.state.seatPotTextLayout[this.props.seatCount][i].y}
                                align={this.state.seatPotTextLayout[this.props.seatCount][i].align}
                                show={show}
                                // show={true}
                                amount={this.state.seatPots[i].amount}
                                // amount={100012345}
                                xPadding={x} id={i}
                                //  countchips={this.findNoteAndCoins(100000)} 
                                countchips={this.findNoteAndCoins(this.state.seatPots[i].amount)}
                                callBack={this.onPotAnimationCallBack.bind(this)}></SeatPot>);
                        }
                        return this.seatPotContainer;
                    })()}
                </Group>
                <Group id="tablePot">
                    {(() => {
                        let i = 0;
                        this.tablePotContainer = [];
                        for (i; i < this.props.seatCount - 1; i++) {
                            // for (i; i <1; i++) {
                            this.seatPotContainer.push(<TablePot key={this.key_tablePot[i]} ref={this.tablePotRefs[i]} tableOriantationLandscape={this.props.tableOriantationLandscape} x={this.state.tablePotLayout[i].x} y={this.state.tablePotLayout[i].y}
                                show={this.state.tablePots[i].show}
                                // show={true}
                                amount={this.state.tablePots[i].amount}
                                // amount={12581234}
                                rakeCut={this.state.tablePots[i].rakeCut} id={i}
                                //  countchips={(this.findNoteAndCoins(49)).reverse()}
                                // const notes = [500000,100000,50000, 10000, 5000, 1000, 500, 100, 50, 10, 5, 1];
                                // countchips={this.findNoteAndCoins(1982)}
                                countchips={this.findNoteAndCoins(this.state.tablePots[i].amount)}
                            ></TablePot>);
                        }
                        return this.tablePotContainer;
                    })()}
                </Group>
                {/* <-----------------------------------------handstrength start-------------------------------------------------------------------> */}
                <Group  >

                    <Rect
                        // x={336}
                        x={this.props.tableOriantationLandscape ? 336 : 212}
                        y={this.props.tableOriantationLandscape ? 275 : 365}
                        width={120}
                        height={textHeight + 8}
                        fill="rgba(0, 0, 0, 0.8)"
                        cornerRadius={5}
                        visible={getHandStrength() && (this.props.text)}
                    // visible={true}
                    />
                    <Text
                        // x={336}
                        // y={275}
                        x={this.props.tableOriantationLandscape ? 336 : 212}
                        y={this.props.tableOriantationLandscape ? 279 : 370}
                        width={120}
                        align={"center"}
                        verticalAlign={"middle"}
                        // text={UM.textFormat("A straight, two to six")}
                        text={UM.textFormat(this.props.text)}
                        // text={("hfdskkkk, kdfhskkk, sdfsdfdsd").split(",").join("\n")}
                        // text={("A straight two to six").split(",").join("\n")}
                        fontSize={14}
                        fontFamily={"Arial"}
                        fill={"#fff"}
                        visible={getHandStrength() && (this.props.text)}
                        // visible={true}
                        ref={this.textRef} />


                    {this.props.winpercent &&
                        <Text
                            // x={this.state.tablePotLayout[0].x - 85}
                            // y={this.state.tablePotLayout[0].y + 128 + Screen.getDeviceType().handstrength.position.y}
                            x={this.state.tablePotLayout[0].x - (this.props.tableOriantationLandscape ? 85 : 90)}
                            y={this.state.tablePotLayout[0].y + (this.props.tableOriantationLandscape ? 128 : 175) + Screen.getDeviceType().handstrength.position.y}

                            width={200}
                            height={'fit-content'}
                            align={"center"}
                            verticalAlign={"middle"}
                            text={`${this.props.textTwo}%`}
                            // text={`25%`}
                            fontSize={20}
                            fontFamily={"bold"}
                            // fill={"#e7b500"}
                            fill={(fileName.name === "Riverpoker" ? "#e7b500" : "#e7b500")}
                        ></Text>
                    }

                </Group>
                {/* <-----------------------------------------handstrength end-------------------------------------------------------------------> */}

                <Group>
                    {/* ======================================== ADD ON SUCCESS MESSAGE - START ===================================== */}
                    <Rect
                        x={this.props.tableOriantationLandscape ? 175 : 160}
                        y={this.props.tableOriantationLandscape ? 275 : 365}
                        width={this.props.tableOriantationLandscape ? 450 : 220}
                        height={this.props.tableOriantationLandscape ? 45 : 55}
                        fill="rgba(0, 0, 0, 0.8)"
                        cornerRadius={5}
                        visible={this.props.addonData !== ""}>

                    </Rect>
                    <Text
                        x={this.props.tableOriantationLandscape ? 200 : 160}
                        y={this.props.tableOriantationLandscape ? 279 : 370}
                        width={this.props.tableOriantationLandscape ? 400 : 220}
                        height={this.props.tableOriantationLandscape ? 45 : 55}
                        align={"center"}
                        verticalAlign={"middle"}
                        text={this.props.addonData}
                        fontSize={14}
                        fontFamily={"Arial"}
                        fill={"#fff"}
                        visible={this.props.addonData !== ""}
                    />

                    {/* ======================================== ADD ON SUCCESS MESSAGE - END ===================================== */}
                </Group>





                {/* ********************************************************************after Collusion animation start******************************* */}
                <Group id="dragpos">
                    {(() => {
                        let i = 0;
                        this.dragContainer = [];
                        for (i; i < this.props.seatCount - 1; i++) {
                            this.dragContainer.push(<AnimationHere
                                key={this.key_drag[i]}
                                ref={this.dragRefs[i]}
                                // x={this.state.seatLayout[this.props.seatCount][0].x}
                                // y={this.state.seatLayout[this.props.seatCount][0].y}
                                x={this.state.seatLayout[this.props.seatCount][this.state.animationid].x}
                                y={this.state.seatLayout[this.props.seatCount][this.state.animationid].y}
                                x1={this.state.seatLayout[this.props.seatCount]}
                                y1={this.state.seatLayout[this.props.seatCount]}
                                myname={this.props.myname}

                                id={i}
                            ></AnimationHere>);
                        }
                        return this.dragContainer;
                    })()}
                </Group>
                {fileName.name === "Lapoker" &&
                    <Group
                        visible={this.state.RakeAmount > 0 ? true : false}
                    >
                        <Image
                            x={10}
                            y={72.5}
                            image={this.state.chipstack}
                            width={15}
                            height={15}
                        />

                        <Text
                            x={20}
                            y={70}
                            width={80}
                            height={20}
                            align={"center"}
                            verticalAlign={"middle"}
                            text={`${this.state.RakeAmount.toFixed(0)}`}
                            fontSize={16}
                            fontFamily={"Calibri"}
                            fill={"#FF0000"}

                        ></Text>
                    </Group>
                }
                {/* ********************************************************************after Collusion animation end******************************* */}
                <Group id="dealer">
                    <Dealer ref={this.dealerRefs} paddings={this.props.seatProperties.dealerAdjustment} size={this.props.seatProperties.delaerSize}></Dealer>
                </Group>


                {/* ********************************************Animation Images start********************************************************** */}

                {this.props.showAniStage && <Group
                    ref={node => {
                        this.seat = node;
                    }
                    }
                >


                    <Rect
                        // x={45}
                        // x={(450 * 0.5) - 100}

                        x={Screen.getDeviceType().name !== "Mobile" ? 0 : 145}
                        // y={716}
                        y={Screen.getDeviceType().name !== "Mobile" ? 10 : 620}
                        width={310}
                        height={60}
                        stroke={"#CC271D"}
                        fill="#161A1D"
                        cornerRadius={[10, 10, 10, 10]}
                    />



                    {/* ----------------------------------------------------------------------------animation shadow start----------------------------------- */}
                    {/* <Shape

                        width={0}
                        height={0}
                        ref={this.shadowRef}
                        sceneFunc={function (context, shape) {
                            const width = shape.width();
                            const height = shape.height();

                            const gradient = context.createLinearGradient(0, 0, width, 0);
                            gradient.addColorStop(0, '#fcb045');
                            gradient.addColorStop(0.3, '#fd1d1d');
                            gradient.addColorStop(0.5, 'rgba(252, 174, 69, 0)');
                            gradient.addColorStop(0.8, '#fd1d1d');
                            gradient.addColorStop(1, '#833ab4');

                            context.beginPath();
                            context.moveTo(150, 500);

                            context.lineTo(width - 40, height - 90);
                            context.quadraticCurveTo(width, height, width, height);
                            context.closePath();
                            shape.fill(gradient);

                            // (!) Konva specific method, it is very important
                            context.fillStrokeShape(shape);
                        }}

                        // fill="#00D2FF"
                        stroke="black"
                        strokeWidth={0}
                        rotation={0}
                    /> */}
                    {/* ----------------------------------------------------------------------------animation shadow end----------------------------------- */}
                    <Group id="target">
                        {(() => {

                            let i = 0;
                            this.seatsContainer1 = [];
                            for (i; i < this.props.seatCount; i++) {

                                this.seatsContainer1.push(<TargetPos
                                    key={this.key_seat[i]}
                                    ref={this.CollusionRefs[i]}
                                    seatProperties={this.props.seatProperties}
                                    x={this.state.seatLayout[this.props.seatCount][i].x}
                                    y={this.state.seatLayout[this.props.seatCount][i].y}
                                    id={i}
                                    TargetpositionId={this.TargetpositionId.bind(this)}
                                ></TargetPos>);
                            }
                            return this.seatsContainer1;
                        })()}
                    </Group>
                    <Group>
                        <Circle
                            // x={(450 * 0.5) + 180}
                            x={Screen.getDeviceType().name !== "Mobile" ? 285 : 425}
                            // y={this.props.stageHeight - 130}
                            y={Screen.getDeviceType().name !== "Mobile" ? 540 : 650}
                            width={50}
                            height={50}
                            radius={20} // Larger radius for better touch interaction
                            fill={this.state.color}
                            shadowColor="#666"
                            shadowBlur={10}
                            shadowOpacity={0.5}
                            onMouseEnter={() => {
                                this.setState({ color: "#ff6666" })

                            }}
                            onMouseLeave={() => {
                                this.setState({ color: "#ff0000" })
                            }}
                            onMouseDown={() => {
                                this.setState({ color: "#cc0000" })
                            }}
                            onMouseUp={() => {
                                this.setState({ color: "#ff0000" })
                            }}
                            onTouchStart={() => {

                            }} // Touch support for mobile devices
                            onTouchEnd={() => {
                                this.setState({ color: "#ff6666" })
                            }}
                            draggable={false}

                            onMouseOver={() => {
                                this.setState({ color: "#ff6666" })
                            }}
                            onMouseOut={() => {
                                this.setState({ color: "#ff0000" })
                            }}

                            onClick={() => { this.props.hidaAni(false) }}
                            onTap={() => {

                                this.props.hidaAni(false)
                            }}

                        />
                        <Text text="Close" x={(450 * 0.5) + 168} y={this.props.stageHeight - 133} fontSize={10} fill="#fff"
                            onClick={() => { this.props.hidaAni(false) }}
                            onTap={() => {

                                this.props.hidaAni(false)
                            }}

                        />
                    </Group>

                    <Group >
                        <Image
                            // x={(450 * 0.5) - 100}
                            x={Screen.getDeviceType().name !== "Mobile" ? 5 : 150}
                            // y={this.props.stageHeight - 160}
                            y={Screen.getDeviceType().name !== "Mobile" ? 520 : 630}
                            ref={this.ImageRef}
                            width={50}
                            height={40}
                            image={this.state.image}
                            draggable="true"
                            index={0}
                            id="axe"
                            onDragStart={(e) => {
                                // console.log(this.shadowRef.current)
                                // this.shadowRef.current.sceneFunc((context, shape) => {
                                // })
                            }}
                            onDragMove={
                                this.dargmoving

                            }
                            onDragEnd={this.handleDrag}
                            // ref={node => {
                            //     this.imageNode = node;
                            // }}

                            onTap={this.onTaphand}


                        />
                    </Group>
                    <Group>
                        <Image
                            // x={(450 * 0.5) - 50}
                            x={Screen.getDeviceType().name !== "Mobile" ? 60 : 205}
                            // y={this.props.stageHeight - 160}
                            y={Screen.getDeviceType().name !== "Mobile" ? 515 : 625}
                            width={50}
                            height={50}
                            image={this.state.image1}
                            draggable="true"
                            index={2}
                            id="sssss"
                            onDragStart={(e) => {

                            }}
                            onDragMove={(e) => {

                            }}
                            onDragEnd={this.handleDrag}
                        />
                    </Group>
                    <Group>
                        <Image
                            // x={150}
                            // x={(450 * 0.5)}
                            x={Screen.getDeviceType().name !== "Mobile" ? 110 : 260}
                            // y={this.props.stageHeight - 160}
                            y={Screen.getDeviceType().name !== "Mobile" ? 515 : 625}
                            width={50}
                            height={50}
                            image={this.state.image2}
                            draggable="true"
                            index={3}
                            id="fish"
                            onDragStart={(e) => {

                            }}
                            onDragMove={(e) => {
                            }}
                            onDragEnd={this.handleDrag}

                        />
                    </Group>
                    <Group>
                        <Image
                            // x={200}
                            // x={(450 * 0.5) + 50}
                            x={Screen.getDeviceType().name !== "Mobile" ? 165 : 305}
                            // y={this.props.stageHeight - 160}
                            y={Screen.getDeviceType().name !== "Mobile" ? 515 : 627}
                            width={45}
                            height={45}
                            image={this.state.image3}
                            draggable="true"
                            index={4}
                            id="tissue"
                            onDragStart={(e) => {

                            }}
                            onDragMove={(e) => {

                            }}
                            onDragEnd={this.handleDrag}

                        />
                    </Group>
                    <Group>
                        <Image
                            // x={250}
                            // x={(450 * 0.5) + 100}
                            x={Screen.getDeviceType().name !== "Mobile" ? 220 : 355}
                            // y={this.props.stageHeight - 160}
                            y={Screen.getDeviceType().name !== "Mobile" ? 515 : 630}
                            width={40}
                            height={40}
                            image={this.state.image4}
                            draggable="true"
                            index={5}
                            id="money"
                            onDragStart={(e) => {

                            }}
                            onDragMove={(e) => {

                            }}
                            onDragEnd={this.handleDrag}

                        />
                    </Group>

                </Group>}

                {/* ********************************************Animation Images end**************************************************************/}
            </Layer>

        );
    }
}
