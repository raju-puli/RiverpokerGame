import React from "react"
import "../../../../css/ui/lobby/userLabel.css";
// import avtar from "../../../../assets/images/lobby/avtar/avtar_icon9.png";
import star from "../../../../assets/images/lobby/star.png"
import starEmpty from "../../../../assets/images/lobby/star_off.png"
// import starGold from "../../../../assets/images/lobby/star_gold.svg"
// import starGrey from "../../../../assets/images/lobby/star_gery.svg"
import menuIcon from "../../../../assets/images/table/menu.svg";
import sideMenu from "../../../../assets/images/table/lb_sideMenu.png";
import logo from "../../../../assets/images/lobby/logo.png";
import More from "../../../../assets/images/lobby/More.svg";
import closebtn from "../../../../assets/images/lobby/closeprofile.svg";
import downarrow from "../../../../assets/images/lobby/downarrow.svg";
// import lobby_table from "../../../../assets/images/lobby/lobby_table.svg";
// import Lb_avtar from "../../../../assets/images/lobby/Lb_avtar.png";
// import reload_icon from "../../../../assets/images/table/reload_icon.svg"
import timeicon from '../../../../assets/images/lobby/lobbyHeader/time.png'
import playericon from '../../../../assets/images/lobby/lobbyHeader/Profile.png'
import tableicon from '../../../../assets/images/lobby/lobbyHeader/tableicon.png'
import cupicon from '../../../../assets/images/lobby/lobbyHeader/cup.png'
import Settingicon from '../../../../assets/images/lobby/lobbyHeader/Setting.png'
import eyeicon from '../../../../assets/images/lobby/lobbyHeader/eyeicon.png'
import powericon from '../../../../assets/images/lobby/lobbyHeader/powericon.png'
import { withTranslation } from 'react-i18next'
import fileName from "../../../../jsconfig";
import Config from "../../../../config";
import refreshicon from '../../../../assets/images/lobby/lobbyHeader/icons8-refresh-48.png'
import refreshGif from '../../../../assets/images/lobby/lobbyHeader/icons8-refresh (1).gif'
import Screen from "../../../utils/screen";

import ActiveTablesList from "../../ui/popUps/activeTablesList";
import UM from "../../../utils/utilityMethods";

class UserLabel extends React.Component {
  constructor() {
    super()
    this.state = {
      refreshboolean: false,
      showDrop: false,
      togglebtn: true
    }
  }

  openMenu() {
    this.props.openMenu();
  }
  componentDidMount() {
    // console.log(this.props.activeTables)
  }
  componentWillUnmount() {
    clearTimeout(this.refreshtimeclear)
  }
  RefreshHandle() {
    this.setState({ refreshboolean: true })
    this.refreshtimeclear = setTimeout(() => {
      this.setState({ refreshboolean: false })
      window.location.reload();
    }, 1000)
  }


