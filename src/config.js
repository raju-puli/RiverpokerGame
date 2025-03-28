import fileName from './jsconfig.js';
import Screen from './components/utils/screen.js';

class Config {
    constructor() {
        this.sid = this.getSessionId();
        this.URL_Environment = {
            webSocket: this.getWebSocketConfig(),
            proxy: this.getProxyConfig(),
            apiPath: this.getApiPaths(),
            url: this.getRedirectUrls(),
            sitIds: this.getSiteIds(),
            TableFeatures: this.getTableFeatures(),
            DeviceName: this.getDevice(),
            singleClick: this.getClickType(),
        };
    }

    getSessionId() {
        let sid;
        const interval = setInterval(() => {
            const sessionData = sessionStorage.getItem(`${window.location.hostname}'_wSid'`);

            if (sessionData) {
                try {
                    const ws = JSON.parse(sessionData).wSid;
                    sid = ws.split(".")[1];
                    if (sid) {
                        // console.log(sid);
                        clearInterval(interval);
                    }
                } catch (e) {
                    console.error(e.message);
                }
            } else {
                const sidData = sessionStorage.getItem(`${window.location.hostname}'_sid'`);
                if (sidData) {
                    sid = JSON.parse(sidData).sid;
                }
            }

            if (localStorage.getItem('showPop')) {
                clearInterval(interval);
            }
        }, 500);

        return sid;
    }

    getWebSocketConfig() {
        return {
            socketUrl: (
                fileName.name === "Riverpoker" ? (fileName.buildForLive ? `wss://www.riverpoker.com/WebSocket` :
                    fileName.optimizeUrl ? `wss:${window.location.host}/WebSocket` : `wss://riv7.czargaming.com/WebSocket`) :
                    fileName.name === "Lapoker" ? (fileName.buildForLive ? `wss://demo.latsoft.org/WebSocket` : `wss://demo.latsoft.org/WebSocket`) :
                        fileName.name === "Leader_bet" ? `wss://riv3.czargaming.com/WebSocket` :
                            fileName.name === "vendibet" ? `wss://vendibet-sl.undertesting.com/WebSocket` :
                                fileName.name === "lapoker" ? `wss://lapoker-sl.undertesting.com/WebSocket` :
                                    fileName.name === "pokerperu" ? `wss://pokerperu-sl.undertesting.com/WebSocket` :
                                        fileName.name === "prode" ? `wss://prode-sl.undertesting.com/WebSocket` :
                                            fileName.name === "fullbet" ? `wss://fullbet-sl.undertesting.com/WebSocket` : `wss://clpmaster.undertesting.com/WebSocket`
            )
        };
    }

    getProxyConfig() {
        return {
            baseUrl: (
                fileName.name === "Riverpoker" ? (fileName.buildForLive ? `https://www.riverpoker.com` :
                    fileName.optimizeUrl ? window.location.origin : `https://riv7.czargaming.com`) :
                    fileName.name === "Lapoker" ? (fileName.buildForLive ? `https://demo.latsoft.org` : `https://demo.latsoft.org`) :
                        fileName.name === "Leader_bet" ? `https://riv3.czargaming.com` :
                            fileName.name === "vendibet" ? `https://vendibet-sl.undertesting.com` :
                                fileName.name === "lapoker" ? `https://lapoker-sl.undertesting.com` :
                                    fileName.name === "pokerperu" ? `https://pokerperu-sl.undertesting.com` :
                                        fileName.name === "prode" ? `https://prode-sl.undertesting.com` :
                                            fileName.name === "fullbet" ? `https://fullbet-sl.undertesting.com` : `https://clpmaster-sl.undertesting.com`
            )
        };
    }

    getApiPaths() {
        return {
            login_Api: "/api/player/login",
            generateCaptcha_Api: "/api/player/generateCaptchaText",
            resetPassword_Api: "/api/player/resetPassword",
            getAvatarList_Api: "/api/player/getAvatarList",
            setAvatar_Api: "/api/player/setAvatar",
            getAvtr_Api: "/api/player/getAvatar",
            balance_Api: "/api/cashier/balance",
            deposit_Api: "/api/cashier/buy",
            withdraw_Api: "/api/cashier/cashout",
            transaction_Api: "/api/history/transaction",
            inviteFriend_Api: "/api/cashier/inviteFriend",
            handHistory_Api: "/api/history/gameRoundData",
            handDataNew_Api: "/api/history/handDataNew",
            handplayNew_Api: "/api/history/handplay",
            logout_Api: "/api/player/logout",
        };
    }

