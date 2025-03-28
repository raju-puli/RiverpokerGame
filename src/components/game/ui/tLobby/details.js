import { useState } from "react";
import "../../../../css/ui/tLobby/details.css";

export default function TourneyDetails(props) {
  console.log(props.data1)
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="tourneyLobbyDetails">
      <div className="bloc-tabs">
        <button className={toggleState === 1 ? "tab activeTabs" : "tab"} onClick={() => toggleTab(1)}>
          Details
        </button>
        <button className={toggleState === 2 ? "tab activeTabs" : "tab"} onClick={() => toggleTab(2)}>
          Description
        </button>
      </div>
      <div>
        <div className={toggleState === 1 ? "data  activeContent" : "data"}>
          <div style={{textAlign:"center"}}>
            <div>{props.data.field1}</div>
            <div>{props.data.field2}</div>
            <div>{props.data.field3}</div>
          </div>
        </div>
        <div className={toggleState === 2 ? "data  activeContent" : "data"}>{props.data.description}</div>
      </div>
    </div>
  );
}
