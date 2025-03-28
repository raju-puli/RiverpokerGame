import React, { Component } from "react";
import "./css/app.css";
import Loader from "./components/utils/loader";

import Login from "./components/game/login/login";
import Game from "./components/game/game";
import Config from "./config";
import { SkeletonTheme } from "react-loading-skeleton";

export default class Appcopy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoading: true,
            showLogin: false,
            loginResp1: "",
            loginResp2: "",
            error: true,
            isSessionActive: false,
            sid: "",
            BgOpacity: 1,
            loginBtnState: false,
            showLoader: false,
            stageProperties: {
                width: 1600,
                height: 960,
                deviceOrientation: ""
            }
        };
        this.config = new Config();
        this.handleResize = this.handleResize.bind(this);
    }
    componentDidMount() {
        this.onAppMount();
        this.config.getDevice();

        // const numberOfStars = 40;
        // const starfallContainer = document.getElementById('starfall');

        // Array.from({ length: numberOfStars }).forEach(() => {
        //     const star = document.createElement('div');
        //     star.className = 'falling-star';

        //     const randomLeft = `${Math.random() * 100}vw`;
        //     const randomDelay = `${Math.random() * 5}s`;
        //     const randomDuration = `${3 + Math.random() * 2}s`;
        //     const randomSize = `${4 + Math.random() * 6}px`;

        //     star.style.left = randomLeft;
        //     star.style.animationDelay = randomDelay;
        //     star.style.animationDuration = randomDuration;
        //     star.style.width = randomSize;
        //     star.style.height = randomSize;

        //     starfallContainer.appendChild(star);
        // });

        window.addEventListener('resize', this.handleResize);
        this.handleResize();
        // this.getWeatherReport();
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }


    // getWeatherReport() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(position => {
    //             const lat = position.coords.latitude;
    //             const lon = position.coords.longitude;
    //             console.log(`Latitude: ${lat}, Longitude: ${lon}`);

    //             const now = new Date();
    //             const hours = now.getHours();

    //             let weather = '';
    //             if (hours >= 6 && hours <= 18) {
    //                 weather = 'Sunny or Clear Skies (Daytime)';
    //             } else {
    //                 weather = 'Cool or Cloudy (Nighttime)';
    //             }

    //             console.log(`Estimated Weather: ${weather}`);
    //         }, error => {
    //             console.log('Error getting location:', error.message);
    //         });
    //     } else {
    //         console.log('Geolocation is not supported by this browser.');
    //     }
    // };

    handleResize() {
        const getDeviceTypeAndOrientation = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const userAgent = navigator.userAgent.toLowerCase();

            const isMobile = /mobile|iphone|ipod|android/i.test(userAgent);
            const isTablet = /tablet|ipad|android(?!.*mobile)/i.test(userAgent);
            const isDesktop = !isMobile && !isTablet;

            const orientation = width > height ? 'landscape' : 'portrait';

            if (isDesktop) {
                return { device: 'desktop', orientation: null };
            }

            if (isTablet) {
                return { device: 'tablet', orientation };
            }

            if (isMobile) {
                return { device: 'mobile', orientation };
            }

            return { device: 'unknown', orientation: null };
        };

        const deviceInfo = getDeviceTypeAndOrientation();
        console.log(`Device: ${deviceInfo.device}, Orientation: ${deviceInfo.orientation}`);
        sessionStorage.setItem("DeviceOrientation", JSON.stringify({ device: `${deviceInfo.device}`, Orientation: `${deviceInfo.orientation}` }));
        if (
            (deviceInfo.device === "mobile" && deviceInfo.orientation === "landscape") ||
            (deviceInfo.device === "tablet" && deviceInfo.orientation === "landscape") ||
            (deviceInfo.device === "desktop")
        ) {
            this.setState({
                stageProperties: {
                    // width: 800,
                    // height: 480,
                    width: 1600,
                    height: 960,
                    deviceOrientation: deviceInfo.orientation
                }
            });
        } else {
            this.setState({
                stageProperties: {
                    width: 550,
                    height: 760,
                    deviceOrientation: deviceInfo.orientation
                }
            });
        }
    }

    onFormSubmit(from) {
        if (from === 'login_err') {
            this.setState({ showLoader: false });
        } else {
            this.setState({ loginResp1: "Please Wait...  Loggin In", loginResp2: "", BgOpacity: 0.5, loginBtnState: true, error: true, showLoader: true });
        }
    };

    logOutHandler() {
        sessionStorage.clear();
        this.clearLocalStorageValues()
        this.setState({ showLogin: true, showLoading: false, isSessionActive: false, sid: null, BgOpacity: 1, showLoader: false });
        // setTimeout(() => {
        //     window.location.reload();
        // }, 10);
    };

    clearLocalStorageValues() {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("profileBackground_")) {
                localStorage.removeItem(key);
            }
        }

    }

    AppHandler(action) {
        if (action) {
            this.setState({ showLoader: false });
            if (action.status) {
                this.setState({ showLogin: false, showLoading: false, isSessionActive: true, sid: action.sid, loginResp1: "", loginResp2: "", loginBtnState: false, error: true });
            } else {
                this.setState({ showLogin: true, showLoading: false, loginResp1: "Oops!", loginResp2: action.description, loginBtnState: false, BgOpacity: 1, isSessionActive: false, error: false });
            }
        }
    };

    onAppMount() {
        var sessionData = JSON.parse(sessionStorage.getItem(`${window.location.hostname}_sid`));

        if (sessionData) {
            this.setState({ sid: sessionData.sid, showLogin: false, showLoading: false });
        } else {
            this.setState({ showLogin: true, showLoading: false });
        }
    };

    render() {
        return (
            <div className="App fd">
                {/* <div className="starfall" id="starfall"></div> */}
                {/* <div class="wrapper">
                    <div class="backdrop"></div>
                    <div class="stage_floor"></div>
                    <div class="stage_highlight"></div>
                    <div class="spotlight_swivel">
                        <div class="lamp"></div>
                    </div>
                </div> */}
                {this.state.showLoader && <Loader />}
                {!this.state.showLoading && this.state.showLogin && (
                    <Login className="animateComponent" stageProperties={this.state.stageProperties} handler={this.AppHandler.bind(this)} onSubmit={this.onFormSubmit.bind(this)} loginBtnState={this.state.loginBtnState} />
                )}
                {!this.state.showLoading && !this.state.showLogin &&
                    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
                        <Game sid={this.state.sid} stageProperties={this.state.stageProperties} logOutHandler={this.logOutHandler.bind(this)} />
                    </SkeletonTheme>
                }
            </div>
        );
    }
}