    getRedirectUrls() {
        return {
            gotoSlots: `/client-redirect?LANG=en&sid=${this.sid}&to=slots`,
            gotoSports: `/client-redirect?LANG=en&sid=${this.sid}&to=sports`,
            gotoHorses: `/client-redirect?LANG=en&sid=${this.sid}&to=horseracing`,
            gotoDeposit: `/client-redirect?LANG=en&sid=${this.sid}&to=deposit`,
            gotoExchangeCurrency: `/client-redirect?LANG=en&sid=${this.sid}&to=exchangeCurrency`,
            gotoLivecasino: `/client-redirect?LANG=en&sid=${this.sid}&to=liveDealer_2`,
            gotoCrash: `/client-redirect?LANG=en&sid=${this.sid}&to=crash`,
            gotoSportsm: `/client-redirect?LANG=en&sid=${this.sid}&to=Sportsm`
        };
    }

    getSiteIds() {
        return {
            sitid: (
                fileName.name === "Riverpoker" ? 'rp1' :
                    fileName.name === "Lapoker" ? 'prode' :
                        fileName.name === "Leader_bet" ? 'rp1' :
                            fileName.name === "vendibet" ? 'vesmaster' :
                                fileName.name === "lapoker" ? 'prode' :
                                    fileName.name === "pokerperu" ? 'penmaster' :
                                        fileName.name === "prode" ? 'prode' :
                                            fileName.name === "fullbet" ? 'fullbet' : 'clpmaster'
            )
        };
    }

    getTableFeatures() {
        return {
            selected: (
                fileName.name === "Riverpoker" ? (Screen.getDeviceType().name === "Mobile" ? "F1" : "F2") :
                    fileName.name === "Lapoker" ? (Screen.getDeviceType().name === "Mobile" ? "F1" : "F1") :
                        fileName.name === "Leader_bet" ? (Screen.getDeviceType().name === "Mobile" ? "F1" : "F2") :
                            fileName.name === "vendibet" ? (Screen.getDeviceType().name === "Mobile" ? "F1" : "F1") :
                                fileName.name === "lapoker" ? (Screen.getDeviceType().name === "Mobile" ? "F1" : "F1") :
                                    fileName.name === "pokerperu" ? (Screen.getDeviceType().name === "Mobile" ? "F1" : "F1") :
                                        fileName.name === "prode" ? (Screen.getDeviceType().name === "Mobile" ? "F1" : "F1") :
                                            fileName.name === "fullbet" ? (Screen.getDeviceType().name === "Mobile" ? "F1" : "F1") :
                                                (Screen.getDeviceType().name === "Mobile" ? "F1" : "F1")
            )
        };
    }



    getDevice() {
        function getViewportCategory() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const orientation = width > height ? 'landscape' : 'portrait';

            if (width <= 480) {
                return 'Mobile_Portrait';
            } else if (width > 576 && width <= 797 && orientation === 'landscape') {
                return 'Mobile_Landscape';
            } else if (width > 797 && width <= 992 && orientation === 'portrait') {
                return 'Tablet_Portrait';
            } else if (width > 992 && width <= 1200 && orientation === 'landscape') {
                return 'Tablet_Landscape';
            } else if (width > 1200 && width <= 1324) {
                return 'Desktop';
            } else if (width > 1440) {
                return 'Large_Screens';
            } else {
                return 'Unknown_Viewport';
            }
        }
        return getViewportCategory() || "Unknown Device";
    };

    getClickType() {
        function getViewport() {
            const width = window.innerWidth;
            if (width > 1200) {
                return "false"
            } else {
                return "true"
            }
        }
        return getViewport() || "Unknown Device";
    }


}

export default Config;