  render() {
    const currentTime = new Date();
    this.config = new Config();
    const UserLevel = () => {
      return (
        <div className="userlevel">

          <div className="stars" onClick={() => { this.props.setAction("PLI") }}>
            <div className="singleStar0" hidden={this.props.stars.levelOne}>
              <img src={star} alt="" /></div>
            <div className="singleStar0" hidden={this.props.stars.levalZero}>
              <img src={star} alt="" /></div>

            <div className="singleStar1" hidden={this.props.stars.levelTwo}>
              <img src={star} alt="" />
            </div>

            <div className="singleStar2" hidden={this.props.stars.levelThree}>
              <img src={star} alt="" />
            </div>

            <div className="singleStar3" hidden={this.props.stars.levelFour}>
              <img src={star} alt="" />
            </div>
            <div className="singleStar4" hidden={this.props.stars.levelFive}>
              <img src={star} alt="" />
            </div>
            <div className="singleStar5" hidden={this.props.stars.levelSix}>
              <img src={star} alt="" />
            </div>
            <div className="singleStar6" hidden={this.props.stars.levelSeven} >
              <img src={star} alt="" />
            </div>
          </div>
        </div>
      );
    }

    const showDropDown = () => {
      this.setState({ showDrop: !this.state.showDrop });
    }
    return (
      <div className="fd">
        {(Screen.getDeviceType().name === "Mobile" && fileName.name !== "Leader_bet") &&
          <div className="fd df" style={{ justifyContent: 'space-between', height: '59px' }}>
            <div className="userProfile" >
              <span className="name_U bold" style={{ color: '#fff' }}> {this.props.user} </span>
              <UserLevel></UserLevel>
            </div>
            <div className={fileName.name === "Riverpoker" ? 'headerLogo' : 'df_al_js-center'}>
              <img className="headLogo" src={logo} alt="logo missing"></img>
            </div>
            <div className="userDtls">
              <div className="userMenu">
                <img onClick={() => this.openMenu()} className="imgMenu" src={menuIcon} alt="" />
              </div>
            </div>
          </div>
        }
        {/* {(Screen.getDeviceType().name == "Mobile" && fileName.name === "Leader_bet") &&
          <div className="fd df" style={{ justifyContent: 'space-between', height: '65px', background: '#202126', padding: '0px 10px' }}>
            <div className="userDtls">
              <div className="userMenu">
                <img onClick={() => this.openMenu()} className="imgMenu" src={sideMenu} alt="" />
              </div>
              <div className={fileName.name === "Riverpoker" ? 'headerLogo' : 'df_al_js-center'}>
                <img className="headLogo" src={logo} alt="logo missing"></img>
              </div>
            </div>

            <div className="userDtls">
              <div className="userMenuOne">
                <span className="name_U bold" style={{ color: '#fff' }}> {this.props.user} </span>
              </div>
              <div className='df_al_js-center'>
                <img className="headLogo" style={{ height: "40px", borderRadius: '4px' }} src={this.props.avtar} alt="logo missing"></img>
              </div>
            </div>
          </div>
        } */}



        {Screen.getDeviceType().name === "Desktop" &&
          <div className="fd df"
            style={{ justifyContent: 'space-between' }}
          >
            <div className="userProfile col-2" style={{ display: (window.innerWidth > 769 && window.innerWidth < 992) ? 'none' : 'flex' }}>
              <div className="ptt">
                <div className="df_al" style={{ display: (window.innerWidth > 810 && window.innerWidth < 1124) ? 'none' : '' }}>
                  <img src={timeicon} />
                  <span className="clr_4" style={{ textIndent: "2px", color: "#ffff" }}>
                    {currentTime.getHours()}:{currentTime.getMinutes()}
                  </span>
                </div>
                <div className="contents">
                  <div className="df_al m_5">
                    <img src={playericon} />
                    <span className="clr_4" style={{ textIndent: "2px", color: "#ffff" }}>
                      {this.props.datas.players}
                    </span>
                  </div>
                  <div className="df_al m_5">
                    <img src={tableicon} />
                    <span className="clr_4" style={{ textIndent: "2px", color: "#ffff" }}>
                      {this.props.datas.tables}
                    </span>
                  </div>
                  <div className="df_al m_5">
                    <img src={cupicon} />
                    <span className="clr_4" style={{ textIndent: "2px", color: "#ffff" }}>
                      {this.props.datas.tourneys}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className='df_al_js-end col-md-5'>
              {/* <div style={{ display: (window.innerWidth > 810 && window.innerWidth < 1100) ? "flex" : 'flex', alignItems: (window.innerWidth > 810 && window.innerWidth < 1100) ? '' : 'center', marginTop: '5px' }}> */}
              <img style={{ height: "35px", width: "35px", borderRadius: "50%", marginRight: "5px" }} src={this.props.avtar} />
              <span className="name_U bold" style={{ color: '#fff' }}> {this.props.user} </span>
              {!(window.innerWidth > 769 && window.innerWidth < 992) &&
                <UserLevel></UserLevel>
              }
              {/* </div> */}
            </div>
            <div className="userDtls" style={{ display: (window.innerWidth > 769 && window.innerWidth < 992) ? 'none' : 'flex' }}>
              <div className="userMenu">
                <img src={eyeicon} alt="" />
                <span className="clr_4 font_14 m_l_5" style={{ textIndent: "2px", color: "#ffff" }}>
                  {/* {this.props.balance.available.toLocaleString()} */}
                  {localStorage.getItem("currency_symbols") + UM.numberWithCommas(this.props.balance.available)}
                </span>
              </div>
            </div>
            <div className="userDtls m_r_25">
              <div className="userMenu">
                <img onClick={() => {
                  this.RefreshHandle()
                }} src={this.state.refreshboolean ? refreshGif : refreshicon} alt="" style={{ height: "40px", width: "40px", padding: "5px", cursor: "pointer" }} />
              </div>
              <div className="userMenu">
                <img style={{ width: (window.innerWidth > 769 && window.innerWidth < 992) ? '30px' : '', marginLeft: (window.innerWidth > 769 && window.innerWidth < 992) ? '20px' : '' }} onClick={() => this.openMenu()} src={!(window.innerWidth > 769 && window.innerWidth < 992) ? Settingicon : menuIcon} alt="" />
              </div>
              {!(window.innerWidth > 769 && window.innerWidth < 992) &&
                <div className="userMenu">
                  <img onClick={(e) => {
                    e.preventDefault();
                    this.props.Exit()
                    sessionStorage.clear();
                    window.location.reload();
                  }
                  } src={powericon} alt="" />
                </div>
              }
            </div>
          </div>}




        {(Screen.getDeviceType().name === "Mobile" && fileName.name !== "Leader_bet") &&
          <div className="fd balanceNinplayDiv" >
            <div className="fd df t_W_NO-w" style={{ alignItems: 'center', justifyContent: 'center', }}>
              {/* <span style={{ color: 'white' }}>{this.props.t('Balance')} </span><span className="money_U"> {this.props.balance.available.toLocaleString()} </span> */}
              <span style={{ color: 'white' }}>{this.props.t('Balance')} </span><span className="money_U"> {localStorage.getItem("currency_symbols") + UM.numberWithCommas(this.props.balance.available)} </span>
              {fileName.name === "Riverpoker" &&
                <div className="addBalanceSpan" onClick={() => {
                  window.open(this.config.URL_Environment.proxy.baseUrl + this.config.URL_Environment.url.gotoDeposit)
                }}> + </div>
              }
            </div>
            <div className="fd df" style={{ alignItems: 'center' }}>
              <div className="fd df" style={{ alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white' }}> {this.props.t('In Play')} :</span><span className="money_U"> {Number(this.props.balance.cashInPlay).toLocaleString()} </span>
              </div>
              {/* <div className="reloadIcns">
                <img src={reload_icon} onClick={() => { window.location.reload() }} alt="" style={{ width: '10px' }} />
              </div> */}
            </div>
          </div>}

        {(Screen.getDeviceType().name === "Mobile" && fileName.name === "Leader_bet") &&
          <>
            <div className="row">
              <div className="col-11 balanceNprofile df" style={{ height: '65px', alignItems: 'center', justifyContent: 'center', padding: '0px 0px' }}>
                <div className="subBlanceDiv">
                  <div className="balanceSec" style={{ width: '25%' }}>
                    <span style={{ color: '#FFFFFF', fontFamily: 'arial', fontSize: '12px' }}>{this.props.t('Balance')} </span>
                    {/* <span className="money_T" style={{ color: '#5998F5' }}> {this.props.balance.available.toLocaleString()} </span> */}
                    <span className="money_T" style={{ color: '#5998F5' }}> {UM.numberWithCommas(this.props.balance.available)} </span>
                  </div>

                  <div className="balanceSec" style={{ width: '33%', alignItems: 'end' }}>
                    <div className="minitablLobby" style={{ zIndex: this.state.showDrop ? '99' : '' }}>
                      <div style={{ margin: '0px 9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/* <img src={lobby_table} alt="" style={{}} /> */}
                      </div>
                      <div className="tableCount">
                        <span>{this.props.activeTables.length}</span>
                      </div>
                      <button type="button" onClick={e => showDropDown()} style={{ margin: '0px 6px', width: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', height: '100%', outline: 'none' }}>
                        <img src={downarrow} alt="" style={{ rotate: !this.state.showDrop ? '0deg' : '180deg', transition: 'all 0.5s' }} />
                      </button>
                    </div>
                  </div>

                  <div className="showActiveTable" style={{ visibility: this.state.showDrop ? 'visible' : 'hidden' }}>
                    <div className="subDiv" style={{ top: this.state.showDrop ? '110px' : '-1000px', transition: 'all 0.5s' }}>
                      {this.props.activeTables.length === 0 ?
                        <p style={{ margin: '10px' }}>No Active Tables</p> :
                        <ActiveTablesList data={this.props.activeTables} network={this.props.network} ></ActiveTablesList>
                      }
                    </div>
                  </div>


                  <div className="balanceSec" style={{ width: '25%' }}>
                    <span style={{ color: '#FFFFFF', fontFamily: 'arial', fontSize: '12px' }}> {this.props.t('In Play')} </span><span className="money_T" style={{ color: '#41B856' }}> {Number(this.props.balance.cashInPlay).toLocaleString()} </span>
                  </div>

                  {/*<div className="balanceSec" style={{}}>
                <img src={More} alt="" style={{}} />
              </div>*/}
                </div>

                {/* <div className="fd df" style={{ alignItems: 'center', justifyContent: 'center', width: '50%' }}>
              <div className="balanceSec">
                <span style={{ color: '#FFFFFF', fontFamily: 'arial', fontSize: '12px' }}>{this.props.t('Balance')} </span>
                <span className="money_T" style={{ color: '#5998F5' }}> {this.props.balance.available.toLocaleString()} </span>
              </div>
            </div>
            <div className="fd df" style={{ alignItems: 'center', justifyContent: 'center' }}>
              <div className="balanceSec" style={{}}>
                <div className="minitablLobby">
                  <div className="">
                    <img src={lobby_table} alt="" style={{}} />
                  </div>
                  <div className="">
                    <span>4</span>
                  </div>
                  <div className="">
                    <img src={downarrow} alt="" style={{}} />
                  </div>
                </div>
              </div>
            </div> */}

                {/* <div className="fd df" style={{ alignItems: 'center', justifyContent: 'center' }}>
              <div className="balanceSec" style={{}}>
                <span style={{ color: '#FFFFFF', fontFamily: 'arial', fontSize: '12px' }}> {this.props.t('In Play')} </span><span className="money_T" style={{ color: '#41B856' }}> {Number(this.props.balance.cashInPlay).toLocaleString()} </span>
              </div>
            </div>
            <div className="fd df" style={{ width: '10%' }}>
              <div className="balanceSec" style={{}}>
                <img src={More} alt="" style={{}} />
              </div>
            </div> */}
              </div>
              {/* <div className="col-1" style={{ padding: "0px 30px 0px 0px" }}> */}
              <div className="col-1" style={{ padding: "0px", display: 'flex', alignItems: 'center' }}>
                <div className={this.state.togglebtn ? "profilebtnclose" : "profilebtn"} onClick={() => {
                  this.setState({ togglebtn: !this.state.togglebtn })
                  if (this.state.togglebtn) {
                    this.props.network.send(`<GetPlayerLevelInfo/>`);
                  }
                  this.props.ProfilePop(this.state.togglebtn)
                }} style={{}}>
                  <img src={this.state.togglebtn ? More : closebtn} alt="" style={{}} />
                </div>
              </div>
            </div>
          </>}
      </div>
    );
  }
}
export default withTranslation()(UserLabel);