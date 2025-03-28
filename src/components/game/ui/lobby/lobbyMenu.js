import "../../../../css/ui/lobby/lobbyMenu.css";
// import Add_avatar from '../../../../assets/images/sidemenuicons/Add_avatar.png'
// import Cashier from '../../../../assets/images/sidemenuicons/Cashier.png'
// import Exit from '../../../../assets/images/sidemenuicons/Exit.png'
// import Find_players from '../../../../assets/images/sidemenuicons/Find_players.png'
// import Game_history from '../../../../assets/images/sidemenuicons/Game_history.png'
// import My_buddies from '../../../../assets/images/sidemenuicons/My_buddies.png'
// import My_tables from '../../../../assets/images/sidemenuicons/My_tables.png'
// import News from '../../../../assets/images/sidemenuicons/News.png'
// import Player_level from '../../../../assets/images/sidemenuicons/Player_level.png'
// import Protection from '../../../../assets/images/sidemenuicons/Protection.png'
// import Tournamants from '../../../../assets/images/sidemenuicons/Tournamants.png'
// import Logouticon from '../../../../assets/images/sidemenuicons/LogoutICon.svg'
import { withTranslation } from 'react-i18next'
import fileName from "../../../../jsconfig";

const LobbyMenu = (props) => {

  const onClickLogOut = () => {
    //  window.open('http://localhost:3000/','_self')
    // window.history.replaceState({}, document.title, "/" + "");

    // props.logOutHandler();

    // <---------- web browser start-------------------->
    // window.close();
    // <---------- web browser end-------------------->


    // <---------- apk start-------------------->
    sessionStorage.clear();
    window.location.reload();
    // <---------- apk end-------------------->

  }

  const closeIt = () => {
    props.closeMenu()
  }
  return (
    <div className="menuCover" id="menuCover" onClick={() => closeIt()}>
      {/* <ul className="fd" id="menuSide" onClick={() => closeIt()}> */}
      <ul className="fd" id={fileName.name === "Leader_bet" ? 'menuSideOne' : 'menuSide'} onClick={() => closeIt()}>
        <li className="dropdown">
          {/* <div className="dropbtn" onClick = {(e)=>{e.preventDefault();props.action("Cashier")}}><img src={Cashier} alt="" style={{width:'13px', marginRight:'5px'}}/>{props.t('Cashier')}</div> */}
        </li>
        <li className="dropdown">
          {/* <div className="dropbtn" onClick = {(e)=>{e.preventDefault();props.action("News")}}><img src={News} alt="" style={{width:'13px', marginRight:'5px'}}/>{props.t('News')}</div> */}
        </li>
        <li className="dropdown">
          <div className="dropbtn">{props.t("Options")}</div>
          {fileName.name === "Leader_bet" && <div className="p_20 ">
            <ol className="dropdown-content rds_10 p_20">
              {/* <li onClick={(e) => { e.preventDefault(); props.action("History") }}><img src={Game_history} alt="" style={{ width: '13px', marginRight: '5px' }} />{props.t('Game History')}</li> */}
              {/* <hr style={{width:"70%"}}/> */}
              {/* <li  onClick = {(e)=>{e.preventDefault();props.action("Options")}}>Set Options</li> */}
              {/* <li onClick={(e) => { e.preventDefault(); props.action("MyTables") }}><img src={My_tables} alt="" style={{ width: '13px', marginRight: '5px' }} />{props.t('My Tables')}</li>
              <li onClick={(e) => { e.preventDefault(); props.action("MyTourney") }}><img src={Tournamants} alt="" style={{ width: '13px', marginRight: '5px' }} />{props.t('My Tournaments')}</li>
              <li onClick={(e) => { e.preventDefault(); props.action("FindPlayer") }}><img src={Find_players} alt="" style={{ width: '13px', marginRight: '5px' }} />{props.t('Find Player')}</li> */}
              {/* <li  onClick = {(e)=>{e.preventDefault();props.action("MyBuddies")}}><img src={My_buddies} alt="" style={{width:'13px', marginRight:'5px'}}/>{props.t('My Buddies')}</li> */}
              {/* <li onClick={(e) => { e.preventDefault(); props.action("DP") }}><img src={Protection} alt="" style={{ width: '13px', marginRight: '5px' }} />{props.t('Disconnection protection')}</li> */}
              {/* <li onClick={(e) => { e.preventDefault(); props.action("Avtar") }}><img src={Add_avatar} alt="" style={{ width: '13px', marginRight: '5px' }} />{props.t('Add/Change Avatar')}</li> */}
              {/* <li style={{borderBottom:"0"}} onClick={(e) => { e.preventDefault(); props.action("PLI") }}><img src={Player_level} alt="" style={{ width: '13px', marginRight: '5px', }} />{props.t('Player level info')}</li> */}
            </ol>
          </div>}
          {(fileName.name === "Lapoker" || fileName.name === "Riverpoker") &&
            <ol className="dropdown-content">
              {/* <li onClick={(e) => { e.preventDefault(); props.action("History") }}><img src={Game_history} alt="" style={{ width: '13px', marginRight: '5px' }} />{props.t('Game History')}</li> */}
              {/* <hr style={{width:"70%"}}/> */}
              {/* <li  onClick = {(e)=>{e.preventDefault();props.action("Options")}}>Set Options</li> */}
              {/* <li onClick={(e) => { e.preventDefault(); props.action("MyTourney") }}><img src={Tournamants} alt="" style={{ width: '13px', marginRight: '5px' }} />{props.t('My Tournaments')}</li>
              <li onClick={(e) => { e.preventDefault(); props.action("FindPlayer") }}><img src={Find_players} alt="" style={{ width: '13px', marginRight: '5px' }} />{props.t('Find Player')}</li> */}
              {/* <li  onClick = {(e)=>{e.preventDefault();props.action("MyBuddies")}}><img src={My_buddies} alt="" style={{width:'13px', marginRight:'5px'}}/>{props.t('My Buddies')}</li> */}
              {/* <li onClick={(e) => { e.preventDefault(); props.action("DP") }}><img src={Protection} alt="" style={{ width: '13px', marginRight: '5px' }} />{props.t('Disconnection protection')}</li>
              <li onClick={(e) => { e.preventDefault(); props.action("Avtar") }}><img src={Add_avatar} alt="" style={{ width: '13px', marginRight: '5px' }} />{props.t('Add/Change Avatar')}</li>
              <li onClick={(e) => { e.preventDefault(); props.action("PLI") }}><img src={Player_level} alt="" style={{ width: '13px', marginRight: '5px' }} />{props.t('Player level info')}</li> */}
            </ol>
          }
        </li>
        {(fileName.name === "Leader_bet" ?
          <li className="dropdown  p_20 " >
            {/* <div className="dropbtn" onClick={(e) => { e.preventDefault(); onClickLogOut() }}><img src={Exit} alt="" style={{ width: '13px', marginRight: '5px' }} />{props.t('Exit')}</div> */}
            {/* <div className="dropbtn grade_5 rds_10 row" style={{justifyContent:"space-between",padding:"0"}} onClick={(e) => { e.preventDefault(); onClickLogOut() }}><span style={{padding:'10px',marginLeft:"20px"}}>{props.t('Logout')} </span><div className="rds_10 df_jc_ac" style={{background:"linear-gradient(#98303C 35%, #812525 100%)",padding:"11px 0px 11px 10px"}}><img src={Logouticon} alt="" style={{ width: '13px', marginRight: '5px' }} /></div></div> */}
          </li>
          :
          <li className="dropdown">
            {/* <div className="dropbtn" onClick={(e) => { e.preventDefault(); onClickLogOut() }}><img src={Exit} alt="" style={{ width: '13px', marginRight: '5px' }} />{props.t('Exit')}</div> */}
            {/* <div className="dropbtn" onClick={(e) => { e.preventDefault(); onClickLogOut() }}><img src={Exit} alt="" style={{ width: '13px', marginRight: '5px' }} />{props.t('Logout')}</div> */}
          </li>

        )}
      </ul>
    </div>
  );
};

export default withTranslation()(LobbyMenu);
