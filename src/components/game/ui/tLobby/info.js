import "../../../../css/ui/tLobby/info.css";

export default function TourneyInfo(props) {
 

  return (
    <div className="tourneyInfo">
      <div className="containerOne">{props.data.name}</div>
      <div className="containerTwo">
        <div>
          Tournament Will Start On: <span style={{paddingLeft:'14px'}}>{props.data.date}</span>
        </div>
        <div>
          Minimum Players: <span style={{paddingLeft:'65px'}}>{props.data.min}</span>
        </div>
        <div>
          Maximum Players: <span style={{paddingLeft:'62px'}}>{props.data.max}</span>
        </div>
        <div>
          Registered Players: <span style={{paddingLeft:'60px'}}>{props.data.players}</span>
        </div>
        
      </div>
     
    </div>
  );
}
