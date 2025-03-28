import "../../../../css/ui/table/leftMenu.css";
import icon_lobby from "../../../../assets/images/lobby_icons/menu/profile/icon_lobby.png";
import icon_profile from "../../../../assets/images/lobby_icons/menu/icon_profile.png";
import icon_logout from "../../../../assets/images/lobby_icons/menu/icon_logout.png";
import icon_exit from "../../../../assets/images/lobby_icons/menu/icon_exit.png";
import leave_table from "../../../../assets/images/lobby_icons/menu/icon_logout.png";
import defaultAvtar from "../../../../assets/images/lobby_icons/profile/icon_avatar.png";
import eventBus from '../../../utils/eventEmitter';
export const LeftMenu = (props) => {
    const menuOptions = (name) => {
        switch (name) {
            case "gotolobby":
                props.showLobby("lobby");
                break;
            case "menu":
                // setOptionns(true)
                break;
            case "logout":
                sessionStorage.clear()
                window.location.reload()
                // setOptionns(false);
                break;
            case "exit":
                props.setAction("openExitAlert");
                // sessionStorage.clear()
                // window.location.reload()
                // setOptionns(false);
                break;
            case "close_menu":
                // setOptionns(false);
                props.setAction("HideLeftMenu");
                break;
            case "profile":
                props.showLobby("lobby");
                setTimeout(() => {
                    eventBus.emit('ProfileShow');
                }, 100)
                break;

            case "leave_table":
                props.setAction("openExitTableAlert");
                break;
            case "table_info":
                props.setAction("showTIP");
                break;
            case "settings":
                props.setAction("showCheckBox");
                break;
            default:
                console.log(name);
                break;
        }
    }

    return (

        <div className="show_menu_popup" onClick={() => menuOptions("close_menu")}>
            <div className="sub_menu" >
                {window.innerWidth < 564 &&
                    <>
                        <button className="options" onClick={() => menuOptions("leave_table")}>
                            <img src={leave_table} alt=" " style={{ rotate: "180deg" }} />
                            <label className="text" >Leave Table</label>
                        </button>
                        {/* <button className="options" onClick={() => menuOptions("table_info")}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="35px" fill="#eaeaea">
                                <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                            </svg>
                            <label className="text" >Table Info</label>
                        </button> */}
                        <button className="options" onClick={() => menuOptions("settings")}>
                            <img src={icon_profile} alt=" " />
                            <label className="text" >Settings</label>
                        </button>
                    </>
                }
                <button className="options" onClick={() => menuOptions("gotolobby")}>
                    <img src={icon_lobby} alt=" " />
                    <label className="text" >Lobby</label>
                </button>
                <button className="options" onClick={() => menuOptions("profile")}>
                    <img src={defaultAvtar} alt=" " style={{ height: '40px' }} />
                    <label className="text">Profile</label>
                </button>
                <button disabled={props.leaveTablebtn} className="options" onClick={() => menuOptions('logout')}>
                    <img src={icon_logout} alt=" " />
                    <label className="text" >Logout</label>
                </button>
                <button disabled={props.leaveTablebtn} className="options" onClick={() => menuOptions('exit')}>
                    <img src={icon_exit} alt=" " />
                    <label className="text" >Exit</label>
                </button>
            </div>
        </div>

    );
};
