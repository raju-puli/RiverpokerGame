import "../../../../css/ui/tLobby/tourneyButtons.css"
import close_1 from './../../../../assets/images/table/close_1.svg';
import info from './../../../../assets/images/table/info.svg';
export default function TourneyButtons(props) {

    return (
        <div className="fd df">
            {/* <button id="tourneyBtn" onClick={(e) => {
                e.preventDefault();
                props.open("REG");
            }}>{props.name}</button> */}
            <div className="infoReg">
                
                <button className="close_2" style={{zIndex:"2"}} onClick={(e) => {
                    e.preventDefault();
                    props.open("closeTourneyLobby")
                    // window.frameElement.remove();
                    // var lobbyWindow =  window.open(`${window.location}`,'_self');
                    // lobbyWindow.name = "SooperPokerMainLobby"
                }}> <img src={close_1} alt=""/>  </button>
                <button className="close_2 infoBt m_r_10"  style={{zIndex:"2"}} onClick={(e) => {
                    e.preventDefault();
                    props.open("INFO");
                }}> <img src={info} alt=""/>  </button>
            </div>
        </div>
    )


}