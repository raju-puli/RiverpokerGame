import logo from "../../../../assets/images/lobby/logo.png";
// import logoTwo from "../../../../assets/images/tourneyLobby/tourneyLogo.png";
import "../../../../css/ui/lobby/lobbyLogo.css";
export function LobbyLogo() {
  return (
    <div className="lobby_logo fd">
      <img src={logo} alt="logo missing"></img>
    </div>
  );
}
export function TourneyLobbyLogo() {
  return (
    <div >
      {/* <img src={logoTwo} alt="logo missing"></img> */}
    </div>
  );
}
