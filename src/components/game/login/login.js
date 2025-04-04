import React from "react";
// import river_logo from "../../../assets/images/logo/river_logo.png";
import river_logo from "../../../assets/images/logo/river_logo.svg";
import { withTranslation } from 'react-i18next';
import Config from "../../../config";
import UpdateVersion from "../../game/ui/popUps/UpdateVersion.js";
import UM from "../../utils/utilityMethods.js";
import refreshIcon from "../../../assets/images/login/refreshIcon.png";
import eye from "../../../assets/images/lobby/eye.svg";

import "../../../css/login/login.css";
import "../../../css/media_queries/allpagesMedia.css";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginResp1: "",
            loginResp2: "",
            username: "",
            password: "",
            captcha: "",
            loader: false,
            usernameTextFieldSpaces: false,
            passwordTextFieldSpaces: false,
            isChecked: true,
            showErrorMsg: true,
            spinStart: false,
            errorMessage: "",
            genCaptcha: "****",
            passwordState: true,
            showUpdateAlert: false,
            isUsernameFocused: false,
            isPasswordFocused: false,
            versionControler: {
                enabled: false,
                currentVersion: "",
                criticalVersion: "",
                buildDate: "",
                currentGameVersion: "",
                buildTime: ""
            },
            //         imagepath: `M21.6,7.9L21.6,7.9l5.6-0.7c1,0,1.6,0.4,1.6,1.2s-0.5,1.3-1.5,1.5c-1,0.2-3.2,0.5-6.7,0.8l0,0
            // c-0.5,1.3-1.2,3-2.2,5.2l0,0c-2,4.5-2.9,7.3-2.9,8.2l0,0c0,1,0.6,1.5,1.9,1.5l0,0c4,0,7.6-0.7,10.8-2l0,0c0.5-0.2,0.8-0.3,1.1-0.3
            // l0,0c0.5,0,0.8,0.2,0.8,0.7c0,0.5-0.3,0.9-1,1.4l0,0c-2.1,1.4-5.2,2.5-9.3,3.4c-4.2,0.9-8,1.4-11.5,1.4l0,0c-2,0-3.5-0.3-4.6-1
            // C2.5,28.6,2,27.8,2,26.7l0,0c0-1.1,0.7-3.2,2.2-6.2l0,0C5.8,17,7,14,7.7,11.5l0,0c-0.9,0-1.5,0.1-1.8,0.1l0,0c-0.8,0-1.3-0.3-1.3-1
            // l0,0c0-0.5,0.1-0.8,0.4-1c0.3-0.2,0.5-0.3,0.8-0.3C6.2,9.1,6.4,9,6.6,9C6.8,9,7.1,9,7.5,9c0.4,0,0.6,0,0.8-0.1l0,0
            // c0.2-1.1,0.3-2.1,0.3-3l0,0l0-0.8C8.6,4.4,9.4,4,11,3.8l0,0c0.5-0.1,2.2-0.4,5-1.1c2.8-0.6,4.6-0.9,5.2-0.9l0,0c1,0,1.5,0.3,1.5,1
            // l0,0C22.7,4.1,22.3,5.7,21.6,7.9z`
        };
        this._isMounted = false;
        this.config = new Config();
        this.handleKeyboardShow = this.handleKeyboardShow.bind(this);
        this.handleKeyboardHide = this.handleKeyboardHide.bind(this);
        // this.handleUsernameChange = this.handleUsernameChange.bind(this);
        // this.generateCaptcha = this.generateCaptcha.bind(this);
    }

    componentDidMount() {
        console.log("React version : ", React.version);
        this._isMounted = true;
        // const manifestUrl = `${process.env.PUBLIC_URL}/manifest.json`;

        const manifestUrl = `${this.config.URL_Environment.proxy.baseUrl}/pokerh5v4/manifest.json`;
        fetch(manifestUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch manifest.json");
                }
                return response.json();
            })
            .then(data => {
                if (this._isMounted) {
                    if (data && data.buildTime) {
                        const [year, month, day] = data.buildTime.split(" ")[0].split("-");
                        this.setState({ versionControler: { buildTime: `${year}.${month}.${day}` } });
                    }
                }
            })
            .catch(error => {
                if (this._isMounted) {
                    console.error("Error fetching manifest.json:", error);
                }
            });

        // this.getVertionIfo();

        let newsession = sessionStorage.getItem("webSessionId");
        if (JSON.parse(newsession) !== null) {
            if ((JSON.parse(newsession)).success) {
                let id = (JSON.parse(newsession)).sessionId.split(".");
                sessionStorage.setItem(`${window.location.hostname}'_sid'`, JSON.stringify({ sid: id[1] }));
                this.props.handler({ status: true, sid: id[1] });
                return;
            }
        }

        let session = this.checkSession();
        if (session.status) {
            let id = session.wSid.split(".");
            sessionStorage.setItem(`${window.location.hostname}'_sid'`, JSON.stringify({ sid: id[1] }));
            this.props.handler({ status: true, sid: id[1] });
            return;
        } else {
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            if (username === "" && password === "") {
                if (localStorage.getItem("username") !== "" && localStorage.getItem("password") !== "") {
                    if (localStorage.getItem("username") !== null && localStorage.getItem("password") !== null) {
                        this.setState({ username: localStorage.getItem("username"), password: localStorage.getItem("password") })
                    }
                }
            }
        };
        setTimeout(() => {
            this.generateCaptcha();
        }, 1000);
        window.addEventListener('keyboardDidShow', this.handleKeyboardShow);
        window.addEventListener('keyboardDidHide', this.handleKeyboardHide);


        const handler = e => {
            console.log('in handler PWA')
            e.preventDefault();
            this.promptInstall = e;
        };
        window.addEventListener("beforeinstallprompt", handler);
        return () => window.removeEventListener("transitionend", handler);
    }

    generateCaptcha = () => {
        this.setState({ spinStart: true, captcha: "" });

        const xhr = new XMLHttpRequest();
        const path = `${this.config.URL_Environment.proxy.baseUrl}${this.config.URL_Environment.apiPath.generateCaptcha_Api}`;

        xhr.open("POST", path, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("siteid", this.config.URL_Environment.sitIds.sitid);

        xhr.onerror = (error) => this.handleEvent(error);
        xhr.onabort = (error) => this.handleEvent(error);
        xhr.onload = (event) => this.readCaptcha(event);

        const payload = {};
        xhr.send(JSON.stringify(payload));
    };

    readCaptcha = (event) => {
        if (!this._isMounted) return;

        this.setState({ spinStart: false });
        const response = event.target.responseText;

        if (response) {
            try {
                const parsedResponse = JSON.parse(response);
                this.setState({ genCaptcha: parsedResponse });
            } catch (error) {
                console.error("Failed to parse captcha response", error);
                this.setState({ genCaptcha: "****" });
            }
        }
    };


    handleEvent(e) {
        console.log(`${e.type}: ${e.loaded} bytes transferred\n`);
    };
    componentWillUnmount() {
        this._isMounted = false;
        clearTimeout(this.clearlogin);
        window.removeEventListener('keyboardDidShow', this.handleKeyboardShow);
        window.removeEventListener('keyboardDidHide', this.handleKeyboardHide);
    }

    handleKeyboardShow() {
        document.body.classList.add('keyboard-open');
    }

    handleKeyboardHide() {
        document.body.classList.remove('keyboard-open');
    }

    getVertionIfo() {
        fetch('https://riv3.czargaming.com/download/mobile/mobile-update.xml')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, 'application/xml');
                const enabled = xmlDoc.getElementsByTagName('enabled')[0].textContent;
                const currentVersion = xmlDoc.getElementsByTagName('currentVersion')[0].textContent;
                const criticalVersion = xmlDoc.getElementsByTagName('criticalVersion')[0].textContent;
                const buildDate = xmlDoc.getElementsByTagName('buildDate')[0].textContent;

                if (this._isMounted) {
                    this.setState({
                        versionControler: {
                            enabled: enabled,
                            currentVersion: currentVersion,
                            criticalVersion: criticalVersion,
                            buildDate: buildDate,
                            currentGameVersion: "24.11.01"
                        },
                    });
                    console.log(this.state.versionControler)
                    let N = currentVersion.split(".");
                    let O = this.state.versionControler.currentGameVersion.split(".");
                    if (Number(N[2]) > Number(O[2])) {
                        this.setState({ showUpdateAlert: true });
                    } else {
                        this.setState({ showUpdateAlert: false });
                    }
                }
            })
            .catch(error => {
                console.error('There has been a problem with fetch operation:', error);
            });
    }

    checkSession() {
        let session = sessionStorage.getItem(`${window.location.hostname}'_wSid'`);
        session = session ? JSON.parse(session) : null;
        return session?.wSid ? { status: true, wSid: session.wSid } : { status: false, wSid: null };
    }

    handleUsernameChange = (event) => {
        const inputValue = event.target.value;
        const hasSpaces = /\s/.test(inputValue);

        this.setState({
            username: inputValue,
            usernameTextFieldSpaces: hasSpaces,
            errorMessage: hasSpaces ? "Spaces are not allowed in the username." : "",
            loginResp1: "",
            loginResp2: "",
            loader: false,
        });
    };

    handlePasswordChange = (event) => {
        const inputValue = event.target.value;
        const hasSpaces = /\s/.test(inputValue);

        this.setState({
            password: inputValue,
            passwordTextFieldSpaces: hasSpaces,
            errorMessage: "",
            loginResp1: "",
            loginResp2: "",
            loader: false,
        });
    };

    handleCaptchChange = (event) => {
        if (Number(event.target.value) === Number(this.state.genCaptcha)) {
            this.setState({ showErrorMsg: false });
        } else {
            this.setState({ showErrorMsg: true });
        };
        this.setState({ captcha: event.target.value, errorMessage: "", loginResp1: "", loginResp2: "", loader: false });
    };

    onClickSignIn(e) {
        console.log(e)
        console.log(e.target)
        e.preventDefault();
        if (this.state.username && this.state.password && this.state.captcha && !this.state.showErrorMsg) {
            this.setState({ loader: true, loginResp1: "Please Wait...  Loggin In" });
            this.props.onSubmit();
            let value = {
                login: this.state.username,
                password: this.state.password,
                captcha: this.state.captcha,
                gReCaptchaResponse: null
            };
            fetch(this.config.URL_Environment.proxy.baseUrl + this.config.URL_Environment.apiPath.login_Api, {
                // mode: 'no-cors',
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "Access-Control-Allow-Origin": "*",
                    siteid: this.config.URL_Environment.sitIds.sitid,
                },
                body: JSON.stringify(value),
            }).then((resp) => resp.json())
                .then((resp) => {
                    if (this._isMounted) {
                        // this.clearlogin = setTimeout(() => {
                        // if (this._isMounted) {
                        this.setState({ loader: false });
                        // }
                        // }, 4000);
                        if (resp.success && resp.hasOwnProperty("sessionId")) {
                            let id = resp.sessionId.split(".");
                            localStorage.setItem('showPop', true)
                            this.setState({ loginResp1: "" });
                            // setTimeout(() => {
                            //     this.setState({ passwordState: true });
                            // }, 10000);
                            // this.setState({ loader: false });
                            sessionStorage.setItem(`${window.location.hostname}'_sid'`, JSON.stringify({ sid: id[1] }));
                            sessionStorage.setItem(`${window.location.hostname}'_wSid'`, JSON.stringify({ wSid: resp.sessionId }));
                            this.props.handler({ status: true, sid: id[1] });
                            if (this.state.isChecked) {
                                localStorage.setItem("username", this.state.username)
                                localStorage.setItem("password", this.state.password)
                            }
                        } else {
                            this.generateCaptcha();
                            this.props.handler({ status: false, sid: null, description: resp.description });
                            this.setState({ loginResp1: "Oops!", loginResp2: resp.description });
                            setTimeout(() => {
                                if (this._isMounted) {
                                    this.setState({ loginResp1: "", loginResp2: "" });
                                }
                            }, 5000);
                        }
                    }
                })
                .catch((err) => {
                    console.error("login err: ", err);
                    // console.log(this._isMounted)
                    this.clearlogin = setTimeout(() => {
                        if (this._isMounted) {
                            this.setState({ loader: false, loginResp1: "" });
                            this.props.onSubmit("login_err");
                        }
                    }, 1000);
                });
        } else {
            if (!this.state.username) {
                this.setState({ errorMessage: 'username' })
            } else if (!this.state.password) {
                this.setState({ errorMessage: 'password' })
            } else if (!this.state.captcha || this.state.captcha) {
                this.setState({ errorMessage: 'captcha' })
            }

            // console.log(this.state.captcha)
            // console.log(!this.state.showErrorMsg)
            // showErrorMsg
        }
    }

    onChangeCheckbox = (event) => {
        if (event.target.checked) {
            if (this.state.username !== null && this.state.password !== null) {
                localStorage.setItem("username", this.state.username)
                localStorage.setItem("password", this.state.password)
            }
        } else {
            localStorage.removeItem("username")
            localStorage.removeItem("password")
        }
        this.setState({
            isChecked: event.target.checked,
        });
    };

    onApkUpdateUlr(action) {
        this.setState({ showUpdateAlert: false });
        if (action === "download") {
            const apkUrl = 'https://riv3.czargaming.com/download/mobile/pokermobile.apk';
            window.open(apkUrl, "_self");
        }
    }


    getInstall = e => {
        if (this.promptInstall) {
            this.promptInstall.prompt();
        } else {
            return;
        };
    };

    handleFocus = (event) => {
        const inputElement = event.target;
        this.setState({ isUsernameFocused: true });
    };

    handleBlur = (event) => {
        const inputElement = event.target;
        this.setState({ isUsernameFocused: false });
    }

    render() {
        // const { versionControler } = this.state;
        const formContainerStyle = {
            marginTop: this.state.isUsernameFocused && (this.props.stageProperties.deviceOrientation && this.props.stageProperties.deviceOrientation === "landscape") ? '160px' : '0px',
            transition: "all 0.5s ease"
        };

        return (
            <>
                {/* <main className="login-container" style={{ backgroundSize: this.state.isUsernameFocused || this.state.isPasswordFocused ? 'cover' : '' }}> */}
                <main className="login-container" style={{ backgroundSize: (this.state.isUsernameFocused && (this.props.stageProperties.deviceOrientation && this.props.stageProperties.deviceOrientation === "landscape")) ? 'cover' : '' }}>
                    {/* <main className="login-container" > */}
                    <header className="fd m_t_40">
                        <span className="font_w_500">{this.state.loginResp1}</span>
                        <span className="clr_f01 font_w_500 font_16">{UM.textFormat(this.state.loginResp2)}</span>
                    </header>
                    <section style={{ alignItems: 'end', marginRight: '50px' }}>
                        <div style={{ width: '80%' }}>
                            <img src={river_logo} alt="logo not found" />
                        </div>
                    </section>

                    <section style={{ alignItems: 'start', marginLeft: '50px' }}>
                        <form className="fd" onSubmit={this.onClickSignIn.bind(this)} style={formContainerStyle}>
                            {/* <form className="fd" onSubmit={(e) => {
                            e.preventDefault();
                            this.setState({ passwordState: false }, () => {
                                this.onClickSignIn(e);
                            });
                        }} */}
                            <div className="form-container">

                                <div className="m_b_15">
                                    <label htmlFor="username">Username:</label>
                                    <div className="login-input-fields">
                                        <svg xmlns="http://www.w3.org/2000/svg" style={{ minWidth: "50px" }} height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                                            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                                        </svg>
                                        <input
                                            type="text"
                                            placeholder="Enter username"
                                            id="username"
                                            name="username"
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleUsernameChange}
                                            value={this.state.username}
                                        />
                                    </div>
                                    <small className="clr_f01">
                                        {this.state.usernameTextFieldSpaces && "Spaces are not allowed"}
                                        {this.state.errorMessage === 'username' && "Please Enter Username"}
                                    </small>
                                </div>


                                <div className="m_b_15">
                                    <label htmlFor="password">Password:</label>
                                    <div className="login-input-fields">
                                        {this.state.passwordState ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" style={{ minWidth: "50px" }} height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                                                <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
                                            </svg>) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" style={{ minWidth: "50px" }} height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                                                <path d="m800-274-80-80v-206H514l-80-80h166v-80q0-50-34.5-85T481-840q-50 0-84 34.5T363-720v9l-73-73q22-61 75-98.5T481-920q83 0 141 58.5T680-720v80h40q33 0 56.5 23.5T800-560v286Zm20 246-62-62q-11 5-20 7.5T720-80H240q-33 0-56.5-23.5T160-160v-400q0-25 14.5-46t37.5-30L28-820l56-56L876-84l-56 56ZM686-160 539-309q-11 11-25.5 17t-31.5 6q-33 0-56.5-23.5T402-366q0-17 6-31.5t17-25.5L286-560h-46v400h446ZM486-360Zm131-97Z" />
                                            </svg>
                                        )}
                                        <input
                                            type={this.state.passwordState ? "password" : "text"}
                                            // type="text"
                                            placeholder="Enter password"
                                            id="password"
                                            name="passcode"
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                            onChange={this.handlePasswordChange}
                                            value={this.state.password}
                                        />
                                        <div className="eyeToggleDiv" onClick={() => { this.setState({ passwordState: !this.state.passwordState }) }} style={{ left: "unset", right: "5px", top: "7px", height: "40px" }} title={this.state.passwordState ? "Show password" : "Hide password"}>
                                            <img src={eye} id="eyes" className={this.state.passwordState ? "eyeToggleHide" : "eyeToggleShow"} alt="Not Found" style={{ width: "80px", top: "-4px" }} />
                                        </div>
                                    </div>
                                    <small className="clr_f01">
                                        {this.state.passwordTextFieldSpaces && "Spaces are not allowed"}
                                        {this.state.errorMessage === 'password' && "Please Enter Password"}
                                    </small>
                                </div>


                                <div className="m_b_15">
                                    <label htmlFor="captcha">Captcha:</label>
                                    <div className="login-input-fields">
                                        <span className="captch-text">{this.state.genCaptcha} </span>
                                        <input
                                            type="text"
                                            placeholder="Enter Captcha"
                                            id="captcha"
                                            name="captcha"
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                            onChange={this.handleCaptchChange}
                                        />
                                        <div className="eyeToggleDiv" onClick={this.generateCaptcha} style={{ left: "unset", right: "5px", top: "2px", height: "40px" }} title="Reload captcha">
                                            <img
                                                src={refreshIcon}
                                                alt="Refresh Captcha"
                                                className={this.state.spinStart ? 'fa fa-refresh fa-spin' : 'fa fa-refresh'}
                                            />
                                        </div>
                                    </div>
                                    <small className="clr_f01">
                                        {this.state.errorMessage === 'captcha' &&
                                            (this.state.captcha === "" ? "Please Enter Captcha" :
                                                Number(this.state.captcha) !== Number(this.state.genCaptcha) &&
                                                "Please Enter Valid Captcha")}
                                    </small>
                                </div>


                            </div>
                            <span className="fd m_t_10 m_b_20" style={{ width: '80%' }} >
                                <label>Remember Password</label>
                                <input type="checkbox" onChange={this.onChangeCheckbox} value="checked" checked={this.state.isChecked} name="checkbox" />
                            </span>

                            <div className="m_t_50 login-btn">
                                <button className="pointer" type="submit" name="loginButton" id="submitBtn">
                                    Login
                                    {this.state.loader && <span className="m_l_5 loader_3"></span>}
                                </button>
                            </div>
                        </form>
                    </section>

                    <footer>
                        {/* <small style={{ visibility: (!this.state.isUsernameFocused && !this.state.isPasswordFocused) ? 'visible' : 'hidden' }}>Version: {this.state.versionControler.buildTime}b</small> */}
                        <small style={{ visibility: !this.state.isUsernameFocused ? 'visible' : 'hidden' }}>Version: {this.state.versionControler.buildTime}b</small>
                    </footer>

                    {this.state.showUpdateAlert &&
                        <UpdateVersion versionControler={this.state.versionControler} action={this.onApkUpdateUlr.bind(this)} />
                    }

                </main>
            </>
        );
    }
}

export default withTranslation()(Login);
